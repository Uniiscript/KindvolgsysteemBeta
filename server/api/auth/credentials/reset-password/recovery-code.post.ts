import { recoveryCodeBucket, resetUser2FAWithRecoveryCode } from "~~/server/utils/services/auth/2fa"
import { validatePasswordResetSessionRequest } from "~~/server/utils/services/auth/password-reset"
import { globalPOSTRateLimit } from "~~/server/utils/services/auth/request"

export default defineEventHandler(async (event) => {
  if (!globalPOSTRateLimit(event)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const { session, user } = await validatePasswordResetSessionRequest(event)

  if (session === null) {
    throw createError({
      statusCode: 401,
      statusMessage: `Unauthorized`,
    })
  }

  if (!session.emailVerified || !user.registered2FA || session.twoFactorVerified) {
    throw createError({
      statusCode: 403,
      statusMessage: `Forbidden`,
    })
  }

  if (!recoveryCodeBucket.check(session.userId, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const formData = await readFormData(event)
  const code = formData.get(`code`)

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

  if (!recoveryCodeBucket.consume(session.userId, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const valid = await resetUser2FAWithRecoveryCode(user.id, code)

  if (!valid) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid recovery code`,
    })
  }

  recoveryCodeBucket.reset(session.userId)

  sendRedirect(event, `/reset-password`)
})
