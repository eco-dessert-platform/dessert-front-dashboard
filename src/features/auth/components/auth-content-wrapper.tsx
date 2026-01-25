import { ReactNode } from 'react'
import clsx from 'clsx'

interface WrapperProps {
  children: ReactNode
  centered?: boolean
  fullHeight?: boolean
}

export const AuthContentWrapper = ({
  children,
  centered = false,
  fullHeight = false,
}: WrapperProps) => {
  return (
    <main
      className={clsx(
        'flex flex-1 flex-col px-6 py-10',
        centered && 'items-center justify-center',
        fullHeight && 'min-h-[calc(100vh-160px)]',
      )}
    >
      <div className="w-full max-w-[1240px]">{children}</div>
    </main>
  )
}
