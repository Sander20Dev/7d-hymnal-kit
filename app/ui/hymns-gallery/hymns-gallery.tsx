'use client'

import { useState } from 'react'
import SearchBar from './search-bar'
import HymnCollection from './hymn-collection'
import { hymnsSortedByNoReady } from '@/app/lib/hymns'

export default function HymnsGallery() {
  const [search, setSearch] = useState('')
  return (
    <div className='flex flex-col'>
      <SearchBar search={search} onSearch={setSearch} />
      <HymnCollection hymns={hymnsSortedByNoReady} />
    </div>
  )
}
