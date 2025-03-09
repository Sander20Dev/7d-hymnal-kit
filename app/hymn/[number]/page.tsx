import { getHymnFromServer, getHymnLyricsUrl } from '@/app/lib/hymns'
import { PageProps } from '@/app/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import VerseAssociated from './ui/verse-associated'

export default async function HymnPage({
  params,
}: PageProps<{ number: string }>) {
  const number = (await params).number

  const hymn = await getHymnFromServer(number)

  if (hymn == null) return notFound()

  return (
    <main className='flex flex-col sm:grid sm:grid-cols-3 sm:grid-rows-[80px_1fr_1fr_1fr] w-full min-h-screen gap-4 p-4 bg-slate-50'>
      <div className='sm:col-span-3 grid grid-cols-[80px_1fr] w-full gap-4'>
        <Link
          href='/'
          className='bg-white hover:bg-amber-50 rounded-xl flex items-center justify-center'>
          {'<'}
        </Link>
        <h1 className='bg-white flex items-center sm:justify-center sm:text-center text-xl sm:text-2xl font-bold overflow-hidden text-ellipsis whitespace-nowrap p-2 rounded-xl'>
          Himno {hymn.number} - {hymn.name}
        </h1>
      </div>

      <VerseAssociated
        number={hymn.number}
        verseAssociated={hymn.verseAssociated}
      />
      <Link
        href={`/hymn/${hymn.number}/time-marker`}
        className='sm:row-span-2 sm:col-start-3 sm:row-start-3 bg-amber-100 hover:bg-amber-200 flex justify-center p-4 rounded-xl text-xl text-center items-center'>
        Editar o crear marcas de tiempo
      </Link>
      <Link
        target='_blank'
        href={getHymnLyricsUrl(hymn.number)}
        className='sm:col-span-2 sm:row-span-3 sm:row-start-2 bg-white hover:bg-blue-50 flex flex-col justify-center items-center p-4 text-center gap-4 flex-wrap rounded-xl'>
        {hymn.lyrics.length !== 0 ? (
          hymn.lyrics.map(({ lines, kind }, i, arr) => (
            <section key={'line-' + i}>
              <p className='font-bold'>
                {kind === 'chorus'
                  ? 'Coro:'
                  : 'Estrofa ' +
                    (arr.slice(0, i).some(({ kind }) => kind === 'chorus')
                      ? i
                      : i + 1) +
                    ':'}
              </p>
              {lines.map((l) => (
                <p key={'line-' + i + '-' + l}>{l}</p>
              ))}
            </section>
          ))
        ) : (
          <p>Aún no se ha transcito este himno.</p>
        )}
      </Link>
    </main>
  )
}
