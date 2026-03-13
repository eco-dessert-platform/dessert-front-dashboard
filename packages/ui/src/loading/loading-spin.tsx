import { ReactNode } from 'react'

import { Loader } from 'lucide-react'

type SSspinProps = {
  children?: ReactNode
  className?: string
  loading: boolean
  size?: number
  strokeWidth?: number
  overlayColor?: string
  overlayOpacity?: string
  text?: string
}

const LoadingSpin = ({
  children,
  className = '',
  loading,
  size = 24,
  strokeWidth = 2,
  overlayColor = 'bg-white',
  overlayOpacity = 'opacity-80',
  text = '',
}: SSspinProps) => {
  return (
    <div
      className={`relative flex size-full items-center justify-center overflow-hidden rounded-[0.3rem] ${className}`}
    >
      {loading && (
        <div
          className={`absolute inset-0 z-50 flex size-full items-center justify-center rounded-[0.3rem] ${overlayColor} ${overlayOpacity}`}
        >
          <Loader
            className="animate-spin text-primary"
            size={size}
            strokeWidth={strokeWidth}
          />
          {text && <div className="ml-4 text-2xl">{text}</div>}
        </div>
      )}
      {children}
    </div>
  )
}

export { LoadingSpin }
