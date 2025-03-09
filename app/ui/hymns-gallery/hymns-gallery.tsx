'use client'

import { useEffect, useRef, useState } from 'react'
import SearchBar from './search-bar'
import HymnCollection from './hymn-collection'
import { BaseHymn, Hymn } from '@/app/types'
import { HymnClientModel } from '@/app/lib/models/hymns.client'
import Pagination from './pagination'

export default function HymnsGallery() {
  const [baseHymns, setBaseHymns] = useState<BaseHymn[]>([])
  const [filteredHymns, setFilteredHymns] = useState<Hymn[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const debounceTimer = useRef<number | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    HymnClientModel.getBaseHymns().then(setBaseHymns)
  }, [])

  useEffect(() => {
    if (debounceTimer.current != null) {
      window.clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = window.setTimeout(() => {
      setIsLoading(true)

      const result = baseHymns.filter(
        (hymn) =>
          hymn.name.includes(search) || hymn.number.toString().includes(search)
      )

      HymnClientModel.searchHymns(search, { offset: (currentPage - 1) * 50 })
        .then((hymns) => {
          setFilteredHymns(hymns)
          const totalPages = Math.ceil((result.length || 613) / 50)
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
