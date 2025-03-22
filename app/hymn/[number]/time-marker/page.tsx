import { getHymnFromServer, getHymnLyricsUrl } from '@/app/lib/hymns'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TimeMarker from './ui/time-marker'
import { HymnVerse, PageProps } from '@/app/types'
import { getFormattedLyrics } from '@/app/lib/lyrics'

export default async function TimeMarkerPage({
  params,
}: PageProps<{ number: string }>) {
  const number = (await params).number

  const hymn = await getHymnFromServer(number)

  if (hymn == null) return notFound()

  if (hymn.lyrics.length === 0)
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
    <main className='flex flex-col sm:grid sm:grid-cols-3 sm:grid-rows-[80px_1fr_1fr_1fr] w-full h-screen gap-4 p-4 bg-slate-50'>
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
      <TimeMarker
        number={hymn.number}
        formattedLyrics={formattedLyrics}
        defaultTimestamps={hymn.timestamps}
      />
    </main>
  )
}
