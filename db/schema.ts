import type { InferSelectModel } from 'drizzle-orm'
import { blob, integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const userTable = sqliteTable(`user`, {
  id: integer().primaryKey(),
  email: text().notNull(),
  emailVerified: integer().default(0),
  hashedPassword: text(),                             //credentials only
  name: text(),
  username: text().unique().notNull(),                //credentials only
  birthday: text(),                                   //personal info
  totpKey: blob(),
  recoveryCode: blob().$type<Uint8Array>(),           //credentials only
  phone: text(),
  address: text(),
  picture: text(),
})

export type DatabaseUser = InferSelectModel<typeof userTable>

export const sessionTable = sqliteTable(`session`, {
  id: text().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer().notNull(),
  twoFactorVerified: integer().notNull().default(0),    //credentials only
})

export type DatabaseSession = InferSelectModel<typeof sessionTable>

export const emailVerificationRequestTable = sqliteTable(`email_verification_request`, {
  id: text().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => userTable.id, { onDelete: `cascade` }),
  email: text().notNull(),
  code: text().notNull(),
  expiresAt: integer().notNull(),
})

export type DatabaseEmailVerificationRequest = InferSelectModel<typeof emailVerificationRequestTable>

export const passwordResetSessionTable = sqliteTable(`password_reset_session`, {
  id: text().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => userTable.id, { onDelete: `cascade` }),
  email: text().notNull(),
  code: text().notNull(),
  expiresAt: integer().notNull(),
  emailVerified: integer().notNull().default(0),
  twoFactorVerified: integer().notNull().default(0),
})

export type DatabasePasswordResetSession = InferSelectModel<typeof passwordResetSessionTable>


// OAuth Account schema logic

export const oauthAccountTable = sqliteTable(`oauth_account`, {
  providerId: text().notNull(),
  providerUserId: text().notNull(),
  userId: integer()
    .notNull()
    .references(() => userTable.id, { onDelete: `cascade` }),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.providerId, table.providerUserId] }),
  }
})

export type DatabaseOAuthAccount = InferSelectModel<typeof oauthAccountTable>
