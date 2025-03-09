export type Hymn = BaseHymn & ExtraHymn

export interface BaseHymn {
  number: number
  name: string
}

export interface ExtraHymn {
  lyrics: HymnVerse[]
  verseAssociated?: string // TODO: Make this required
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
