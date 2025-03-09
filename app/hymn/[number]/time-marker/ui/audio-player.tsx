import { useEffect, useState } from 'react'
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconRewindBackward5,
  IconRewindForward5,
} from '@tabler/icons-react'
import { ControlButton } from './buttons'

export default function AudioPlayer({ audio }: { audio: HTMLAudioElement }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (audio == null) return

    setIsPlaying(!audio.paused)
    if (!isNaN(audio.duration)) setDuration(audio.duration)
    setCurrentTime(audio.currentTime)

    audio.addEventListener('play', () => setIsPlaying(true))
    audio.addEventListener('pause', () => setIsPlaying(false))
    audio.addEventListener('timeupdate', () =>
      setCurrentTime(audio.currentTime)
    )
    audio.addEventListener('durationchange', () => setDuration(audio.duration))
  }, [audio])

  return (
    <section className='bg-amber-50 flex flex-col justify-center items-center p-4 rounded-xl text-xl text-center gap-4'>
      <div className='flex justify-center items-center gap-4 w-full'>
        <ControlButton
          onClick={() => (audio.currentTime -= 5)}
          title='Retroceder'>
          <IconRewindBackward5 />
        </ControlButton>
        <ControlButton
          onClick={() => (audio.paused ? audio.play() : audio.pause())}
          title={isPlaying ? 'Pausar' : 'Reproducir'}>
          {isPlaying ? (
            <IconPlayerPauseFilled size={32} />
          ) : (
            <IconPlayerPlayFilled size={32} />
          )}
        </ControlButton>
        <ControlButton onClick={() => (audio.currentTime += 5)} title='Avanzar'>
          <IconRewindForward5 />
        </ControlButton>
      </div>
      <div className='flex flex-col justify-center items-center w-full'>
        <input
          type='range'
          className='w-full accent-amber-200'
          min={0}
          max={duration}
          value={currentTime}
          onChange={(e) => (audio.currentTime = +e.target.value)}
        />
        <div className='flex justify-between items-center w-full'>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </section>
  )
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}
