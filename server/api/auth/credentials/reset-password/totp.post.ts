import { verifyTOTP } from '@oslojs/otp'
import { getUserTOTPKey } from '~~/server/utils/repositories/user'
import { totpBucket } from '~~/server/utils/services/auth/2fa'
import { setPasswordResetSessionAs2FAVerified, validatePasswordResetSessionRequest } from '~~/server/utils/services/auth/password-reset'
import { globalPOSTRateLimit } from '~~/server/utils/services/auth/request'

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

  if (!totpBucket.check(session.userId, 1)) {
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

  const totpKey = await getUserTOTPKey(user.id)
  if (totpKey === null) {
    throw createError({
      statusCode: 401,
      statusMessage: `Forbidden`,
    })
  }

  if (!totpBucket.consume(session.userId, 1)) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests`,
    })
  }

  if (!verifyTOTP(totpKey, 30, 6, code)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid code`,
    })
  }

  totpBucket.reset(session.userId)
  await setPasswordResetSessionAs2FAVerified(session.id)
  sendRedirect(event, `/reset-password`)
})
