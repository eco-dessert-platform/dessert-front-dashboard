export type TPaymentHoldDateType = 'BASE_DATE' | 'COMPLETED_DATE'
export type TPaymentHoldStatus = 'ALL' | 'HOLD' | 'RELEASED'
export type TPaymentHoldSearchType = 'PAYMENT_HOLD_ID' | 'SETTLEMENT_ID'

export interface IPaymentHoldFilter {
  dateType: TPaymentHoldDateType
  startDate?: string
  endDate?: string
  status: TPaymentHoldStatus
  searchType?: TPaymentHoldSearchType
  keyword: string
  page?: number
  size?: number
}

export type IPaymentHoldSearchFilter = Pick<
  IPaymentHoldFilter,
  'dateType' | 'startDate' | 'endDate' | 'status' | 'searchType' | 'keyword'
>

export interface IPaymentHoldRequest {
  dateType: TPaymentHoldDateType
  startDate?: string
  endDate?: string
  status: TPaymentHoldStatus
  paymentHoldId: number
  settlementId: string
  page?: number
  size?: number
}

export interface IPaymentHoldRow {
  paymentHoldId: number
  settlementId: string
  status: Exclude<TPaymentHoldStatus, 'ALL'>
  baseDate: string
  completedDate: string
  amount: number
}

export interface IPaymentHoldPageResponse {
  content: IPaymentHoldRow[]
  page: number
  size: number
  totalPages: number
  totalElements: number
}
