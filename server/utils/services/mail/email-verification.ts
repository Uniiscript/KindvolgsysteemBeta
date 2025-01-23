import type { H3Event } from 'h3'
import { encodeBase32 } from '@oslojs/encoding'
import { and, eq } from 'drizzle-orm'
import { useDB } from '~~/db/db'
import { generateRandomOTP } from '~~/server/utils/services/auth/utils'
import { getCurrentSession } from '~~/server/utils/services/auth/session'
import { ExpiringTokenBucket } from '~~/server/utils/services/auth/rate-limit'
import { emailVerificationRequestTable } from '~~/db/schema'

export async function getUserEmailVerificationRequest(userId: number, id: string): Promise<EmailVerificationRequest | null> {
  const result = await useDB()
    .select()
    .from(emailVerificationRequestTable)
    .where(and(eq(emailVerificationRequestTable.userId, userId), eq(emailVerificationRequestTable.id, id)))

  if (!result || result.length === 0) {
    return null
  }

  return {
    id: result[0].id,
    userId: result[0].userId,
    email: result[0].email,
    code: result[0].code,
    expiresAt: new Date(result[0].expiresAt * 1000),
  }
}

export async function createEmailVerificationRequest(userId: number, email: string): Promise<EmailVerificationRequest> {
  await deleteUserEmailVerificationRequest(userId)
  const idBytes = new Uint8Array(20)
  crypto.getRandomValues(idBytes)
  const id = encodeBase32(idBytes).toLowerCase()

  const code = generateRandomOTP()
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10)
  await useDB().insert(emailVerificationRequestTable).values({
    id,
    userId,
    email,
    code,
    expiresAt: Math.floor(expiresAt.getTime() / 1000),
  })

  return {
    id,
    userId,
    email,
    code,
    expiresAt,
  }
}

export async function deleteUserEmailVerificationRequest(userId: number) {
  await useDB()
    .delete(emailVerificationRequestTable)
    .where(eq(emailVerificationRequestTable.userId, userId))
}

export function sendVerificationEmail(email: string, code: string) {
  // eslint-disable-next-line no-console
  console.log(`To ${email}: Your verification code is ${code}`)
}

export function setEmailVerificationRequestCookie(event: H3Event, request: EmailVerificationRequest) {
  const config = useRuntimeConfig()

  setCookie(event, `email_verification`, request.id, {
    httpOnly: true,
    path: `/`,
    secure: config.env === `production`,
    sameSite: `lax`,
    expires: request.expiresAt,
  })
}

export function deleteEmailVerificationRequestCookie(event: H3Event) {
  const config = useRuntimeConfig()

  setCookie(event, `email_verification`, ``, {
    httpOnly: true,
    path: `/`,
    secure: config.env === `production`,
    sameSite: `lax`,
    maxAge: 0,
  })
}

export async function getUserEmailVerificationRequestFromRequest(event: H3Event): Promise<EmailVerificationRequest | null> {
  const { user } = await getCurrentSession(event)

  if (!user) {
    return null
  }

  const id = getCookie(event, `email_verification`)

  if (!id) {
    return null
  }

  const request = await getUserEmailVerificationRequest(user.id, id)

  if (!request) {
    deleteEmailVerificationRequestCookie(event)
  }

  return request
}

export const sendVerificationEmailBucket = new ExpiringTokenBucket<number>(3, 60 * 10)

export interface EmailVerificationRequest {
  id: string
  userId: number
  code: string
  email: string
  expiresAt: Date
}
