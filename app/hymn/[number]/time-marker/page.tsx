import { getHymnLyricsUrl, hymns } from '@/app/lib/hymns'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TimeMarker from './ui/time-marker'
import { HymnVerse, PageProps } from '@/app/types'

export default async function TimeMarkerPage({
  params,
}: PageProps<{ number: string }>) {
  const number = (await params).number

  if (number == null) return notFound()

  const hymn = hymns.find((h) => h.number.toString() === number)

  if (hymn == null) return notFound()

  if (hymn.lyrics == null)
    return (
      <main className='grid place-content-center'>
        <Link
          href={'/hymn/' + hymn.number}
          className='bg-white hover:bg-amber-50 rounded-xl flex items-center justify-center'>
          Este himno no ha sido transcrito todavía. ¿Quieres{' '}
          <Link href={getHymnLyricsUrl(hymn.number)} target='_blank'>
            transcribirlo?
          </Link>
        </Link>
      </main>
    )

  const formattedLyrics = getFormattedLyrics(
    hymn.lyrics,
    hymn.doubleChorus ?? false
  )

  return (
    <main className='grid grid-cols-3 grid-rows-[80px_1fr_1fr_1fr] w-full h-screen gap-4 p-4 bg-slate-50'>
      <div className='col-span-3 grid grid-cols-[80px_1fr] w-full gap-4'>
        <Link
          href={'/hymn/' + hymn.number}
          className='bg-white hover:bg-amber-50 rounded-xl flex items-center justify-center'>
          {'<'}
        </Link>
        <h1 className='bg-white flex items-center justify-center text-center text-xl sm:text-2xl font-bold overflow-hidden text-ellipsis whitespace-nowrap p-2 rounded-xl'>
          Himno {hymn.number} - {hymn.name}
        </h1>
      </div>
      <TimeMarker number={hymn.number} formattedLyrics={formattedLyrics} />
    </main>
  )
}

function getFormattedLyrics(lyrics: HymnVerse[], doubleChorus: boolean) {
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
      const a = chorusPosition === 0 ? 1 : 0
      return lyricsWithoutChorus[(i + a) / 2]
    }
  })

  if (doubleChorus) {
    if (chorusPosition === 0) {
      formattedLyrics.unshift(formattedLyrics[0])
    } else {
      formattedLyrics.push(formattedLyrics[1])
    }
  }

  return formattedLyrics
}
