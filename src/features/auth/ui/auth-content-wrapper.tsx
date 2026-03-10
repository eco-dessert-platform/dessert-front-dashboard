import { ReactNode } from 'react'

import { clsx } from 'clsx'

interface WrapperProps {
  children: ReactNode
  centered?: boolean
}

export const AuthContentWrapper = ({
  children,
  centered = false,
}: WrapperProps) => {
  return (
    <main
      className={clsx(
        'flex flex-1 flex-col overflow-hidden p-6',
        centered && 'items-center justify-center',
      )}
    >
      <div className="w-full max-w-[1050px]">{children}</div>
    </main>
  )
}
