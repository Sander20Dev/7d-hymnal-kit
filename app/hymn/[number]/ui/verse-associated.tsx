'use client'

import { clientDB } from '@/app/lib/db/db.client'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useState } from 'react'

export default function VerseAssociated({
  number,
  verseAssociated,
}: {
  number: number
  verseAssociated?: string
}) {
  const [verse, setVerse] = useState(verseAssociated ?? '')

  return (
    <section className='sm:col-start-3 sm:row-start-2 bg-blue-100 flex justify-center items-center text-center p-4 rounded-xl text-xl'>
      <input
        type='text'
        value={verse}
        onChange={(e) => {
          setVerse(e.target.value)
        }}
        placeholder='Versículo asociado'
        className='bg-blue-50 border border-blue-100 outline-blue-300 rounded-md rounded-r-none px-2 py-1 text-center h-10'
      />
      <button
        disabled={verse === verseAssociated}
        className='bg-blue-200 hover:bg-blue-300 rounded-md rounded-l-none p-2 text-center disabled:grayscale-25 disabled:hover:bg-blue-200'
        onClick={async () => {
          if (confirm('¿Está seguro de que desea guardar?')) {
            alert('Guardado')
            if (!confirm('¿Realmente pero realmente está seguro?')) return
            await clientDB.execute({
              sql: 'UPDATE hymn_info SET verse_associated = ? WHERE number = ?',
              args: [verse, number],
            })
            window.location.reload()
          }
        }}>
        <IconDeviceFloppy />
      </button>
    </section>
  )
}
