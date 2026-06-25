import { format, parseISO } from 'date-fns'
import { useSearchParams } from 'react-router-dom'

import type { DateRange } from 'react-day-picker'

// URL search param 키. API의 `date` 파라미터(yyyy-MM-dd, 종료일)와 1:1 매핑.
const DATE_PARAM = 'date'

interface UseStatsFilterResult {
  /** DatePicker UI 바인딩용. URL에는 종료일만 있으므로 from/to 모두 같은 날짜로 복원. */
  dateRange: DateRange | undefined
  setDateRange: (range: DateRange | undefined) => void
  /** 4개 통계 API 호출용 (yyyy-MM-dd). 미설정 시 undefined → BE가 오늘로 fallback. */
  apiDate: string | undefined
}

/**
 * @description 판매분석 페이지의 조회 기간 필터를 URL search param(`?date=YYYY-MM-DD`)에 보존하는 hook.
 */
export function useStatsFilter(): UseStatsFilterResult {
  const [params, setParams] = useSearchParams()
  const apiDate = params.get(DATE_PARAM) ?? undefined

  // Calendar single 모드의 invariant(from === to)에 맞춰 두 필드 모두 같은 날짜로 채움.
  const parsed = apiDate ? parseISO(apiDate) : undefined
  const dateRange: DateRange | undefined =
    parsed && !Number.isNaN(parsed.getTime())
      ? { from: parsed, to: parsed }
      : undefined

  const setDateRange = (range: DateRange | undefined) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        // 사용자가 단일 날짜만 클릭(range.to 미선택)했을 때는 from을 종료일로 사용.
        // 범위로 선택했을 땐 to(종료일)를 사용.
        const endDate = range?.to ?? range?.from
        if (endDate) {
          next.set(DATE_PARAM, format(endDate, 'yyyy-MM-dd'))
        } else {
          next.delete(DATE_PARAM)
        }
        return next
      },
      // 필터 변경마다 히스토리 push되면 뒤로가기가 직관적이지 않으므로 replace
      { replace: true },
    )
  }

  return { dateRange, setDateRange, apiDate }
}
