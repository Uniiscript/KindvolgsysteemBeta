import type { H3Event } from 'h3'
import { sha256 } from '@oslojs/crypto/sha2'
import { encodeHexLowerCase } from '@oslojs/encoding'
import { eq, sql } from 'drizzle-orm'
import { generateRandomOTP } from '~~/server/utils/services/auth/utils'
import { useDB } from '~~/db/db'
import { passwordResetSessionTable, userTable } from '~~/db/schema'

export async function createPasswordResetSession(token: string, userId: number, email: string): Promise<PasswordResetSession> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))

  const sessionValues: PasswordResetSession = {
    id: sessionId,
    userId,
    email,
    code: generateRandomOTP(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60), // Expires in 1 hour
    emailVerified: false,
    twoFactorVerified: false,
  }

  const result = await useDB().insert(passwordResetSessionTable).values({
    id: sessionValues.id,
    userId: sessionValues.userId,
    email: sessionValues.email,
    code: sessionValues.code,
    expiresAt: Math.floor(sessionValues.expiresAt.getTime() / 1000),
    emailVerified: 0,
    twoFactorVerified: 0,
  })

  if (!result) {
    throw new Error(`Failed to create password reset session`)
  }

  return sessionValues
}

export async function validatePasswordResetSessionToken(token: string): Promise<PasswordResetSessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))

  const result = await useDB()
    .select({
      prsId: passwordResetSessionTable.id,
      prsUserId: passwordResetSessionTable.userId,
      prsEmail: passwordResetSessionTable.email,
      prsCode: passwordResetSessionTable.code,
      prsExpiresAt: passwordResetSessionTable.expiresAt,
      prsEmailVerified: passwordResetSessionTable.emailVerified,
      prsTwoFactorVerified: passwordResetSessionTable.twoFactorVerified,
      userId: userTable.id,
      userEmail: userTable.email,
      username: userTable.username,
      userEmailVerified: userTable.emailVerified,
      hasTotpKey: sql<number>`IIF(${userTable.totpKey} IS NOT NULL, 1, 0)`.as(`hasTotpKey`),
    })
    .from(passwordResetSessionTable)
    .innerJoin(userTable, eq(passwordResetSessionTable.userId, userTable.id))
    .where(eq(passwordResetSessionTable.id, sessionId))

  if (!result || result.length === 0) {
    return { session: null, user: null }
  }

  const session: PasswordResetSession = {
    id: result[0].prsId,
    userId: result[0].prsUserId,
    email: result[0].prsEmail,
    code: result[0].prsCode,
    expiresAt: new Date(result[0].prsExpiresAt * 1000),
    emailVerified: Boolean(result[0].prsEmailVerified),
    twoFactorVerified: Boolean(result[0].prsTwoFactorVerified),
  }

  const user: User = {
    id: result[0].userId,
    email: result[0].userEmail ?? ``,
    username: result[0].username,
    emailVerified: Boolean(result[0].userEmailVerified),
    registered2FA: Boolean(result[0].hasTotpKey),
  }

  if (Date.now() >= session.expiresAt.getTime()) {
    await useDB().delete(passwordResetSessionTable).where(eq(passwordResetSessionTable.id, sessionId))
    return { session: null, user: null }
  }

  return { session, user }
}

export async function setPasswordResetSessionAsEmailVerified(sessionId: string): Promise<void> {
  await useDB().update(passwordResetSessionTable).set({ emailVerified: 1 }).where(eq(passwordResetSessionTable.id, sessionId))
}

export async function setPasswordResetSessionAs2FAVerified(sessionId: string): Promise<void> {
  await useDB().update(passwordResetSessionTable).set({ twoFactorVerified: 1 }).where(eq(passwordResetSessionTable.id, sessionId))
}

export async function invalidateUserPasswordResetSessions(userId: number): Promise<void> {
  await useDB().delete(passwordResetSessionTable).where(eq(passwordResetSessionTable.userId, userId))
}

export async function validatePasswordResetSessionRequest(event: H3Event): Promise<PasswordResetSessionValidationResult> {
  const token = getCookie(event, `password_reset_session`)
  if (!token) {
    return { session: null, user: null }
  }
  const result = await validatePasswordResetSessionToken(token)
  if (!result.session) {
    deletePasswordResetSessionTokenCookie(event)
  }
  return result
}

export function setPasswordResetSessionTokenCookie(event: H3Event, token: string, expiresAt: Date): void {
  const config = useRuntimeConfig()

  setCookie(event, `password_reset_session`, token, {
    expires: expiresAt,
    sameSite: `lax`,
    httpOnly: true,
    path: `/`,
    secure: config.env === `production`,
  })
}

export function deletePasswordResetSessionTokenCookie(event: H3Event): void {
  const config = useRuntimeConfig()

  setCookie(event, `password_reset_session`, ``, {
    maxAge: 0,
    sameSite: `lax`,
    httpOnly: true,
    path: `/`,
    secure: config.env === `production`,
  })
}

export function sendPasswordResetEmail(email: string, code: string): void {
  console.log(`To ${email}: Your reset code is ${code}`)
}

export interface PasswordResetSession {
  id: string
  userId: number
  email: string
  expiresAt: Date
  code: string
  emailVerified: boolean
  twoFactorVerified: boolean
}

export type PasswordResetSessionValidationResult =
  | { session: PasswordResetSession, user: User }
  | { session: null, user: null }
