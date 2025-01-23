import { resetUserRecoveryCode } from "~~/server/utils/repositories/user"
import { globalPOSTRateLimit } from "~~/server/utils/services/auth/request"
import { getCurrentSession } from "~~/server/utils/services/auth/session"

export default defineEventHandler(async (event) => {
  if (!globalPOSTRateLimit(event)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const { session, user } = await getCurrentSession(event)

  if (session === null || user === null) {
    throw createError({
      statusCode: 401,
      statusMessage: `Unauthorized`,
    })
  }

  if (!user.emailVerified) {
    throw createError({
      statusCode: 403,
      statusMessage: `Forbidden`,
    })
  }

  if (!session.twoFactorVerified) {
    throw createError({
      statusCode: 403,
      statusMessage: `Forbidden`,
    })
  }

  const recoveryCode = await resetUserRecoveryCode(session.userId)

  if (recoveryCode === null) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to reset recovery code`,
    })
  }

  return {
    recoveryCode,
  }
})
