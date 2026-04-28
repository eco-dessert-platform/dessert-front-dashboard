import { Button } from '@dessert/ui'

import { cn } from '@/shared/libs/utils'

interface RegisterStepFooterProps {
  nextLabel?: string
  prevLabel?: string
  onNext: () => void
  onPrev: () => void
  nextDisabled?: boolean
  prevDisabled?: boolean
  className?: string
}

export function RegisterStepFooter({
  nextLabel = '수정하기',
  prevLabel = '다음',
  onNext,
  onPrev,
  nextDisabled,
  prevDisabled,
  className,
}: RegisterStepFooterProps) {
  return (
    <div
      className={cn(
        'sticky bottom-0 mt-auto -mx-[calc(50vw-50%)] w-screen border-t border-gray-200 bg-white',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1240px] justify-end gap-12 px-[90px] py-24">
        <Button
          title={prevLabel}
          variant="primary-filled"
          size="lg"
          onClick={onPrev}
          disabled={prevDisabled}
          className="disabled:border-gray-300 disabled:bg-gray-300 disabled:opacity-100"
        />
        <Button
          title={nextLabel}
          variant="primary-filled"
          size="lg"
          onClick={onNext}
          disabled={nextDisabled}
        />
      </div>
    </div>
  )
}
