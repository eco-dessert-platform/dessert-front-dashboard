import type { IPaymentHoldFilter, IPaymentHoldRequest } from '../entities'
import { DEFAULT_PAYMENT_HOLD_PAGE_SIZE } from '../constants'

export const buildPaymentHoldRequest = (
  filters: IPaymentHoldFilter,
): IPaymentHoldRequest => {
  const keyword = filters.keyword?.trim()

  return {
    dateType: filters.dateType,
    startDate: filters.startDate,
    endDate: filters.endDate,
    status: filters.status,
    paymentHoldId:
      filters.searchType === 'PAYMENT_HOLD_ID' && keyword
        ? Number(keyword)
        : 0,
    settlementId: filters.searchType === 'SETTLEMENT_ID' ? (keyword ?? '') : '',
    page: filters.page ?? 0,
    size: filters.size ?? DEFAULT_PAYMENT_HOLD_PAGE_SIZE,
  }
}
