import { DatePicker } from '@/widgets/date-picker'

import { useStatsFilter } from '../stats-filter.hook'

/**
 * @description 판매분석 페이지의 조회 기간 필터. DatePicker UI를 useStatsFilter hook과 바인딩.
 */
export function DateRangeFilter() {
  const { dateRange, setDateRange } = useStatsFilter()

  return (
    <DatePicker label="조회 기간" value={dateRange} onChange={setDateRange} />
  )
}
