import { setUserAsEmailVerifiedIfEmailMatches } from "~~/server/utils/repositories/user"
import { setPasswordResetSessionAsEmailVerified, validatePasswordResetSessionRequest } from "~~/server/utils/services/auth/password-reset"
import { ExpiringTokenBucket } from "~~/server/utils/services/auth/rate-limit"
import { globalPOSTRateLimit } from "~~/server/utils/services/auth/request"

const emailVerificationBucket = new ExpiringTokenBucket<number>(5, 60 * 30)

export default defineEventHandler(async (event) => {
  if (!globalPOSTRateLimit(event)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const { session } = await validatePasswordResetSessionRequest(event)
  if (session === null) {
    throw createError({
      statusCode: 401,
      statusMessage: `Unauthorized`,
    })
  }

  if (session.emailVerified) {
    throw createError({
      statusCode: 403,
      statusMessage: `Forbidden`,
    })
  }

  if (!emailVerificationBucket.check(session.userId, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
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

  if (!emailVerificationBucket.consume(session.userId, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  if (code !== session.code) {
    throw createError({
      statusCode: 400,
      statusMessage: `InCorrect code`,
    })
  }

  emailVerificationBucket.reset(session.userId)
  await setPasswordResetSessionAsEmailVerified(session.id)
  const emailMatches = await setUserAsEmailVerifiedIfEmailMatches(session.userId, session.email)
  if (!emailMatches) {
    throw createError({
      statusCode: 400,
      statusMessage: `Please restart the process`,
    })
  }

  sendRedirect(event, `/reset-password/2fa`)
})
