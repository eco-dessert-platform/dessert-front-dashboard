import { useState } from 'react'

import { cn } from '@dessert/core'
import { Calendar } from '@dessert/ui'
import * as Popover from '@radix-ui/react-popover'
import { format } from 'date-fns'

import DateIcon from '@/assets/icons/date.svg?react'

import { useStatsFilter } from '../stats-filter.hook'

import type { DateRange } from 'react-day-picker'

/** 트리거 버튼에 표시할 텍스트. Calendar single 모드라 항상 from === to → 단일 날짜만 표시. */
function formatTrigger(range: DateRange | undefined): string {
  if (!range?.from) return '날짜 선택'
  return format(range.from, 'yyyy.MM.dd')
}

/**
 * @description 판매분석 페이지 헤더의 조회 기간 필터. 컴팩트 트리거 + Calendar popover.
 */
export function DateRangeFilter() {
  const { dateRange, setDateRange } = useStatsFilter()
  const [isOpen, setIsOpen] = useState(false)
  // popover 안에서 임시 편집 중인 값. "확인" 누르기 전까진 URL에 반영하지 않음.
  const [draft, setDraft] = useState<DateRange | undefined>(dateRange)

  const handleOpenChange = (open: boolean) => {
    if (open) setDraft(dateRange)
    setIsOpen(open)
  }

  const handleConfirm = () => {
    setDateRange(draft)
    setIsOpen(false)
  }

  return (
    <Popover.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            'flex items-center justify-between gap-6',
            'h-input min-w-50 px-12 py-8',
            'typo-title-16-r',
            'rounded-10 border border-gray-300 bg-white',
            'cursor-pointer hover:border-gray-400',
            dateRange?.from ? 'text-gray-800' : 'text-gray-400',
          )}
        >
          <span>{formatTrigger(dateRange)}</span>
          <DateIcon />
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-dropdown pt-2" align="end">
        <Calendar
          mode="single"
          selected={draft}
          onSelect={setDraft}
          onConfirm={handleConfirm}
          onReset={() => setDraft(undefined)}
        />
      </Popover.Content>
    </Popover.Root>
  )
}
