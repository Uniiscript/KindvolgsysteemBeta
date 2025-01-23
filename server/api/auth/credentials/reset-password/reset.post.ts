import type { SessionFlags } from '~~/types/authTypes'
import { updateUserPassword } from '~~/server/utils/repositories/user'
import { verifyPasswordStrength } from '~~/server/utils/services/auth/password'
import { deletePasswordResetSessionTokenCookie, invalidateUserPasswordResetSessions, validatePasswordResetSessionRequest } from '~~/server/utils/services/auth/password-reset'
import { globalPOSTRateLimit } from '~~/server/utils/services/auth/request'
import { createCredentialSession, generateSessionToken, invalidateUserSessions, setSessionTokenCookie } from '~~/server/utils/services/auth/session'

export default defineEventHandler(async (event) => {
  if (!globalPOSTRateLimit(event)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const { session: passwordResetSession, user } = await validatePasswordResetSessionRequest(event)
  if (passwordResetSession === null) {
    throw createError({
      statusCode: 401,
      statusMessage: `Unauthorized`,
    })
  }

  if (!passwordResetSession.emailVerified) {
    throw createError({
      statusCode: 403,
      statusMessage: `Forbidden`,
    })
  }

  if (user.registered2FA && !passwordResetSession.twoFactorVerified) {
    throw createError({
      statusCode: 403,
      statusMessage: `Forbidden`,
    })
  }

  const formdata = await readFormData(event)
  const password = formdata.get(`password`)

  if (typeof password !== `string`) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid or missing fields.`,
    })
  }

  const strongPassword = await verifyPasswordStrength(password)

  if (!strongPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: `Password is too weak.`,
    })
  }

  await invalidateUserPasswordResetSessions(user.id)
  await invalidateUserSessions(user.id)
  await updateUserPassword(user.id, password)

  const sessionFlags: SessionFlags = {
    twoFactorVerified: passwordResetSession.twoFactorVerified,
  }
  const sessionToken = generateSessionToken()
  const sessionData = await createCredentialSession(sessionToken, user.id, sessionFlags)
  setSessionTokenCookie(event, sessionToken, sessionData.expiresAt)
  deletePasswordResetSessionTokenCookie(event)
  sendRedirect(event, `/`)
})
