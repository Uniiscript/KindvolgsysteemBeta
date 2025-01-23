import { getCurrentSession } from "~~/server/utils/services/auth/session"
import { createEmailVerificationRequest, getUserEmailVerificationRequestFromRequest, sendVerificationEmail, sendVerificationEmailBucket, setEmailVerificationRequestCookie } from "~~/server/utils/services/mail/email-verification"

export default defineEventHandler(async (event) => {
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

  if (!sendVerificationEmailBucket.check(user.id, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  let verificationRequest = await getUserEmailVerificationRequestFromRequest(event)
  if (verificationRequest === null) {
    if (user.emailVerified) {
      return {
        message: `Forbidden`,
      }
    }
    if (!sendVerificationEmailBucket.consume(user.id, 1)) {
      return {
        message: `Too many requests`,
      }
    }
    verificationRequest = await createEmailVerificationRequest(user.id, user.email)
  }
  else {
    if (!sendVerificationEmailBucket.consume(user.id, 1)) {
      return {
        message: `Too many requests`,
      }
    }
    verificationRequest = await createEmailVerificationRequest(user.id, verificationRequest.email)
  }

  sendVerificationEmail(verificationRequest.email, verificationRequest.code)
  setEmailVerificationRequestCookie(event, verificationRequest)

  return {
    message: `A new code was sent to your inbox.`,
	}
})
