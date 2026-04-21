import React from 'react'

import { cn } from '@/shared/libs/utils'

interface CreateFormContainerProps {
  className?: string
  children: React.ReactNode
  id: string
}

export const CreateFormContainer = ({
  className,
  children,
  id,
}: CreateFormContainerProps) => {
  return (
    <div id={id} className={cn('mt-20 bg-white', className)}>
      <div className="px-24 pt-16 pb-24">{children}</div>
    </div>
  )
}
