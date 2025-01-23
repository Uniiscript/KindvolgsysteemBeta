import type { SessionFlags } from '~~/types/authTypes'
import { getUserPasswordHash, updateUserPassword } from '~~/server/utils/repositories/user'
import { verifyPasswordHash, verifyPasswordStrength } from '~~/server/utils/services/auth/password'
import { ExpiringTokenBucket } from '~~/server/utils/services/auth/rate-limit'
import { globalPOSTRateLimit } from '~~/server/utils/services/auth/request'
import { createCredentialSession, generateSessionToken, getCurrentSession, invalidateUserSessions, setSessionTokenCookie } from '~~/server/utils/services/auth/session'

const passwordUpdateBucket = new ExpiringTokenBucket<string>(5, 60 * 30)

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

  if (!passwordUpdateBucket.check(session.id, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const formData = await readFormData(event)
  const password = formData.get(`password`)
  const newPassword = formData.get(`newPassword`)

  if (typeof password !== `string` || typeof newPassword !== `string`) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid or missing fields.`,
    })
  }

  const strongPassword = await verifyPasswordStrength(newPassword)
  if (!strongPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: `Password is too weak.`,
    })
  }

  if (!passwordUpdateBucket.consume(session.id, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const passwordHash = await getUserPasswordHash(user.id)
  const validPassword = await verifyPasswordHash(passwordHash, password)
  if (!validPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: `Incorrect password`,
    })
  }

  passwordUpdateBucket.reset(session.id)
  await invalidateUserSessions(user.id)
  await updateUserPassword(user.id, newPassword)

  const sessionToken = generateSessionToken()
  const sessionFlags: SessionFlags = {
    twoFactorVerified: session.twoFactorVerified,
  }

  const newSession = await createCredentialSession(sessionToken, user.id, sessionFlags)
  setSessionTokenCookie(event, sessionToken, newSession.expiresAt)

  return {
    message: `Password updated`,
  }
})
