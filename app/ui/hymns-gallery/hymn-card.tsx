import { isHymnReady } from '@/app/lib/hymns'
import { HymnClientModel } from '@/app/lib/models/hymns.client'
import { getThumbnail } from '@/app/lib/thumbnails'
import type { Hymn } from '@/app/types'
import Link from 'next/link'

interface HymnCardProps {
  hymn: Hymn
}

export default function HymnCard({ hymn }: HymnCardProps) {
  return (
    <Link
      href={`/hymn/${hymn.number}`}
      className='relative flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-md hover:bg-amber-50 hover:border-amber-200 transition w-48 h-64'>
      {!isHymnReady(hymn) && (
        <div className='absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full' />
      )}
      <img
        src={getThumbnail(hymn.number)}
        alt={`Thumbnail de Himno ${hymn.number}`}
        className='w-full h-full object-cover rounded-md'
      />
      <h2 className='text-2xl font-bold'>Himno {hymn.number}</h2>
      <p className='h-8 text-sm text-gray-700 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis max-w-full'>
        {hymn.name}
      </p>
    </Link>
  )
}
