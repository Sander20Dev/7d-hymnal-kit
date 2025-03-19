import type { BaseHymn } from '@/app/types'
import HymnCard from './hymn-card'
import { IconLoader2 } from '@tabler/icons-react'

interface HymnCollectionProps {
  isLoading: boolean
  hymns: BaseHymn[]
}

export default function HymnCollection({
  isLoading,
  hymns,
}: HymnCollectionProps) {
  return (
    <article className='grid grid-cols-[repeat(auto-fill,minmax(192px,1fr))] justify-items-center gap-4 p-4 min-h-72 relative'>
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-blue-50/50 text-blue-950 backdrop-blur-sm z-10'>
          <IconLoader2 className='animate-spin' size={32} />
        </div>
      )}
      {hymns.map((hymn) => (
        <HymnCard key={hymn.number} hymn={hymn} />
      ))}
    </article>
  )
}
