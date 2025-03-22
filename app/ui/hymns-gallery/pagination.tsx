import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
}) {
  return (
    <nav className='fixed z-20 bottom-4 left-1/2 -translate-1/2 flex items-center justify-center gap-4 p-4 bg-blue-100 border border-blue-200 rounded-xl'>
      <button
        className='bg-blue-200 hover:bg-blue-300 rounded-xl p-2 text-center'
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
        <IconChevronLeft />
      </button>
      <div className='bg-blue-200 rounded-xl p-2 text-center'>
        <input
          className='bg-blue-50 border border-blue-100 outline-blue-300 rounded-xl px-2 py-1 text-center mr-1'
          type='number'
          value={currentPage}
          onChange={(e) =>
            setCurrentPage(
              Math.max(1, Math.min(Number(e.target.value), totalPages))
            )
          }
          min={1}
          max={totalPages}
        />
        de {totalPages}
      </div>
      <button
        className='bg-blue-200 hover:bg-blue-300 rounded-xl p-2 text-center'
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>
        <IconChevronRight />
      </button>
    </nav>
  )
}
