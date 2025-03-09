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
  doubleChorus: boolean
}

export interface HymnVerse {
  kind: 'verse' | 'chorus'
  lines: VerseLine[]
}

export interface VerseLine {
  text: string
  timestamp: number
}

export type PageProps<T> = {
  params: Promise<T>
}
