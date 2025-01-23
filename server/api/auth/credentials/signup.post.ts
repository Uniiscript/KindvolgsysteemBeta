import type { SessionFlags } from '~~/types/authTypes'
import { createUser, verifyUsernameInput } from '~~/server/utils/repositories/user'
import { verifyPasswordStrength } from '~~/server/utils/services/auth/password'
import { RefillingTokenBucket } from '~~/server/utils/services/auth/rate-limit'
import { globalPOSTRateLimit } from '~~/server/utils/services/auth/request'
import { createCredentialSession, generateSessionToken, setSessionTokenCookie } from '~~/server/utils/services/auth/session'
import { checkEmailAvailability, verifyEmailInput } from '~~/server/utils/services/mail/email'
import { createEmailVerificationRequest, sendVerificationEmail, setEmailVerificationRequestCookie } from '~~/server/utils/services/mail/email-verification'

const ipBucket = new RefillingTokenBucket<string>(3, 10)

export default defineEventHandler(async (event) => {
  if (!globalPOSTRateLimit(event)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  // TODO: Assumes X-Forwarded-For is always included.
  const clientIP = event.headers.get(`x-forwarded-for`)
  if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const formData = await readFormData(event)
  const email = formData.get(`email`)
  const username = formData.get(`username`)
  const password = formData.get(`password`)

  if (typeof email !== `string` || typeof username !== `string` || typeof password !== `string`) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid or missing fields.`,
    })
  }

  if (email === `` || username === `` || password === ``) {
    throw createError({
      statusCode: 400,
      statusMessage: `Please enter your username, email, and password`,
    })
  }

  if (!verifyEmailInput(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Please enter a valid email`,
    })
  }

  const emailAvailable = await checkEmailAvailability(email)

  if (!emailAvailable) {
    throw createError({
      statusCode: 400,
      statusMessage: `Email already in use`,
    })
  }

  if (!verifyUsernameInput(username)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid username`,
    })
  }

  const strongPassword = await verifyPasswordStrength(password)

  if (!strongPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: `Password is too weak`,
    })
  }

  if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const user = await createUser(email, username, password)
  const emailVerificationRequest = await createEmailVerificationRequest(user.id, email)
  sendVerificationEmail(emailVerificationRequest.email, emailVerificationRequest.code)
  setEmailVerificationRequestCookie(event, emailVerificationRequest)

  const sessionFlags: SessionFlags = {
    twoFactorVerified: false,
  }

  const sessionToken = generateSessionToken()
  const session = await createCredentialSession(sessionToken, user.id, sessionFlags)
  setSessionTokenCookie(event, sessionToken, session.expiresAt)
  sendRedirect(event, `/2fa/setup`)
})
