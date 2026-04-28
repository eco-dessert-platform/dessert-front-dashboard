import { Fragment } from 'react'

import { ChevronRightIcon } from '@dessert/icons'

import { cn } from '@/shared/libs/utils'

const STEPS = ['판매자 인증', '스토어 정보 등록', '회원가입 완료'] as const

export type RegisterStep = 1 | 2 | 3

interface RegisterProcessStepProps {
  current: RegisterStep
  className?: string
}

export function RegisterProcessStep({
  current,
  className,
}: RegisterProcessStepProps) {
  return (
    <div
      className={cn(
        'flex h-[60px] w-full items-center justify-center border-b border-gray-200 bg-white px-[90px] py-4',
        className,
      )}
    >
      <div className="flex items-center gap-[60px]">
        {STEPS.map((label, index) => {
          const step = (index + 1) as RegisterStep
          const isActive = step <= current
          const isLast = index === STEPS.length - 1

          return (
            <Fragment key={label}>
              <span
                aria-current={isActive ? 'step' : undefined}
                className={cn(
                  'typo-title-16-sb whitespace-nowrap',
                  isActive ? 'text-primary-500' : 'text-gray-300',
                )}
              >
                {label}
              </span>
              {!isLast && (
                <ChevronRightIcon
                  aria-hidden
                  className="size-7 text-gray-400"
                />
              )}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
