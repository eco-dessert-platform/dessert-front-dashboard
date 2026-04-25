import React from 'react'

import { cn } from '@/shared/libs/utils'

import { useCreateHeaderSteps } from './use-create-form-steps.hook'

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
  const { headerHeight } = useCreateHeaderSteps()

  return (
    <div
      id={id}
      className={cn('mt-20 bg-white', className)}
      style={{
        scrollMarginTop: `${headerHeight + 2}px`,
      }}
    >
      <div className="px-24 pt-16 pb-24">{children}</div>
    </div>
  )
}
