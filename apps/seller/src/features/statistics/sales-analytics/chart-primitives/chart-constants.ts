import type { PaymentStatsPeriod } from '@/entity/payments'

// period(DAY/WEEK/MONTH) → 차트 타이틀/툴팁에 들어가는 한글 라벨.
export const PERIOD_LABEL: Record<PaymentStatsPeriod, string> = {
  DAY: '일별',
  WEEK: '주별',
  MONTH: '월별',
}

// "7일/7주/7개월 평균" 등 단위 라벨용 (PERIOD_LABEL은 '일별/주별/월별' 타이틀용).
export const PERIOD_UNIT_LABEL: Record<PaymentStatsPeriod, string> = {
  DAY: '일',
  WEEK: '주',
  MONTH: '개월',
}

// 디자인 토큰 alignment 필요 시 추후 @dessert/ui 색상 스케일로 교체.
export const CHART_COLORS = {
  primary: '#3B82F6',
  primaryMuted: '#93C5FD',
  secondary: '#94A3B8',
  accent: '#F59E0B',
  danger: '#EF4444',
  grid: '#E5E7EB',
  axis: '#9CA3AF',
} as const

export const CHART_HEIGHT = {
  full: 280,
  half: 220,
} as const

// 결제 금액 (원). 1,234,567 → "1,234,567원"
export const formatKRW = (value: number): string =>
  `${value.toLocaleString('ko-KR')}원`

// 차트 축/툴팁용 축약 표기. 12000 → "1.2만", 150000000 → "1.5억"
export const formatKRWShort = (value: number): string => {
  if (value === 0) return '0'
  const abs = Math.abs(value)
  if (abs >= 100_000_000) return `${(value / 100_000_000).toFixed(1)}억`
  if (abs >= 10_000) return `${(value / 10_000).toFixed(1)}만`
  return value.toLocaleString('ko-KR')
}

export const formatPercent = (value: number, fractionDigits = 1): string =>
  `${value.toFixed(fractionDigits)}%`

export const formatCount = (value: number): string =>
  `${value.toLocaleString('ko-KR')}건`

// "2026-04-10" → "04-10"
export const formatShortDate = (dateStr: string): string => {
  const parts = dateStr.split('-')
  if (parts.length !== 3) return dateStr
  return `${parts[1]}-${parts[2]}`
}

// API의 weekday(1=월 ~ 7=일, ISO 8601)를 한글 요일명으로 변환.
const WEEKDAY_LABELS = ['', '월', '화', '수', '목', '금', '토', '일']
export const formatWeekday = (weekday: number): string =>
  WEEKDAY_LABELS[weekday] ?? String(weekday)
