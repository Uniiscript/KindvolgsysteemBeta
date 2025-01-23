import { recoveryCodeBucket, resetUser2FAWithRecoveryCode } from "~~/server/utils/services/auth/2fa"
import { getCurrentSession } from "~~/server/utils/services/auth/session"

export default defineEventHandler(async (event) => {
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
  if (!recoveryCodeBucket.check(user.id, 1)) {
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
      message: `Please enter your code`,
    }
  }
  if (!recoveryCodeBucket.consume(user.id, 1)) {
    return {
      message: `Too many requests`,
    }
  }
  const valid = await resetUser2FAWithRecoveryCode(user.id, code)
  if (!valid) {
    return {
      message: `Invalid recovery code`,
    }
  }
  recoveryCodeBucket.reset(user.id)
  sendRedirect(event, `/2fa/setup`)
})
