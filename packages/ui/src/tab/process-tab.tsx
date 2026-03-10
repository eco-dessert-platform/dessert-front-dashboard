import * as React from 'react'

import { ChevronRight } from 'lucide-react'

import { cn } from '../lib/utils'

interface ProcessTabProps {
  currentStep: number
  steps: string[]
  className?: string
}

export function ProcessTab({ currentStep, steps, className }: ProcessTabProps) {
  return (
    <div
      className={cn(
        'relative flex h-[60px] w-full items-center justify-center border-b border-gray-200 bg-white px-[90px] py-16',
        className,
      )}
    >
      <div className="flex w-full max-w-[1260px] items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index + 1 <= currentStep
          const isLast = index === steps.length - 1

          return (
            <React.Fragment key={step}>
              <span
                className={cn(
                  'text-[16px] leading-[1.6] font-semibold tracking-[-0.32px] whitespace-nowrap transition-colors',
                  isActive ? 'text-primary-500' : 'text-gray-300',
                )}
              >
                {step}
              </span>
              {!isLast && (
                <ChevronRight
                  className={cn(
                    'size-24 shrink-0 transition-colors',
                    isActive ? 'text-primary-500' : 'text-gray-200',
                  )}
                  strokeWidth={2}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
