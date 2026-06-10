export type PaymentStatsPeriod = 'DAY' | 'WEEK' | 'MONTH'

// 4개 통계 API 공통 query parameter
// date: 기준 날짜 (yyyy-MM-dd, 미입력 시 오늘)
// period: 조회 단위 (미입력 시 DAY)
export interface PaymentStatsRequest {
  date?: string
  period?: PaymentStatsPeriod
}

interface PaymentStatsResultBase {
  startDate: string
  endDate: string
  period: PaymentStatsPeriod
}

// GET /api/v1/seller/payments/statistics/daily-amount
export interface DailyAmount {
  date: string
  amount: number
}

export interface DailyAmountStatsResult extends PaymentStatsResultBase {
  averageAmount: number
  dailyAmounts: DailyAmount[]
}

// GET /api/v1/seller/payments/statistics/daily-count
export interface DailyCount {
  date: string
  buyerCount: number
  paymentCount: number
}

export interface DailyCountStatsResult extends PaymentStatsResultBase {
  averageBuyerCount: number
  averagePaymentCount: number
  dailyCounts: DailyCount[]
}

// GET /api/v1/seller/payments/statistics/daily-refund-rate
export interface DailyRefundRate {
  date: string
  paymentAmount: number
  refundAmount: number
  refundRate: number
}

export interface DailyRefundRateStatsResult extends PaymentStatsResultBase {
  dailyRefundRates: DailyRefundRate[]
}

// GET /api/v1/seller/payments/statistics/weekday
// weekday: 1=월 ~ 7=일 (ISO 8601, 실응답의 주말 매출 급증으로 확인)
export interface WeekdayAmount {
  weekday: number
  amount: number
  averageAmount: number
}

export interface WeekdayStatsResult extends PaymentStatsResultBase {
  weekdayAmounts: WeekdayAmount[]
}
