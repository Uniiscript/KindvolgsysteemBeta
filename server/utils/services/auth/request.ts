import type { H3Event } from 'h3'
import { RefillingTokenBucket } from '~~/server/utils/services/auth/rate-limit'

const LOCALHOST = '127.0.0.1' as const

export const globalBucket = new RefillingTokenBucket<string>(100, 1)

export function globalGETRateLimit(event: H3Event): boolean {
  // Note: Assumes X-Forwarded-For will always be defined.
  const clientIP = getRequestHeaders(event)[`x-forwarded-for`]
  if (!clientIP) {
    return true
  }

  if(clientIP === LOCALHOST) {
    return false
  }

  return globalBucket.consume(clientIP, 1)
}

export function globalPOSTRateLimit(event: H3Event): boolean {
  // Note: Assumes X-Forwarded-For will always be defined.
  const clientIP = getRequestHeaders(event)[`x-forwarded-for`]
  if (!clientIP) {
    return true
  }

  if(clientIP === LOCALHOST) {
    return false
  }

  return globalBucket.consume(clientIP, 3)
}
