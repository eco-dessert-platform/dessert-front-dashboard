import type { ApiResponse } from '@/entity/auth/types'
import { client } from '@/shared/utils/axios'

import { getMockDailySettlementPageResponse } from './mock'
import {
  DailySettlementFilters,
  DailySettlementPageResponse,
} from './settlement.type'

// VITE_USE_MOCK=true 일 때 mock 응답 사용
// 미설정(false) 기타 값이면 실서버호출
const useMock = import.meta.env.VITE_USE_MOCK === 'true'

function unwrap<T>(data: ApiResponse<T>, fallback: string): T {
  if (!data.success || data.result == null) {
    throw new Error(data.message ?? fallback)
  }
  return data.result
}

export async function getDailySettlements(
  filters: DailySettlementFilters,
): Promise<DailySettlementPageResponse> {
  if (useMock) {
    return getMockDailySettlementPageResponse(filters)
  }

  const { page, size, startDate, endDate } = filters

  const { data } = await client.get<ApiResponse<DailySettlementPageResponse>>(
    '/api/v1/seller/settlements/daily',
    {
      params: { page, size, startDate, endDate },
    },
  )

  return unwrap(data, '일별 정산내역 조회에 실패했습니다.')
}
