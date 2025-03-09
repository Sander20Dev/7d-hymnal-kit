import { getHymnLyricsUrl, hymns } from '@/app/lib/hymns'
import { PageProps } from '@/app/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function HymnPage({
  params,
}: PageProps<{ number: string }>) {
  const number = (await params).number

  if (number == null) return notFound()

  const hymn = hymns.find((h) => h.number.toString() === number)

  if (hymn == null) return notFound()

  return (
    <main className='grid grid-cols-3 grid-rows-[80px_1fr_1fr_1fr] w-full min-h-screen gap-4 p-4 bg-slate-50'>
      <div className='col-span-3 grid grid-cols-[80px_1fr] w-full gap-4'>
        <Link
          href='/'
          className='bg-white hover:bg-amber-50 rounded-xl flex items-center justify-center'>
          {'<'}
        </Link>
        <h1 className='bg-white flex items-center justify-center text-center text-xl sm:text-2xl font-bold overflow-hidden text-ellipsis whitespace-nowrap p-2 rounded-xl'>
          Himno {hymn.number} - {hymn.name}
        </h1>
      </div>
      <Link
        target='_blank'
        href={getHymnLyricsUrl(hymn.number)}
        className='col-span-2 row-span-3 row-start-2 bg-white hover:bg-blue-50 flex flex-col justify-center items-center p-4 text-center gap-4 flex-wrap rounded-xl'>
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
      <Link
        target='_blank'
        href='https://docs.google.com/document/d/1Ro-NY207jEMNlPiaYa-f15U8XZsagFW9EgBcbP0PUz8/edit?usp=sharing'
        className='col-start-3 row-start-2 bg-blue-100 hover:bg-blue-200 flex justify-center items-center text-center p-4 rounded-xl text-xl'>
        {hymn.verseAssociated ?? 'No se tiene el versículo asociado.'}
      </Link>
      <Link
        href={`/hymn/${hymn.number}/time-marker`}
        className='row-span-2 col-start-3 row-start-3 bg-amber-100 hover:bg-amber-200 flex justify-center p-4 rounded-xl text-xl text-center items-center'>
        Editar o crear marcas de tiempo
      </Link>
    </main>
  )
}
