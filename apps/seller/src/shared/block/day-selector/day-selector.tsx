import { clsx } from 'clsx'

/**
 * @deprecated `widgets` 폴더로 이동되었습니다.
 * 리팩토링 기간 이후 이 컴포넌트는 삭제될 예정입니다.
 * 새로운 코드에서는 `@/widgets` 폴더에 구현된 컴포넌트를 사용해주세요.
 */
export interface DaySelectorProps {
  selectedDays?: string[]
  onDayChange?: (days: string[]) => void
  className?: string
}

const DAYS = [
  { value: 'mon', label: '월' },
  { value: 'tue', label: '화' },
  { value: 'wed', label: '수' },
  { value: 'thu', label: '목' },
  { value: 'fri', label: '금' },
  { value: 'sat', label: '토' },
  { value: 'sun', label: '일' },
]

const DaySelector = ({
  selectedDays = [],
  onDayChange,
  className = '',
}: DaySelectorProps) => {
  const handleDayClick = (dayValue: string) => {
    const newSelectedDays = selectedDays.includes(dayValue)
      ? selectedDays.filter((d) => d !== dayValue)
      : [...selectedDays, dayValue]

    onDayChange?.(newSelectedDays)
  }

  return (
    <div className={clsx('flex gap-8', className)} role="group">
      {DAYS.map((day) => {
        const isSelected = selectedDays.includes(day.value)

        return (
          <button
            key={day.value}
            type="button"
            onClick={() => handleDayClick(day.value)}
            className={clsx(
              'flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full p-6',
              'typo-title-16-m transition-colors',
              isSelected
                ? 'bg-primary-50 text-primary-500'
                : 'bg-white text-gray-800 hover:bg-gray-50',
            )}
            aria-pressed={isSelected}
          >
            {day.label}
          </button>
        )
      })}
    </div>
  )
}

/**
 * @deprecated `widgets` 폴더로 이동되었습니다.
 * 리팩토링 기간 이후 이 컴포넌트는 삭제될 예정입니다.
 * 새로운 코드에서는 `@/widgets` 폴더에 구현된 컴포넌트를 사용해주세요.
 */
export default DaySelector
