import { IconMinus, IconPlus } from '@tabler/icons-react'
import { AcceptButton, CancelButton } from './buttons'
import { useEffect } from 'react'

interface TimeMarkerControlsProps {
  audio: HTMLAudioElement
  timestamps: number[]
  setTimestamps: (timestamps: number[]) => void
  length: number
}

export default function TimeMarkerControls({
  audio,
  timestamps,
  setTimestamps,
  length,
}: TimeMarkerControlsProps) {
  return (
    <section className='bg-amber-50 flex justify-center items-center gap-4 p-4 rounded-xl text-xl text-center'>
      <AcceptButton
        onClick={() => setTimestamps([...timestamps, audio.currentTime])}
        disabled={timestamps.length >= length}
        title='Añadir marca'>
        <IconPlus size={32} />
      </AcceptButton>
      <CancelButton
        onClick={() => setTimestamps(timestamps.slice(0, -1))}
        disabled={timestamps.length <= 0}
        title='Quitar marca'>
        <IconMinus size={32} />
      </CancelButton>
    </section>
  )
}
