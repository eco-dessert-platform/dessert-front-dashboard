import IconCheck from '@/assets/icons/icon-check.svg?react'

import { cn } from '@/shared/lib/utils'

interface StageTabProps {
  /** 1부터 시작하는 현재 단계 번호 */
  currentStep: number
  /** 각 단계의 라벨 배열 */
  steps: string[]
  /** 추가적인 클래스명 */
  className?: string
}

export function StageTab({
  currentStep,
  steps,
  className,
}: StageTabProps) {
  return (
    <div
      className={cn(
        'relative flex h-[60px] w-full items-center justify-center border-b border-gray-200 bg-white px-10 py-4',
        className,
      )}
    >
      <div className="flex shrink-0 items-center justify-center gap-2.5">
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep

          return (
            <div key={step} className="flex shrink-0 items-center gap-0.5">
              <span
                className={cn(
                  'text-[16px] leading-[1.6] font-medium tracking-[-0.32px] whitespace-nowrap transition-colors',
                  isActive ? 'text-primary-500 font-semibold' : 'text-gray-600',
                )}
              >
                {step}
              </span>
              <IconCheck
                className={cn(
                  'size-6 shrink-0 transition-colors',
                  isActive ? 'text-primary-500' : 'text-gray-600',
                )}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
