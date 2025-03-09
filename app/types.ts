export type Hymn = NoCompletedHymn | CompletedHymn

export type NoCompletedHymn = BaseHymn & Partial<ExtraHymn>
export type CompletedHymn = BaseHymn & ExtraHymn

export interface BaseHymn {
  number: number
  name: string
}

export interface ExtraHymn {
  lyrics: HymnVerse[]
  verseAssociated: string
  timestamps: number[]
  doubleChorus: boolean
}

export interface HymnVerse {
  kind: 'verse' | 'chorus'
  lines: string[]
}

export type PageProps<T> = {
  params: Promise<T>
}
