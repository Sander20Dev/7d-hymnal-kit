import type { Hymn } from '../types'
import { HymnServerModel } from './models/hymns.server'

export function isHymnReady(hymn: Hymn) {
  if (hymn.verseAssociated == null) return false
  if (hymn.lyrics == null) return false
  if (hymn.lyrics.length === 0) return false
  if (hymn.timestamps == null) return false
  if (hymn.timestamps.length === 0) return false

  return true
}

export function getHymnLyricsUrl(hymnNumber: number) {
  if (hymnNumber < 1 || hymnNumber > 613) return ''

  if (hymnNumber < 101)
    return 'https://docs.google.com/document/d/1N5-lFoKF6UJx2VFWp4AzHi2SJSBdXQm_c7zz78bvXyE/edit?usp=drive_link'
  if (hymnNumber < 201)
    return 'https://docs.google.com/document/d/10dg38pqtLcxNs42CvspJk__w8tG6Pa4PCjveJXlJD-4/edit?usp=drive_link'
  if (hymnNumber < 301)
    return 'https://docs.google.com/document/d/1W2h232QHdfFbq8-sD9g9faCyaLCt0-FmpPCkbeFQuRU/edit?usp=drive_link'
  if (hymnNumber < 401)
    return 'https://docs.google.com/document/d/1ItG7FqoaFsGE0LbIuxUKKVUEyxzfEdXO4t_b0VSV4zs/edit?usp=drive_link'

  return 'https://docs.google.com/document/d/1la0CHme9cqiTXoWHikJwmzsQeXOaS2MPTR8rUHtpCrM/edit?usp=drive_link'
}

export async function getHymnFromServer(number?: string) {
  if (number == null) return null

  const num = Number(number)

  if (Number.isNaN(num)) return null

  const hymn = await HymnServerModel.getHymn(num)

  if (hymn == null) return null

  return hymn
}
