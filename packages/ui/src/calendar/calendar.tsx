import { useState } from 'react'

import { isBefore, isSameDay, isWithinInterval } from 'date-fns'
import { ko } from 'date-fns/locale'
import { DateRange, DayPicker } from 'react-day-picker'

import { CalendarCaption } from './calendar-caption'
import { CalendarDayButton } from './calendar-day-button'
import { Button } from '../button/button'
import { cn } from '../lib/utils'

interface CalendarProps {
  /** 선택 모드. 'single'은 단일 날짜, 'range'는 시작/종료 범위. 기본 'range'. single 모드에선 항상 from===to. */
  mode?: 'range' | 'single'
  /** 현재 선택된 날짜 범위 (부모가 관리) */
  selected?: DateRange
  /** 날짜 선택 시 호출 */
  onSelect: (range: DateRange | undefined) => void
  /** 초기화 버튼 클릭 시 호출 */
  onReset?: () => void
  /** 확인 버튼 클릭 시 호출 */
  onConfirm?: () => void
  className?: string
}

export function Calendar({
  mode = 'range',
  selected,
  onSelect,
  onReset,
  onConfirm,
  className,
}: CalendarProps) {
  const [hoverRange, setHoverRange] = useState<DateRange | undefined>()

  const handleSelect = (range: DateRange | undefined, selectedDay: Date) => {
    // single 모드: 클릭한 날짜를 from/to 둘 다로 설정해 1일짜리 range로 표현.
    if (mode === 'single') {
      onSelect({ from: selectedDay, to: selectedDay })
      setHoverRange(undefined)
      return
    }

    // 1. 현재 아무것도 선택 안 된 경우 -> 그냥 선택
    if (!selected) {
      onSelect({ from: selectedDay, to: undefined })
      setHoverRange(undefined)
      return
    }

    // 2. 이미 Start와 End가 모두 선택된 상태에서 또 클릭한 경우 -> 리셋하고 클릭한 날짜를 Start로
    if (selected.from && selected.to) {
      onSelect({ from: selectedDay, to: undefined })
      setHoverRange(undefined)
      return
    }

    // 3. 그 외 -> 라이브러리 기본 동작
    onSelect(range)
    setHoverRange(undefined)
  }

  const handleDayMouseEnter = (date: Date) => {
    if (selected?.from && !selected.to) {
      if (isBefore(selected.from, date)) {
        setHoverRange({ from: selected.from, to: date })
      }
    }
  }

  const handleDayMouseLeave = () => {
    setHoverRange(undefined)
  }

  // 커스텀 Modifiers: 호버링 중인 구간 스타일링을 위해
  const modifiers = {
    range_preview: (date: Date) => {
      if (!hoverRange || !hoverRange.from || !hoverRange.to) {
        return false
      }

      const isRange = isWithinInterval(date, {
        start: hoverRange.from,
        end: hoverRange.to,
      })

      if (isRange) {
        if (
          isSameDay(date, hoverRange.to) ||
          isSameDay(date, hoverRange.from)
        ) {
          return false
        }

        return true
      }

      return false
    },

    // 2. Hover End (오른쪽 둥글게)
    range_hover_end: (date: Date) => {
      if (!hoverRange?.to) {
        return false
      }

      return isSameDay(date, hoverRange.to)
    },

    // 3. react-day-picker에서 제공하는 기본 range_start는 range_end가 선택되기 전까지 false로 동작하는 문제로 수동으로 설정
    range_manual_start: (date: Date) => {
      if (!selected?.from) {
        return false
      }

      return isSameDay(date, selected.from)
    },

    // 4. Start와 End가 같은 날짜인지 (하루짜리 범위 또는 Start만 있을 때)
    range_single_day: (date: Date) => {
      if (!selected?.from) {
        return false
      }

      // 검사하는 날짜가 Start가 아니면 false
      if (!isSameDay(date, selected.from)) {
        return false
      }

      // End가 없으면 -> Single Day (True)
      if (!selected.to) {
        return true
      }

      // 호버링 중일 때는 Single Day 아님 (연결된 것으로 간주)
      if (hoverRange?.to && !isSameDay(hoverRange.to, selected.from)) {
        return false
      }

      // End가 있는데 Start랑 같으면 -> Single Day (True)
      return isSameDay(selected.from, selected.to)
    },
  }

  return (
    <div
      className={cn(
        `min-w-57 rounded-10 border bg-white px-16 py-20 shadow-toast`,
        className,
      )}
    >
      <DayPicker
        mode="range"
        selected={selected} // 내부 상태 전달
        onSelect={handleSelect}
        // 마우스 이벤트 연결
        onDayMouseEnter={handleDayMouseEnter}
        onDayMouseLeave={handleDayMouseLeave}
        // 커스텀 Modifier 연결
        modifiers={modifiers}
        locale={ko}
        fixedWeeks
        hideNavigation
        classNames={{
          months: cn(
            'relative flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4',
          ),
          month: cn(`space-y-4`),
          month_caption: 'hidden',
          month_grid: cn(`w-full border-separate border-spacing-y-4`),
          weekdays: cn(`text-gray-500`),
          weekday: cn(`size-7 text-center align-middle typo-body-12-r`),
          hidden: cn(`invisible`),
        }}
        components={{
          MonthCaption: CalendarCaption,
          DayButton: CalendarDayButton,
        }}
        footer={
          <div className="flex items-center justify-between pt-3.75">
            <Button
              className="cursor-pointer"
              size="sm"
              variant="secondary-outlined"
              title="초기화"
              onClick={onReset}
            />
            <Button
              className="cursor-pointer"
              size="sm"
              variant="primary-filled"
              title="확인"
              onClick={onConfirm}
            />
          </div>
        }
      />
    </div>
  )
}
