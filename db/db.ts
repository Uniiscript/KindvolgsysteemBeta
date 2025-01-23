import { createClient as createLibSQLClient } from '@libsql/client'

import { drizzle as drizzleTurso } from 'drizzle-orm/libsql'
import * as schema from './schema'

type DBType = ReturnType<typeof drizzleTurso<typeof schema>>
let _db: DBType | null = null

export function db(){
  return drizzleTurso({ connection: { url: process.env.DB_FILE_NAME! }})
}

export function useDB() {
  if (!_db) {
    if (process.env.TURSO_DB_URL && process.env.TURSO_DB_AUTH_TOKEN) {
      // Turso in production
      _db = drizzleTurso(createLibSQLClient({
        url: process.env.TURSO_DB_URL,
        authToken: process.env.TURSO_DB_AUTH_TOKEN,
      }), { schema })
    }
    else if (process.env.DRIZZLE_ENV === `development`) {
      _db = drizzleTurso({ connection: { url: process.env.DB_FILE_NAME! }})
    }
    else {
      throw new Error(`No database configured for production`)
    }
  }
  return _db
}
