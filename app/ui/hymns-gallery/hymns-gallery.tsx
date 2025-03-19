'use client'

import { useEffect, useRef, useState } from 'react'
import SearchBar from './search-bar'
import HymnCollection from './hymn-collection'
import { BaseHymn } from '@/app/types'
import { HymnClientModel } from '@/app/lib/models/hymns.client'
import Pagination from './pagination'

const withTimestamps = false

export default function HymnsGallery() {
  const [filteredHymns, setFilteredHymns] = useState<BaseHymn[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const debounceTimer = useRef<number | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    HymnClientModel.getBaseHymns().then(setFilteredHymns)
  }, [])

  useEffect(() => {
    if (debounceTimer.current != null) {
      window.clearTimeout(debounceTimer.current)
    }

    setIsLoading(true)

    debounceTimer.current = window.setTimeout(() => {
      HymnClientModel.searchHymns(search, {
        offset: (currentPage - 1) * 50,
        withTimestamps,
      })
        .then(({ data: hymns, count }) => {
          setFilteredHymns(hymns)
          const totalPages = Math.ceil((count || 0) / 50)
          setTotalPages(totalPages)
          setCurrentPage((c) => (c > totalPages ? totalPages : c))
        })
        .finally(() => {
          setIsLoading(false)
          debounceTimer.current = null
        })
    }, 500)
  }, [search, currentPage])

  return (
    <div className='flex flex-col'>
      <SearchBar search={search} onSearch={setSearch} />
      <HymnCollection isLoading={isLoading} hymns={filteredHymns} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  )
}
