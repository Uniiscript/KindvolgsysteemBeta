import { globalPOSTRateLimit } from "~~/server/utils/services/auth/request"
import { getCurrentSession } from "~~/server/utils/services/auth/session"
import { checkEmailAvailability, verifyEmailInput } from "~~/server/utils/services/mail/email"
import { createEmailVerificationRequest, sendVerificationEmail, sendVerificationEmailBucket, setEmailVerificationRequestCookie } from "~~/server/utils/services/mail/email-verification"

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

  if (sendVerificationEmailBucket.check(user.id, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const formData = await readFormData(event)
  const email = formData.get(`email`)

  if (typeof email !== `string`) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid or missing fields.`,
    })
  }

  if (email === ``) {
    throw createError({
      statusCode: 400,
      statusMessage: `Please enter your email`,
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

  if (!sendVerificationEmailBucket.consume(user.id, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const verificationRequest = await createEmailVerificationRequest(user.id, email)
  sendVerificationEmail(verificationRequest.email, verificationRequest.code)
  setEmailVerificationRequestCookie(event, verificationRequest)
  sendRedirect(event, `/verify-email`)
})
