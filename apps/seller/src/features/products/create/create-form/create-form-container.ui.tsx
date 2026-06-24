import React from 'react'

import { cn } from '@/shared/libs/utils'

import { useCreateHeaderSteps } from '../create-header/use-create-header-steps.hook'

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
        // headerHeight 초기값(0)일 때도 스크롤 앵커가 헤더에 가리지 않도록 fallback 적용
        scrollMarginTop: `${Math.max(headerHeight, 100) + 2}px`,
      }}
    >
      <div className="px-24 pt-16 pb-24">{children}</div>
    </div>
  )
}
