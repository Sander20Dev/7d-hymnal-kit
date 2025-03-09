interface SearchBarProps {
  onSearch: (search: string) => void
  search: string
}

export default function SearchBar({ search, onSearch }: SearchBarProps) {
  return (
    <label className='w-full h-16 p-4 bg-white border border-gray-200'>
      <input
        className='border border-gray-200 w-full h-full px-4 py-2 bg-transparent rounded-md outline-2 outline-transparent focus:outline-blue-200 transition'
        type='text'
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder='Buscar'
      />
    </label>
  )
}
