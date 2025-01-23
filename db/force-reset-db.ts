/* eslint-disable no-console */
import { sql } from 'drizzle-orm'
import { useDB } from '~~/db/db'

async function reset() {
  const tableSchema = useDB()._.schema
  if (!tableSchema)
    throw new Error('No table schema found')

  console.log('🗑️  Emptying the entire database')
  const queries = Object.values(tableSchema).map((table) => {
    console.log(`🧨 Preparing delete query for table: ${table.dbName}`)
    return sql.raw(`DELETE FROM ${table.dbName};`)
  })

  console.log('📨 Sending delete queries...')

  await useDB().transaction(async (tx) => {
    for (const query of queries) {
      if (query)
        await tx.run(query)
    }
  }, {
    behavior: 'immediate',
  })

  console.log('✅ Database emptied')
}

reset().catch((e) => {
  console.error(e)
})
