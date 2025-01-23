import type { H3Event } from 'h3'
import type { Session, SessionFlags, SessionValidationResult, User } from '~~/types/authTypes'
import { sha256 } from '@oslojs/crypto/sha2'
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding'
import { eq } from 'drizzle-orm'
import { useDB } from '~~/db/db'
import { sessionTable, userTable } from '~~/db/schema'

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const result = await useDB()
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId))

  if (!result || result.length < 1) {
    return { session: null, user: null }
  }

  const session: Session = {
    id: result[0].session.id,
    userId: result[0].session.userId,
    expiresAt: new Date(result[0].session.expiresAt * 1000),
  }

  const user: User = {
    id: result[0].user.id,
    email: result[0].user.email,
    username: result[0].user.username,
    emailVerified: Boolean(result[0].user.emailVerified),
    registered2FA: Boolean(result[0].user.totpKey),
	}

  if (Date.now() >= session.expiresAt.getTime()) {
    await useDB().delete(sessionTable).where(eq(sessionTable.id, session.id))
    return { session: null, user: null }
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    await useDB()
      .update(sessionTable)
      .set({
        expiresAt: Math.floor(session.expiresAt.getTime() / 1000),
      })
      .where(eq(sessionTable.id, session.id))
  }
  return { session, user }
}

export async function getCurrentSession(event: H3Event): Promise<SessionValidationResult> {
  const token = getCookie(event, `session`)
  if (!token) {
    return { session: null, user: null }
  }
  const result = await validateSessionToken(token)
  return result
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await useDB().delete(sessionTable).where(eq(sessionTable.id, sessionId))
}

export async function invalidateUserSessions(userId: number): Promise<void> {
  await useDB().delete(sessionTable).where(eq(sessionTable.userId, userId))
}

export function setSessionTokenCookie(event: H3Event, token: string, expiresAt: Date) {
  const config = useRuntimeConfig()

  setCookie(event, `session`, token, {
    httpOnly: true,
    path: `/`,
    secure: config.env === `production`,
    sameSite: `lax`,
    expires: expiresAt,
  })
}

export function deleteSessionTokenCookie(event: H3Event): void {
  const config = useRuntimeConfig()

  setCookie(event, `session`, ``, {
    httpOnly: true,
    path: `/`,
    secure: config.env === `production`,
    sameSite: `lax`,
    maxAge: 0,
  })
}

export function generateSessionToken(): string {
  const tokenBytes = new Uint8Array(20)
  crypto.getRandomValues(tokenBytes)
  const token = encodeBase32LowerCaseNoPadding(tokenBytes).toLowerCase()
  return token
}

export async function createCredentialSession(
  token: string,
  userId: number,
  flags: SessionFlags,
): Promise<Session> {
  return createSession(token, userId, flags)
}

export async function createOAuthSession(
  token: string,
  userId: number,
): Promise<Session> {
  return createSession(token, userId)
}

export async function setSessionAs2FAVerified(sessionId: string): Promise<void> {
  await useDB().update(sessionTable).set({ twoFactorVerified: 1 }).where(eq(sessionTable.id, sessionId))
}

async function createSession(token: string, userId: number, flags?: SessionFlags): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))

  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    twoFactorVerified: flags?.twoFactorVerified ?? true,
  }

  await useDB().insert(sessionTable).values({
    id: session.id,
    userId,
    expiresAt: Math.floor(session.expiresAt.getTime() / 1000),
    twoFactorVerified: Number(session.twoFactorVerified),
  })

  return session
}
