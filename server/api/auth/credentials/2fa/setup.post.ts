
import { decodeBase64 } from '@oslojs/encoding'
import { verifyTOTP } from '@oslojs/otp'
import { updateUserTOTPKey } from '~~/server/utils/repositories/user'
import { RefillingTokenBucket } from '~~/server/utils/services/auth/rate-limit'
import { globalPOSTRateLimit } from '~~/server/utils/services/auth/request'
import { getCurrentSession, setSessionAs2FAVerified } from '~~/server/utils/services/auth/session'

const totpUpdateBucket = new RefillingTokenBucket<number>(3, 60 * 10)

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
  if (!user.emailVerified) {
    return {
      message: `Forbidden`,
    }
  }
  if (user.registered2FA && !session.twoFactorVerified) {
    return {
      message: `Forbidden`,
    }
  }
  if (!totpUpdateBucket.check(user.id, 1)) {
    return {
      message: `Too many requests`,
    }
  }

  const formData = await readFormData(event)
  const encodedKey = formData.get(`key`)
  const code = formData.get(`code`)

  if (typeof encodedKey !== `string` || typeof code !== `string`) {
    return {
      message: `Invalid or missing fields`,
    }
  }
  if (code === ``) {
    return {
      message: `Please enter your code`,
    }
  }
  if (encodedKey.length !== 28) {
    return {
      message: `Please enter your code`,
    }
  }
  let key: Uint8Array
  try {
    // key = decodeBase64(encodedKey)
  }
  catch {
    return {
      message: `Invalid key`,
    }
  }
  if (key.byteLength !== 20) {
    return {
      message: `Invalid key`,
    }
  }
  if (!totpUpdateBucket.consume(user.id, 1)) {
    return {
      message: `Too many requests`,
    }
  }
  if (!verifyTOTP(key, 30, 6, code)) {
    return {
      message: `Invalid code`,
    }
  }
  await updateUserTOTPKey(session.userId, key)
  await setSessionAs2FAVerified(session.id)

  sendRedirect(event, `/recovery-code`)
})
