import { and, eq } from "drizzle-orm"
import { useDB } from "~~/db/db"
import { userTable } from "~~/db/schema"
import { decryptToString, encryptString } from "~~/server/utils/services/auth/encryption"
import { ExpiringTokenBucket } from "~~/server/utils/services/auth/rate-limit"
import { generateRandomRecoveryCode } from "~~/server/utils/services/auth/utils"


export const totpBucket = new ExpiringTokenBucket<number>(5, 60 * 30)
export const recoveryCodeBucket = new ExpiringTokenBucket<number>(3, 60 * 60)

export async function resetUser2FAWithRecoveryCode(userId: number, recoveryCode: string) {
  const row = await useDB().select({ recoveryCode: userTable.recoveryCode }).from(userTable).where(eq(userTable.id, userId))

  if (!row || !row[0] || !row[0].recoveryCode) {
    return false
  }

  const userRecoveryCode = decryptToString(row[0].recoveryCode)
  if (recoveryCode !== userRecoveryCode) {
    return false
  }

  const newRecoveryCode = generateRandomRecoveryCode()
  const encryptedNewRecoveryCode = encryptString(newRecoveryCode)

  await useDB().update(userTable).set({ recoveryCode: encryptedNewRecoveryCode, totpKey: null }).where(eq(userTable.id, userId))
  // Compare old recovery code to ensure recovery code wasn't updated.
  const result = await useDB().update(userTable).set({ recoveryCode: encryptedNewRecoveryCode, totpKey: null }).where(and(eq(userTable.id, userId), eq(userTable.recoveryCode, row[0].recoveryCode)))
  return result.rowsAffected > 0
}
