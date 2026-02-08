import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Calendar } from '../../ui/calendar/calendar'
import { DateRange } from 'react-day-picker'
import { cn } from '@/shared/lib/utils'
import { format } from 'date-fns'
import DateIcon from '@/assets/icons/date.svg?react'

function formatDateRange(range?: DateRange): string {
  if (!range?.from) {
    return ''
  }

  const fromDate = format(range.from, 'yyyy.MM.dd')

  if (!range?.to) {
    return fromDate
  }

  const toDate = format(range.to, 'yyyy.MM.dd')

  return `${fromDate} ~ ${toDate}`
}

interface DatePickerProps {
  label: string
  disabled?: boolean
  placeholder?: string
  /** 확인 버튼을 눌러 확정된 값 (외부에서 관리) */
  value?: DateRange
  /** 확인 버튼을 눌렀을 때만 호출 */
  onChange?: (range: DateRange | undefined) => void
}

export function DatePicker({
  label,
  disabled = false,
  placeholder = '날짜 선택',
  value,
  onChange,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(value)

  const handleOpenChange = (open: boolean) => {
    if (disabled) {
      return
    }
    if (open) {
      setDraftRange(value)
    }

    setIsOpen(open)
  }

  const handleConfirm = () => {
    onChange?.(draftRange)
    setIsOpen(false)
  }

  const handleReset = () => {
    setDraftRange(undefined)
  }

  return (
    <div className="flex w-full flex-col gap-6 bg-white">
      <label className="typo-title-14-m text-gray-700">{label}</label>

      <Popover.Root open={isOpen} onOpenChange={handleOpenChange}>
        <Popover.Trigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              'flex items-center justify-between gap-6',
              'h-input px-12 py-8',
              'typo-title-16-r text-gray-800',
              'rounded-10 border border-gray-300',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'cursor-pointer disabled:cursor-not-allowed',
              value ? 'text-gray-800' : 'text-gray-400',
            )}
          >
            <span>{formatDateRange(value) || placeholder}</span>
            <DateIcon />
          </button>
        </Popover.Trigger>

        <Popover.Content className="z-50 pt-4">
          <Calendar
            selected={draftRange}
            onSelect={setDraftRange}
            onConfirm={handleConfirm}
            onReset={handleReset}
          />
        </Popover.Content>
      </Popover.Root>
    </div>
  )
}
