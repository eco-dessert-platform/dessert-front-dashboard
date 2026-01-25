import clsx from 'clsx'

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
    <div className={clsx('flex gap-2', className)} role="group">
      {DAYS.map((day) => {
        const isSelected = selectedDays.includes(day.value)

        return (
          <button
            key={day.value}
            type="button"
            onClick={() => handleDayClick(day.value)}
            className={clsx(
              'flex h-[42px] w-[42px] items-center justify-center rounded-full p-1.5',
              'text-title-16-m transition-colors',
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

export default DaySelector
