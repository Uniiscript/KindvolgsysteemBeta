import { getUserFromEmail } from "~~/server/utils/repositories/user"
import { createPasswordResetSession, invalidateUserPasswordResetSessions, sendPasswordResetEmail, setPasswordResetSessionTokenCookie } from "~~/server/utils/services/auth/password-reset"
import { RefillingTokenBucket } from "~~/server/utils/services/auth/rate-limit"
import { globalPOSTRateLimit } from "~~/server/utils/services/auth/request"
import { generateSessionToken } from "~~/server/utils/services/auth/session"
import { verifyEmailInput } from "~~/server/utils/services/mail/email"

const passwordResetEmailIPBucket = new RefillingTokenBucket<string>(3, 60)
const passwordResetEmailUserBucket = new RefillingTokenBucket<number>(3, 60)

export default defineEventHandler(async (event) => {
  if (!globalPOSTRateLimit(event)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const clientIP = event.headers.get(`x-forwarded-for`)
  if (clientIP !== null && !passwordResetEmailIPBucket.check(clientIP, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const formdata = await readFormData(event)
  const email = formdata.get(`email`)

  if (typeof email !== `string`) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid or missing fields.`,
    })
  }

  if (!verifyEmailInput(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid email.`,
    })
  }

  const user = await getUserFromEmail(email)

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: `Account does not exist`,
    })
  }

  if (clientIP !== null && !passwordResetEmailIPBucket.consume(clientIP, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  if (!passwordResetEmailUserBucket.consume(user.id, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  await invalidateUserPasswordResetSessions(user.id)
  const sessionToken = generateSessionToken()
  const session = await createPasswordResetSession(sessionToken, user.id, email)

  sendPasswordResetEmail(session.email, session.code)
  setPasswordResetSessionTokenCookie(event, sessionToken, session.expiresAt)
  return sendRedirect(event, `/reset-password/verify-email`)
})
