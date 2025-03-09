import Logo from './logo'

export default function Hero() {
  return (
    <div className='relative min-h-screen overflow-hidden'>
      <header className='absolute inset-0 z-10 grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4'>
        <div className='flex flex-col items-center justify-center gap-2 p-4'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-center'>
            7d Himnario Kit
          </h1>
          <p className='text-center text-lg sm:text-xl text-gray-700'>
            Paquete de herramientas para completar el 7d Himnario
          </p>
        </div>
        <div className='hidden sm:flex relative justify-center items-center'>
          <Logo className='text-slate-600 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 scale-150 origin-right' />
        </div>
      </header>
      <div className='w-full h-full'>
        <div className='absolute w-96 h-96 top-0 left-0 bg-amber-100 rounded-br-full' />
        <div className='absolute w-96 h-96 bottom-0 right-0 bg-blue-100 rounded-tl-full' />
      </div>
    </div>
  )
}
