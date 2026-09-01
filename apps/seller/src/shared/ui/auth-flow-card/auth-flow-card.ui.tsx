import { ReactNode } from 'react'

import { cn } from '@dessert/core'

interface AuthFlowCardProps {
  image: ReactNode
  children: ReactNode
  className?: string
}

export function AuthFlowCard({
  image,
  children,
  className,
}: AuthFlowCardProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center gap-16 overflow-hidden rounded-20 border border-gray-200 bg-white p-10',
        className,
      )}
    >
      {image}
      <div className="flex flex-1 flex-col items-center justify-center gap-56 px-20">
        {children}
      </div>
    </div>
  )
}
