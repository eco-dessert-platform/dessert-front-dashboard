export interface IChargeFilter {
  startDate?: string
  endDate?: string
  page?: number
  size?: number
  sort?: string
}

export type ChargeCategory = 'ACCUMULATE' | 'DEDUCT'
export type ChargeStatus = 'PENDING' | 'COMPLETED'

export interface ChargeRow {
  baseDate: string
  settlementId: string
  category: ChargeCategory
  amount: number
  status: ChargeStatus
}

export interface ChargePageResponse {
  content: ChargeRow[]
  page: number
  size: number
  totalPages: number
  totalElements: number
}
