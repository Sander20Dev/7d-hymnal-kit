export interface BaseHymn {
  number: number
  name: string
}

export interface Hymn extends BaseHymn {
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
