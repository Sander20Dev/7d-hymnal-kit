import type { Hymn } from '@/app/types'
import HymnCard from './hymn-card'

interface HymnCollectionProps {
  hymns: Hymn[]
}

export default function HymnCollection({ hymns }: HymnCollectionProps) {
  return (
    <article className='grid grid-cols-[repeat(auto-fill,minmax(192px,1fr))] gap-4 p-4'>
      {hymns.map((hymn) => (
        <HymnCard key={hymn.number} hymn={hymn} />
      ))}
    </article>
  )
}
