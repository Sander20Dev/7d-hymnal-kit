import type { Hymn, BaseHymn } from '@/app/types'
import type { Client, ResultSet } from '@libsql/client'

export async function getBaseHymns(clientDB: Client): Promise<BaseHymn[]> {
  const result = await clientDB.execute(
    'SELECT * FROM hymn_info ORDER BY number ASC'
  )

  return parseBaseHymn(result)
}

export async function getHymns(
  clientDB: Client,
  { offset = 0, limit = 50 } = {}
): Promise<Hymn[]> {
  const result = await clientDB.execute({
    sql: 'SELECT * FROM hymn_info ORDER BY number ASC LIMIT ? OFFSET ?',
    args: [limit, offset],
  })

  return parseHymn(result)
}

export async function getHymn(
  clientDB: Client,
  number: number
): Promise<Hymn | null> {
  const result = await clientDB.execute({
    sql: 'SELECT * FROM hymn_info WHERE number = ?',
    args: [number],
  })

  const [hymn] = parseHymn(result)

  if (hymn == null) return null

  return hymn
}

export async function setHymn(clientDB: Client, hymn: Hymn): Promise<void> {
  await clientDB.execute({
    sql: 'INSERT INTO hymn_info (number, name, lyrics, verse_associated, timestamps, double_chorus) VALUES (?, ?, ?, ?, ?, ?)',
    args: [
      hymn.number,
      hymn.name,
      JSON.stringify(hymn.lyrics),
      hymn.verseAssociated ?? 'NULL',
      JSON.stringify(hymn.timestamps),
      hymn.doubleChorus ? 1 : 0,
    ],
  })
}

export async function searchHymns(
  clientDB: Client,
  search: string,
  { offset = 0, limit = 50 } = {}
): Promise<Hymn[]> {
  const result = await clientDB.execute({
    sql: 'SELECT * FROM hymn_info WHERE name LIKE ? OR number LIKE ? ORDER BY number ASC LIMIT ? OFFSET ?',
    args: [`%${search}%`, `%${search}%`, limit, offset],
  })

  return parseHymn(result)
}

function parseHymn(result: ResultSet): Hymn[] {
  const numberIndex = result.columns.indexOf('number')
  const nameIndex = result.columns.indexOf('name')
  const lyricsIndex = result.columns.indexOf('lyrics')
  const verseAssociatedIndex = result.columns.indexOf('verse_associated')
  const timestampsIndex = result.columns.indexOf('timestamps')
  const doubleChorusIndex = result.columns.indexOf('double_chorus')

  if (numberIndex === -1) throw new Error('numberIndex not found')
  if (nameIndex === -1) throw new Error('nameIndex not found')
  if (lyricsIndex === -1) throw new Error('lyricsIndex not found')
  if (verseAssociatedIndex === -1)
    throw new Error('verseAssociatedIndex not found')
  if (timestampsIndex === -1) throw new Error('timestampsIndex not found')
  if (doubleChorusIndex === -1) throw new Error('doubleChorusIndex not found')

  const hymns: Hymn[] = []

  for (const row of result.rows) {
    const number = row[numberIndex]
    const name = row[nameIndex]
    const lyrics = row[lyricsIndex]
    const verseAssociated = row[verseAssociatedIndex] ?? undefined
    const timestamps = row[timestampsIndex]
    const doubleChorus = row[doubleChorusIndex]

    console.log({ verseAssociated })

    if (typeof number !== 'number') throw new Error('number is not a number')
    if (typeof name !== 'string') throw new Error('name is not a string')
    if (typeof lyrics !== 'string') throw new Error('lyrics is not a string')
    if (typeof verseAssociated !== 'string' && verseAssociated != null)
      throw new Error('verseAssociated is not a string')
    if (typeof timestamps !== 'string')
      throw new Error('timestamps is not a string')
    if (typeof doubleChorus !== 'number')
      throw new Error('doubleChorus is not a number')

    const hymn = {
      number,
      name,
      lyrics: JSON.parse(lyrics),
      verseAssociated: verseAssociated === 'NULL' ? undefined : verseAssociated,
      timestamps: JSON.parse(timestamps),
      doubleChorus: doubleChorus === 1,
    }

    hymns.push(hymn)
  }

  return hymns
}

function parseBaseHymn(result: ResultSet): BaseHymn[] {
  const numberIndex = result.columns.indexOf('number')
  const nameIndex = result.columns.indexOf('name')

  if (numberIndex === -1) throw new Error('numberIndex not found')
  if (nameIndex === -1) throw new Error('nameIndex not found')

  const hymns: BaseHymn[] = []

  for (const row of result.rows) {
    const number = row[numberIndex]
    const name = row[nameIndex]

    if (typeof number !== 'number') throw new Error('number is not a number')
    if (typeof name !== 'string') throw new Error('name is not a string')

    const hymn = {
      number,
      name,
    }

    hymns.push(hymn)
  }

  return hymns
}
