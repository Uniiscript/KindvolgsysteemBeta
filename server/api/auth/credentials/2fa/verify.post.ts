import { verifyTOTP } from '@oslojs/otp'
import { getUserTOTPKey } from '~~/server/utils/repositories/user'
import { totpBucket } from '~~/server/utils/services/auth/2fa'
import { globalPOSTRateLimit } from '~~/server/utils/services/auth/request'
import { getCurrentSession, setSessionAs2FAVerified } from '~~/server/utils/services/auth/session'

export default defineEventHandler(async (event) => {
  if (!globalPOSTRateLimit(event)) {
    return {
      message: `Too many requests`,
    }
  }
  const { session, user } = await getCurrentSession(event)
  if (session === null) {
    return {
      message: `Not authenticated`,
    }
  }
  if (!user.emailVerified || !user.registered2FA || session.twoFactorVerified) {
    return {
      message: `Forbidden`,
    }
  }
  if (!totpBucket.check(user.id, 1)) {
    return {
      message: `Too many requests`,
    }
  }

  const formData = await readFormData(event)
  const code = formData.get(`code`)

  if (typeof code !== `string`) {
    return {
      message: `Invalid or missing fields`,
    }
  }
  if (code === ``) {
    return {
      message: `Enter your code`,
    }
  }
  if (!totpBucket.consume(user.id, 1)) {
    return {
      message: `Too many requests`,
    }
  }
  const totpKey = await getUserTOTPKey(user.id)
  if (totpKey === null) {
    return {
      message: `Forbidden`,
    }
  }
  if (!verifyTOTP(totpKey, 30, 6, code)) {
    return {
      message: `Invalid code`,
    }
  }
  totpBucket.reset(user.id)
  await setSessionAs2FAVerified(session.id)

  return sendRedirect(event, `/`)
})
