import { DayButtonProps, Modifiers } from 'react-day-picker'

import { cn } from '@/shared/libs/utils'

interface CustomModifiers extends Modifiers {
  selected: boolean
  range_start: boolean
  range_end: boolean
  range_middle: boolean
  today: boolean
  outside: boolean
  disabled: boolean
  range_preview: boolean // 커스텀
  range_hover_end: boolean // 커스텀
  range_manual_start: boolean // 커스텀
  range_single_day: boolean // 커스텀
}

export function CalendarDayButton(props: DayButtonProps) {
  const { modifiers: _modifiers, ...btnProps } = props
  const modifiers = _modifiers as CustomModifiers
  const {
    selected: isSelected,
    range_start: isRangeStart,
    range_end: isRangeEnd,
    range_middle: isRangeMiddle,
    today: isToday,
    outside: isOutside,
    disabled: isDisabled,

    // 추가한 커스텀 modifiers
    range_preview: isRangePreview,
    range_hover_end: isHoverEnd,
    range_manual_start: isManualStart,
    range_single_day: isRangeSingleDay,
  } = modifiers

  return (
    <button
      type="button"
      {...btnProps}
      className={cn(
        `flex size-7 cursor-pointer items-center justify-center rounded-6 typo-title-14-m text-gray-800 transition-colors`,

        !isSelected && !isRangeMiddle && !isRangePreview && `hover:bg-gray-100`,

        // 포커스 상태
        !isDisabled &&
          !isSelected &&
          !isRangeMiddle &&
          `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`,

        // disabled (외부 날짜 제외)
        isDisabled &&
          !isOutside &&
          `cursor-not-allowed text-gray-300 opacity-50 hover:bg-transparent`,

        // today
        isToday && `text-primary-500`,

        // 중간 구간 (미리보기 포함)
        (isRangeMiddle || isRangePreview) &&
          `rounded-none bg-gray-100 hover:bg-gray-100`,

        // Start (연결됨) -> 왼쪽 둥글
        (isRangeStart || isManualStart) &&
          !isRangeSingleDay &&
          `rounded-l-6 rounded-r-none bg-primary-500 text-white`,

        // End (연결됨) -> 오른쪽 둥글
        isRangeEnd &&
          !isRangeSingleDay &&
          `rounded-l-none rounded-r-6 bg-primary-500 text-white`,

        // Hover End (End 후보) -> 오른쪽 둥글
        isHoverEnd &&
          `rounded-l-none rounded-r-6 bg-primary-500 text-white hover:bg-primary-500`,

        isRangeSingleDay && `rounded-6 bg-primary-500 text-white`,
      )}
    />
  )
}
