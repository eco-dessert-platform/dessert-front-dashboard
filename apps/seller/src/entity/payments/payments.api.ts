import type { ApiResponse } from '@/entity/auth/types'
import { client } from '@/shared/utils/axios'

import type {
  DailyAmountStatsResult,
  DailyCountStatsResult,
  DailyRefundRateStatsResult,
  PaymentStatsRequest,
  WeekdayStatsResult,
} from './payments.type'

function unwrap<T>(data: ApiResponse<T>, fallback: string): T {
  if (!data.success || data.result == null) {
    throw new Error(data.message ?? fallback)
  }
  return data.result
}

export async function getDailyAmountStats(
  request: PaymentStatsRequest,
): Promise<DailyAmountStatsResult> {
  const { data } = await client.get<ApiResponse<DailyAmountStatsResult>>(
    '/api/v1/seller/payments/statistics/daily-amount',
    { params: request },
  )
  return unwrap(data, '일별 결제금액 통계 조회에 실패했습니다.')
}

export async function getDailyCountStats(
  request: PaymentStatsRequest,
): Promise<DailyCountStatsResult> {
  const { data } = await client.get<ApiResponse<DailyCountStatsResult>>(
    '/api/v1/seller/payments/statistics/daily-count',
    { params: request },
  )
  return unwrap(data, '일별 결제 건수 통계 조회에 실패했습니다.')
}

export async function getDailyRefundRateStats(
  request: PaymentStatsRequest,
): Promise<DailyRefundRateStatsResult> {
  const { data } = await client.get<ApiResponse<DailyRefundRateStatsResult>>(
    '/api/v1/seller/payments/statistics/daily-refund-rate',
    { params: request },
  )
  return unwrap(data, '환불율 통계 조회에 실패했습니다.')
}

export async function getWeekdayStats(
  request: PaymentStatsRequest,
): Promise<WeekdayStatsResult> {
  const { data } = await client.get<ApiResponse<WeekdayStatsResult>>(
    '/api/v1/seller/payments/statistics/weekday',
    { params: request },
  )
  return unwrap(data, '요일별 결제 통계 조회에 실패했습니다.')
}
