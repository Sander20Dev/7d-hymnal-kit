import { HymnVerse } from '../types'

export function getFormattedLyrics(lyrics: HymnVerse[], doubleChorus: boolean) {
  const chorusPosition = lyrics.findIndex(({ kind }) => kind === 'chorus') as
    | 0
    | 1
    | -1

  if (chorusPosition === -1) return lyrics

  const newLength = (lyrics.length - 1) * 2
  const lyricsWithoutChorus = lyrics.filter(({ kind }) => kind !== 'chorus')

  const formattedLyrics = Array.from({ length: newLength }, (_, i) => {
    const isChorusIndex = i % 2 === chorusPosition

    if (isChorusIndex) {
      return lyrics[chorusPosition]
    } else {
      const index = Math.floor(i / 2)

      return lyricsWithoutChorus[index]
    }
  })

  if (doubleChorus) {
    if (chorusPosition === 1) {
      formattedLyrics.unshift(formattedLyrics[0])
    } else {
      formattedLyrics.push(formattedLyrics[0])
    }
  }

  console.log({ formattedLyrics, lyrics })

  // Filter chorus lines '[i]: line'
  const fixedLyrics = formattedLyrics.map((verse, i) => {
    if (verse.kind !== 'chorus') return verse

    const lines = verse.lines.flatMap((line) => {
      if (!line.startsWith('[')) return line

      const indexEnd = line.indexOf(']')

      if (indexEnd === -1) return line

      const chorusIndex =
        formattedLyrics.slice(0, i).filter((v) => v.kind === 'chorus').length +
        1

      console.log(line)

      if (/\[\d+\] /.test(line)) {
        // [index]: line
        const index = Number(line.slice(1, indexEnd))
        if (isNaN(index)) return []
        if (index < 1) return []
        return chorusIndex === index ? line.slice(indexEnd + 1) : []
      }

      if (/\[\d+\-\d+\] /.test(line)) {
        // [index-index]: line
        const indexRange = line.slice(1, indexEnd).split('-')
        if (indexRange.length !== 2) return []
        const indexRangeStart = Number(indexRange[0])
        const indexRangeEnd = Number(indexRange[1])
        if (isNaN(indexRangeStart) || isNaN(indexRangeEnd)) return []
        if (indexRangeStart < 1 || indexRangeEnd < 1) return []
        return chorusIndex >= indexRangeStart && chorusIndex <= indexRangeEnd
          ? line.slice(indexEnd + 1)
          : []
      }

      return []
    })

    return {
      ...verse,
      lines,
    }
  })

  return fixedLyrics
}
