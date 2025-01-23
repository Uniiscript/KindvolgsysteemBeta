import type { SessionFlags } from '~~/types/authTypes'
import { getUserFromEmail, getUserPasswordHash } from '~~/server/utils/repositories/user'
import { verifyPasswordHash } from '~~/server/utils/services/auth/password'
import { RefillingTokenBucket, Throttler } from '~~/server/utils/services/auth/rate-limit'
import { globalPOSTRateLimit } from '~~/server/utils/services/auth/request'
import { createCredentialSession, generateSessionToken, setSessionTokenCookie } from '~~/server/utils/services/auth/session'
import { verifyEmailInput } from '~~/server/utils/services/mail/email'

const throttler = new Throttler<number>([1, 2, 4, 8, 16, 30, 60, 180, 300])
const ipBucket = new RefillingTokenBucket<string>(20, 1)

export default defineEventHandler(async (event) => {
  if (!globalPOSTRateLimit(event)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const clientIP = event.headers.get(`x-forwarded-for`)
  if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  const formdata = await readFormData(event)
  const email = formdata.get(`email`)
  const password = formdata.get(`password`)

  if (typeof email !== `string` || typeof password !== `string`) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid email or password.`,
    })
  }

  if (email === `` || password === ``) {
    throw createError({
      statusCode: 400,
      statusMessage: `Please enter your email and password.`,
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

  if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  if (!throttler.consume(user.id)) {
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
      statusMessage: `Invalid password.`,
    })
  }

  throttler.reset(user.id)

  const sessionFlags: SessionFlags = {
    twoFactorVerified: false,
  }

  const sessionToken = generateSessionToken()
  const session = await createCredentialSession(sessionToken, user.id, sessionFlags)
  setSessionTokenCookie(event, sessionToken, session.expiresAt)

  if (!user.emailVerified) {
    sendRedirect(event, `/auth/verify-email`)
  }
  if (!user.registered2FA) {
    sendRedirect(event, `/2fa/setup`)
  }
  sendRedirect(event, `/2fa`)
})
