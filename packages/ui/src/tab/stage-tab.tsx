import * as React from 'react'

import { CheckIcon } from '@dessert/icons'

import { cn } from '../lib/utils'

interface StageTabProps {
  /** 각 단계의 라벨 배열 */
  steps: string[]
  /** 각 단계의 필수 입력 완료 여부 (steps와 동일한 길이) */
  completedSteps: boolean[]
  /** 추가적인 클래스명 */
  className?: string
  /** 단계 클릭 시 실행될 콜백 */
  onStepClick?: (index: number) => void
}

export function StageTab({
  steps,
  completedSteps,
  className,
  onStepClick,
}: StageTabProps) {
  return (
    <div
      className={cn(
        'relative flex h-[60px] w-full items-center justify-center border-b border-gray-200 bg-white px-10 py-4',
        className,
      )}
    >
      <div className="flex shrink-0 items-center justify-center gap-10">
        {steps.map((step, index) => {
          const isCompleted = completedSteps[index] ?? false
          const Component = onStepClick ? 'button' : 'div'
          const componentProps = onStepClick
            ? { type: 'button' as const, onClick: () => onStepClick(index) }
            : {}
          return (
            <Component
              key={step}
              {...componentProps}
              aria-current={isCompleted ? 'step' : undefined}
              className={cn(
                'flex shrink-0 items-center gap-2',
                onStepClick &&
                  'cursor-pointer rounded-4 border-0 bg-transparent p-0 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none',
              )}
            >
              <span
                className={cn(
                  'text-[16px] leading-[1.6] font-medium tracking-[-0.32px] whitespace-nowrap transition-colors',
                  isCompleted
                    ? 'font-semibold text-primary-500'
                    : 'text-gray-600',
                )}
              >
                {step}
              </span>
              <CheckIcon
                className={cn(
                  'size-24 shrink-0 transition-colors',
                  isCompleted ? 'text-primary-500' : 'text-gray-600',
                )}
              />
            </Component>
          )
        })}
      </div>
    </div>
  )
}
