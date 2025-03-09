export interface ButtonProps {
  disabled?: boolean
  children: React.ReactNode
  onClick: () => void
  title?: string
}

export function PrimaryButton({
  onClick,
  children,
  disabled,
  title,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className='px-4 py-2 rounded-md bg-amber-200 hover:bg-amber-300 text-amber-800 hover:text-amber-900 transition disabled:grayscale-50 disabled:hover:bg-amber-200 disabled:cursor-not-allowed'
      onClick={onClick}
      title={title}>
      {children}
    </button>
  )
}

export function AcceptButton({
  onClick,
  children,
  disabled,
  title,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className='p-2 rounded-md bg-green-400 hover:bg-green-500 text-green-800 hover:text-green-900 transition disabled:grayscale-50 disabled:hover:bg-green-400 disabled:cursor-not-allowed'
      title={title}
      onClick={onClick}>
      {children}
    </button>
  )
}

export function CancelButton({
  onClick,
  children,
  disabled,
  title,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className='p-2 rounded-md bg-red-400 hover:bg-red-500 text-red-800 hover:text-red-900 transition disabled:grayscale-50 disabled:hover:bg-red-400 disabled:cursor-not-allowed'
      title={title}
      onClick={onClick}>
      {children}
    </button>
  )
}

export function ControlButton({
  onClick,
  children,
  disabled,
  title,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className='p-2 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-800 hover:text-amber-900 transition disabled:grayscale-50 disabled:hover:bg-amber-100 disabled:cursor-not-allowed'
      title={title}
      onClick={onClick}>
      {children}
    </button>
  )
}
