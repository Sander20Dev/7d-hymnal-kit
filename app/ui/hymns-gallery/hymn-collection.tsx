import type { Hymn } from '@/app/types'
import HymnCard from './hymn-card'

interface HymnCollectionProps {
  isLoading: boolean
  hymns: Hymn[]
}

export default function HymnCollection({
  isLoading,
  hymns,
}: HymnCollectionProps) {
  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 p-4'>
        <p>Cargando...</p>
      </div>
    )
  }
  return (
    <article className='grid grid-cols-[repeat(auto-fill,minmax(192px,1fr))] justify-items-center gap-4 p-4'>
      {hymns.map((hymn) => (
        <HymnCard key={hymn.number} hymn={hymn} />
      ))}
    </article>
  )
}
