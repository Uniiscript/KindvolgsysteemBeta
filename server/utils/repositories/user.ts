import { sql, eq, and } from 'drizzle-orm'
import { useDB } from '~~/db/db'
import { oauthAccountTable, userTable } from '~~/db/schema'
import { decrypt, decryptToString, encrypt, encryptString } from '~~/server/utils/services/auth/encryption';
import { hashPassword } from '~~/server/utils/services/auth/password';
import { generateRandomRecoveryCode } from '~~/server/utils/services/auth/utils';

export function verifyUsernameInput(username: string): boolean {
	return username.length > 3 && username.length < 32 && username.trim() === username;
}

export async function createUser(email: string, username: string, password: string): Promise<User> {
  const passwordHash = await hashPassword(password)
  const recoveryCode = generateRandomRecoveryCode()
  const encryptedRecoveryCode = encryptString(recoveryCode)
  const [newUser] = await useDB().insert(userTable).values({
    email,
    username,
    hashedPassword: passwordHash,
    recoveryCode: encryptedRecoveryCode,
  }).returning({
    id: userTable.id,
  })

  if (!newUser) {
    throw new Error(`Failed to create user`)
  }

  const user: User = {
    id: newUser.id,
    username,
    email,
    emailVerified: false,
    registered2FA: false,
  }
  return user
}

export async function createOAuthUser(
  providerId: string,
  providerUserId: string,
  username: string,
  email: string,
  picture?: string,
): Promise<User> {
	const [newUser] = await useDB().transaction(async (tx) => {
    const [user] = await tx
      .insert(userTable)
      .values({
        username,
        email,
        picture,
      })
      .returning({
        id: userTable.id,
        email: userTable.email,
        username: userTable.username,
        emailVerified: userTable.emailVerified,
      })

    await tx.insert(oauthAccountTable).values({
      providerId,
      providerUserId,
      userId: user.id,
    })

    return [user]
  })

  if (!newUser) {
    throw new Error(`Failed to create user`)
  }

  const user: User = {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    emailVerified: Boolean(newUser.emailVerified),
    registered2FA: false,
  }
  return user
}

export async function getOAuthUser(githubUserId: string) {
  return await useDB()
      .select({
        id: userTable.id,
        email: userTable.email,
        username: userTable.username,
        emailVerified: sql<boolean>`CASE WHEN ${userTable.emailVerified} = 1 THEN true ELSE false END`.as(`emailVerified`),
      })
      .from(oauthAccountTable)
      .innerJoin(
        userTable,
        eq(oauthAccountTable.userId, userTable.id),
      )
      .where(
        and(
          eq(oauthAccountTable.providerId, `github`),
          eq(oauthAccountTable.providerUserId, githubUserId),
        )
      )
      .prepare()
      .get()
  }

  export async function updateUserPassword(userId: number, password: string): Promise<void> {
  const passwordHash = await hashPassword(password)
  await useDB().update(userTable).set({ hashedPassword: passwordHash }).where(eq(userTable.id, userId))
}

export async function updateUserEmailAndSetEmailAsVerified(userId: number, email: string) {
  await useDB().update(userTable).set({ email, emailVerified: 1 }).where(eq(userTable.id, userId))
}

export async function setUserAsEmailVerifiedIfEmailMatches(userId: number, email: string) {
  const result = await useDB().update(userTable).set({ emailVerified: 1 }).where(and(eq(userTable.id, userId), eq(userTable.email, email)))
  return result.rowsAffected > 0
}

export async function getUserPasswordHash(userId: number) {
  const user = await useDB().select({ hashedPassword: userTable.hashedPassword }).from(userTable).where(eq(userTable.id, userId))
  if (!user || !user[0] || !user[0].hashedPassword) {
    throw new Error(`Invalid user ID`)
  }
  return user[0].hashedPassword
}

export async function getUserRecoveryCode(userId: number) {
  const result = await useDB().select({ recoveryCode: sql<Uint8Array>`${userTable.recoveryCode}` }).from(userTable).where(eq(userTable.id, userId))
  if (!result || !result[0] || !result[0].recoveryCode) {
    throw new Error(`Invalid user ID`)
  }
  return decryptToString(result[0].recoveryCode)
}

export async function getUserTOTPKey(userId: number) {
  const result = await useDB().select({ totpKey: sql<Uint8Array>`${userTable.totpKey}` }).from(userTable).where(eq(userTable.id, userId))
  if (!result || !result[0] || !result[0].totpKey) {
    throw new Error(`Invalid user ID`)
  }

  return decrypt(result[0].totpKey)
}

export async function updateUserTOTPKey(userId: number, key: Uint8Array) {
  const encryptedTOTPKey = encrypt(key)
  await useDB().update(userTable).set({ totpKey: encryptedTOTPKey }).where(eq(userTable.id, userId))
}

export async function resetUserRecoveryCode(userId: number) {
  const recoveryCode = generateRandomRecoveryCode()
  const encryptedRecoveryCode = encryptString(recoveryCode)
  await useDB().update(userTable).set({ recoveryCode: encryptedRecoveryCode }).where(eq(userTable.id, userId))
}

export async function getUserFromEmail(email: string) {
  const result = await useDB().select().from(userTable).where(eq(userTable.email, email))
  if (!result || !result[0]) {
    return null
  }

  const user: User = {
    id: result[0].id,
    email: result[0].email,
    username: result[0].username,
    emailVerified: Boolean(result[0].emailVerified),
    registered2FA: Boolean(result[0].totpKey),
  }

  return user
}
