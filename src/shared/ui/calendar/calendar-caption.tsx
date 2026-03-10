import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MonthCaptionProps, useDayPicker } from 'react-day-picker'

import { cn } from '@/shared/libs/utils'

export function CalendarCaption({ calendarMonth }: MonthCaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker()
  const { date } = calendarMonth
  const month = date.getMonth() + 1

  const commonBtnClass = cn(
    `flex size-30 cursor-pointer items-center justify-center rounded-8 border border-gray-200 disabled:cursor-not-allowed`,
  )

  return (
    <nav
      className={cn(`mb-3.75 flex h-30 w-full items-center justify-between`)}
    >
      <button
        type="button"
        disabled={!previousMonth}
        className={commonBtnClass}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <ChevronLeft size={20} />
      </button>
      <span
        className={cn(`typo-heading-18-b text-gray-800 select-none`)}
      >{`${month}월`}</span>
      <button
        type="button"
        disabled={!nextMonth}
        className={commonBtnClass}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  )
}
