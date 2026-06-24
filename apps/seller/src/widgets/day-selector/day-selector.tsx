import { cn } from '@/shared/libs/utils'

export interface DaySelectorProps {
  selectedDays?: string[]
  onDayChange?: (days: string[]) => void
  className?: string
  size?: 'default' | 'small'
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

export function DaySelector({
  selectedDays = [],
  onDayChange,
  className = '',
  size = 'default',
}: DaySelectorProps) {
  const handleDayClick = (dayValue: string) => {
    const newSelectedDays = selectedDays.includes(dayValue)
      ? selectedDays.filter((d) => d !== dayValue)
      : [...selectedDays, dayValue]

    onDayChange?.(newSelectedDays)
  }

  return (
    <div className={cn('flex gap-8', className)} role="group">
      {DAYS.map((day) => {
        const isSelected = selectedDays.includes(day.value)

        return (
          <button
            key={day.value}
            type="button"
            onClick={() => handleDayClick(day.value)}
            className={cn(
              'flex cursor-pointer items-center justify-center rounded-full p-6',
              'transition-colors',
              isSelected
                ? 'bg-primary-50 text-primary-500'
                : 'bg-white text-gray-800 hover:bg-gray-50',
              size === 'default'
                ? 'h-[42px] w-[42px] typo-title-16-m'
                : 'size-24 typo-body-12-r',
            )}
            aria-pressed={isSelected}
          >
            {day.label} {}
          </button>
        )
      })}
    </div>
  )
}
