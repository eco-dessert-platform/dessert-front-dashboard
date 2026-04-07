import React from 'react'

import { cn } from '@/shared/libs/utils'

interface CreateFormContainerProps {
  className?: string
  children: React.ReactNode
}

export const CreateFormContainer = ({
  className,
  children,
}: CreateFormContainerProps) => {
  return (
    <div className={cn('mt-20 bg-white', className)}>
      <div className="px-24 pt-16 pb-24">{children}</div>
    </div>
  )
}
