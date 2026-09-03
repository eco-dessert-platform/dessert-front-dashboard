export interface DeductibleRefundDetail {
  deliveryFeeChange: number // 배송비 금액 변동
  balanceOffset: number // 충전금 상계
}

export interface DailySettlementSummary {
  settlementNumber: string // 정산ID
  scheduledDate: string // 정산예정일
  completedDate: string // 정산완료일
  totalSettlementAmount: number // 정산금액 (a+b+c+d)
  amount: number // 결제금액(a)
  fee: number // 수수료(b)
  deductibleRefund: number // 공제/환급(c)
  deductibleRefundDetail?: DeductibleRefundDetail | null
  withHoldingPayment: number // 지급보류(d)
  settlementMethod: string // 정산방식
}

export interface SettlementSummaryInfo {
  scheduledDateMin: string
  scheduledDateMax: string
  totalSettlementAmount: number
}

export interface DailySettlementPageResponse {
  settlements: {
    content: DailySettlementSummary[]
    page: number
    size: number
    totalPages: number
    totalElements: number
  }
  summary: SettlementSummaryInfo
}

export interface DailySettlementFilters {
  page: number
  size: number
  startDate: string | null
  endDate: string | null
}
