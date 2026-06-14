import type { IPaymentHoldFilter, IPaymentHoldRequest } from '../entities'
import { DEFAULT_PAYMENT_HOLD_PAGE_SIZE } from '../constants'

export const buildPaymentHoldRequest = (
  filters: IPaymentHoldFilter,
): IPaymentHoldRequest => ({
  dateType: filters.dateType,
  startDate: filters.startDate,
  endDate: filters.endDate,
  status: filters.status,
  paymentHoldId:
    filters.searchType === 'PAYMENT_HOLD_ID' && filters.keyword
      ? Number(filters.keyword)
      : 0,
  settlementId:
    filters.searchType === 'SETTLEMENT_ID' ? filters.keyword : '',
  page: filters.page ?? 0,
  size: filters.size ?? DEFAULT_PAYMENT_HOLD_PAGE_SIZE,
})
