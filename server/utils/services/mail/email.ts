import { count, eq } from 'drizzle-orm'
import { useDB } from '~~/db/db';
import { userTable } from '~~/db/schema';

export function verifyEmailInput(email: string): boolean {
 	return /^.+@.+\..+$/.test(email) && email.length < 256;
}

export async function checkEmailAvailability(email: string) {
  const row = await useDB().select({ count: count() }).from(userTable).where(eq(userTable.email, email))
  if (!row) {
    throw new Error()
  }

  return row[0].count === 0
}
