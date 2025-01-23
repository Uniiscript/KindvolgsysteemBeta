import { updateUserEmailAndSetEmailAsVerified } from "~~/server/utils/repositories/user"
import { invalidateUserPasswordResetSessions } from "~~/server/utils/services/auth/password-reset"
import { ExpiringTokenBucket } from "~~/server/utils/services/auth/rate-limit"
import { globalPOSTRateLimit } from "~~/server/utils/services/auth/request"
import { getCurrentSession } from "~~/server/utils/services/auth/session"
import { createEmailVerificationRequest, deleteEmailVerificationRequestCookie, deleteUserEmailVerificationRequest, getUserEmailVerificationRequestFromRequest, sendVerificationEmail } from "~~/server/utils/services/mail/email-verification"


const bucket = new ExpiringTokenBucket<number>(5, 60 * 30)

export default defineEventHandler(async (event) => {
  if (!globalPOSTRateLimit(event)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const { session, user } = await getCurrentSession(event)

  if (session === null) {
    throw createError({
      statusCode: 401,
      statusMessage: `Unauthorized`,
    })
  }

  if (user.registered2FA && !session.twoFactorVerified) {
    throw createError({
      statusCode: 403,
      statusMessage: `Forbidden`,
    })
  }

  if (!bucket.check(user.id, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  let verificationRequest = await getUserEmailVerificationRequestFromRequest(event)
  if (verificationRequest === null) {
    throw createError({
      statusCode: 401,
      statusMessage: `Unauthorized`,
    })
  }

  const formdata = await readFormData(event)
  const code = formdata.get(`code`)

  if (typeof code !== `string`) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid or missing fields.`,
    })
  }

  if (code === ``) {
    throw createError({
      statusCode: 400,
      statusMessage: `Please enter your code`,
    })
  }

  if (!bucket.consume(user.id, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  if (Date.now() >= verificationRequest.expiresAt.getTime()) {
    verificationRequest = await createEmailVerificationRequest(verificationRequest.userId, verificationRequest.email)
    sendVerificationEmail(verificationRequest.email, verificationRequest.code)
    throw createError({
      statusCode: 400,
      statusMessage: `The verification code was expired. We sent another code to your inbox.`,
    })
  }

  if (code !== verificationRequest.code) {
    throw createError({
      statusCode: 400,
      statusMessage: `Incorrect code`,
    })
  }

  await deleteUserEmailVerificationRequest(user.id)
  await invalidateUserPasswordResetSessions(user.id)
  await updateUserEmailAndSetEmailAsVerified(user.id, verificationRequest.email)
  deleteEmailVerificationRequestCookie(event)

  if (!user.registered2FA) {
    sendRedirect(event, `/2fa/setup`)
  }

  sendRedirect(event, `/`)
})
