'use client'

import { useRef, useState } from 'react'
import { HymnVerse } from '@/app/types'
import AudioPlayer from './audio-player'
import TimeMarkerControls from './time-marker-controls'
import clsx from 'clsx'
import { PrimaryButton } from './buttons'
import Link from 'next/link'

interface TimeMarkerProps {
  number: number
  formattedLyrics: HymnVerse[]
  defaultTimestamps?: number[]
}

export default function TimeMarker({
  number,
  formattedLyrics,
  defaultTimestamps = [],
}: TimeMarkerProps) {
  const [timestamps, setTimestamps] = useState<number[]>(defaultTimestamps)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const length = formattedLyrics.reduce((acc, v) => acc + v.lines.length, 1)

  return (
    <>
      <section className='sm:col-span-2 sm:row-span-3 sm:row-start-2 bg-white flex flex-col justify-center items-center p-4 text-center gap-4 flex-wrap rounded-xl text-lg overflow-x-auto'>
        <section>
          <p
            className={clsx(
              timestamps.length === 0
                ? 'text-blue-950 font-bold'
                : timestamps.length > 0
                ? 'text-blue-700 font-semibold grayscale-25'
                : 'text-blue-800/60'
            )}>
            -- Introducción --
          </p>
        </section>
        {formattedLyrics.map(({ lines }, i, arr) => (
          <section key={'line-' + i}>
            {lines.map((l, j) => {
              const currentTimeIndex =
                arr.slice(0, i).reduce((acc, v) => acc + v.lines.length, 1) + j
              return (
                <p
                  key={'line-' + i + '-' + l}
                  className={clsx(
                    timestamps.length === currentTimeIndex
                      ? 'text-blue-950 font-bold'
                      : timestamps.length > currentTimeIndex
                      ? 'text-blue-700 font-semibold grayscale-25'
                      : 'text-blue-800/60'
                  )}>
                  {l}
                </p>
              )
            })}
          </section>
        )) ?? <p>Aún no se ha transcito este himno.</p>}
        <section>
          <p
            className={clsx(
              timestamps.length === length
                ? 'text-blue-950 font-bold'
                : timestamps.length > length
                ? 'text-blue-700 font-semibold grayscale-25'
                : 'text-blue-800/60'
            )}>
            -- Salida --
          </p>
        </section>
      </section>
      <section className='sm:row-span-3 sm:col-start-3 sm:row-start-2 bg-amber-100 grid grid-cols-2 grid-rows-2 sm:flex sm:flex-col justify-center p-4 gap-4 rounded-xl text-xl text-center items-center'>
        {audio == null && (
          <PrimaryButton
            onClick={() => {
              if (audio != null) return
              setAudio(
                new Audio(
                  `https://res.cloudinary.com/dnlcoyxtq/video/upload/audios/sung/hymn-${number}.mp3`
                )
              )
            }}
            title='Empezar a marcar'>
            Empezar a marcar
          </PrimaryButton>
        )}
        {audio != null && (
          <>
            <TimeMarkerControls
              audio={audio}
              timestamps={timestamps}
              setTimestamps={setTimestamps}
              length={length}
            />
            <AudioPlayer audio={audio} />
          </>
        )}
        {audio != null && (
          <section className='bg-amber-50 flex flex-col justify-center items-center gap-4 p-4 rounded-xl text-xl text-center'>
            <input
              type='text'
              id='clipboard'
              className='w-full max-w-52 outline-amber-200 bg-amber-100 rounded-md px-2 py-1 text-sm'
              readOnly
              value={`[${timestamps.join(', ')}]`}
            />
            <PrimaryButton
              onClick={() => {
                ;(
                  document.getElementById('clipboard') as HTMLInputElement
                )?.select()
                if (window.navigator.clipboard == null) {
                  document.execCommand('copy')
                } else {
                  window.navigator.clipboard.writeText(
                    `[${timestamps.join(', ')}]`
                  )
                }
              }}
              disabled={timestamps.length !== length}
              title='Guarda el tiempo marcado'>
              Guardar
            </PrimaryButton>
            <Link
              className='bg-amber-300 hover:bg-amber-400'
              href='https://docs.google.com/spreadsheets/d/1QZOdJLYAYf8_YqKyCNqnL5V1D4SbkBFcyEV_pLvjFVY/edit?usp=sharing'
              target='_blank'>
              Ir al registro
            </Link>
          </section>
        )}
      </section>
    </>
  )
}
