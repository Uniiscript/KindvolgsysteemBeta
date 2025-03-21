import { createCipheriv, createDecipheriv } from 'node:crypto'
import { DynamicBuffer } from '@oslojs/binary'
import { generateRandomString, type RandomReader } from '@oslojs/crypto/random'
import { decodeBase64 } from '@oslojs/encoding'

const UPPER_ALPHANUMERIC_ALPHABET = `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`
const LOWER_ALPHANUMERIC_ALPHABET = `abcdefghijklmnopqrstuvwxyz0123456789`

// export const key = decodeBase64(process.env.ENCRYPTION_KEY!)

export function encrypt(data: Uint8Array): Uint8Array {
  const iv = new Uint8Array(16)
  crypto.getRandomValues(iv)
  const cipher = createCipheriv(`aes-128-gcm`, key, iv)
  const encrypted = new DynamicBuffer(0)
  encrypted.write(iv)
  encrypted.write(cipher.update(data))
  encrypted.write(cipher.final())
  encrypted.write(cipher.getAuthTag())
  return encrypted.bytes()
}

export function encryptString(data: string): Uint8Array {
  return encrypt(new TextEncoder().encode(data))
}

export function decrypt(encrypted: Uint8Array): Uint8Array {
  if (encrypted.byteLength < 33) {
    throw new Error(`Invalid data`)
  }
  const decipher = createDecipheriv(`aes-128-gcm`, key, encrypted.slice(0, 16))
  decipher.setAuthTag(encrypted.slice(encrypted.byteLength - 16))
  const decrypted = new DynamicBuffer(0)
  decrypted.write(decipher.update(encrypted.slice(16, encrypted.byteLength - 16)))
  decrypted.write(decipher.final())
  return decrypted.bytes()
}

export function decryptToString(data: Uint8Array): string {
  return new TextDecoder().decode(decrypt(data))
}

class RandomGenerator implements RandomReader {
  read(bytes: Uint8Array): void {
    crypto.getRandomValues(bytes)
  }
}

export function generateRandomLowercaseString(length: number): string {
  return generateRandomString(new RandomGenerator(), LOWER_ALPHANUMERIC_ALPHABET, length)
}

export function generateRandomUppercaseString(length: number): string {
  return generateRandomString(new RandomGenerator(), UPPER_ALPHANUMERIC_ALPHABET, length)
}
