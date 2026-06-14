export interface IVatReportFilter {
  startDate?: string
  endDate?: string
  page?: number
  size?: number
}

export type TVatReportDateType = 'BASE_DATE'
export type TVatReportExcelStatus = 'ALL'

export interface IVatReportExcelRequest {
  dateType: TVatReportDateType
  startDate?: string
  endDate?: string
  status: TVatReportExcelStatus
  paymentHoldId: number
  settlementId: string
}

export interface IVatReportRow {
  month: string
  taxableSalesAmount: number
  taxFreeSalesAmount: number
  creditCardAmount: number
  cashReceiptIncomeDeductionAmount: number
  cashReceiptExpenseProofAmount: number
  etcAmount: number
}

export interface IVatReportResponse {
  startMonth: string
  endMonth: string
  items: IVatReportRow[]
}
