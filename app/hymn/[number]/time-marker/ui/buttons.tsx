import clsx from 'clsx'

export interface ButtonProps {
  disabled?: boolean
  children: React.ReactNode
  onClick: () => void
  title?: string
  className?: string
}

export function PrimaryButton({
  onClick,
  children,
  disabled,
  title,
  className,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'px-4 py-2 rounded-md bg-amber-200 hover:bg-amber-300 text-amber-800 hover:text-amber-900 transition disabled:grayscale-50 disabled:hover:bg-amber-200 disabled:cursor-not-allowed',
        className
      )}
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
  className,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'p-2 rounded-md bg-green-400 hover:bg-green-500 text-green-800 hover:text-green-900 transition disabled:grayscale-50 disabled:hover:bg-green-400 disabled:cursor-not-allowed',
        className
      )}
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
  className,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'p-2 rounded-md bg-red-400 hover:bg-red-500 text-red-800 hover:text-red-900 transition disabled:grayscale-50 disabled:hover:bg-red-400 disabled:cursor-not-allowed',
        className
      )}
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
  className,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'p-2 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-800 hover:text-amber-900 transition disabled:grayscale-50 disabled:hover:bg-amber-100 disabled:cursor-not-allowed',
        className
      )}
      title={title}
      onClick={onClick}>
      {children}
    </button>
  )
}
