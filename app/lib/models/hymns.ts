import type { Hymn, BaseHymn } from '@/app/types'
import type { Client, ResultSet } from '@libsql/client'

export default class HymnModel {
  constructor(public clientDB: Client) {}

  async getBaseHymns(): Promise<BaseHymn[]> {
    const result = await this.clientDB.execute('SELECT * FROM hymn_info')

    return parseBaseHymn(result)
  }

  async getHymns({ offset = 0, limit = 50 } = {}): Promise<Hymn[]> {
    const result = await this.clientDB.execute({
      sql: 'SELECT * FROM hymn_info LIMIT ? OFFSET ?',
      args: [limit, offset],
    })

    return parseHymn(result)
  }

  async getHymn(number: number): Promise<Hymn | null> {
    const result = await this.clientDB.execute({
      sql: 'SELECT * FROM hymn_info WHERE number = ?',
      args: [number],
    })

    const [hymn] = parseHymn(result)

    if (hymn == null) return null

    return hymn
  }

  async setHymn(hymn: Hymn): Promise<void> {
    await this.clientDB.execute({
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

  async searchHymns(
    search: string,
    {
      offset = 0,
      limit = 50,
      withLyrics,
      withTimestamps,
    }: {
      offset?: number
      limit?: number
      withLyrics?: boolean
      withTimestamps?: boolean
    } = {}
  ): Promise<{ data: BaseHymn[]; count: number }> {
    const lyricsFilter =
      withLyrics == null
        ? null
        : withLyrics
        ? 'lyrics != "[]"'
        : 'lyrics = "[]"'

    const timestampsFilter =
      withTimestamps == null
        ? null
        : withTimestamps
        ? 'timestamps != "[]" AND timestamps IS NOT NULL'
        : '(timestamps = "[]" OR timestamps IS NULL)'

    const filters = [lyricsFilter, timestampsFilter]
      .filter(Boolean)
      .join(' AND ')

    const sql = (data: string) =>
      `SELECT ${data} FROM hymn_info WHERE ${
        filters && filters + ' AND '
      }(name LIKE ? OR number LIKE ?) LIMIT ? OFFSET ?`

    const result = await this.clientDB.execute({
      sql: sql('name, number'),
      args: [`%${search}%`, `%${search}%`, limit, offset],
    })

    const countResult = await this.clientDB.execute({
      sql: sql('COUNT(name)'),
      args: [`%${search}%`, `%${search}%`, 613, 0],
    })

    const count = countResult.rows[0][0] as number

    return { data: parseBaseHymn(result), count }
  }
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
