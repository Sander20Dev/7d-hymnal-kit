'use client'

import { createClient } from '@libsql/client/web'

export const clientDB = createClient({
  url: process.env.TURSO_DATABASE_URL ?? '',
  authToken: process.env.TURSO_AUTH_TOKEN ?? '',
})
