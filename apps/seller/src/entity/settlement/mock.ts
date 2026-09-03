import {
  DailySettlementFilters,
  DailySettlementPageResponse,
  SettlementItemPageResponse,
  SettlementItemSummary,
} from './settlement.type'
import { Settlement, SettlementFilters } from './types'

export const getMockSettlementItemPageResponse = (
  filters: SettlementFilters,
): SettlementItemPageResponse => {
  const { page, size } = filters
  const totalElements = 50
  const safePage = Math.max(1, page)

  const content: SettlementItemSummary[] = Array.from(
    { length: size },
    (_, i) => {
      const n = (safePage - 1) * size + i + 1
      return {
        orderNumber: `ORD-${n}`,
        orderItemId: 1000 + n,
        sellerId: 9001,
        buyerName: `구매자${n}`,
        productTitle: `키토빵앗간 휘낭시에 ${n}`,
        scheduledAmount: 123456 + n * 100,
        quantity: (n % 3) + 1,
        settlementStartDate: '2025-09-01',
        settlementEndDate: '2025-09-01',
        scheduledDate: '2025-09-01',
        status: '정산완료',
      }
    },
  )

  return {
    settlements: {
      content,
      page: safePage - 1,
      size,
      totalPages: Math.ceil(totalElements / size),
      totalElements,
    },
    summary: {
      totalCount: totalElements,
      totalScheduledAmount: 6172800,
    },
  }
}

export const getDailySettlementMock = (
  page: number,
  size: number = 10,
): Settlement[] =>
  Array(size)
    .fill(null)
    .map((_, i) => ({
      id: `DAILY-${page}-${i + 1}`,
      expectedDate: '2025.09.01',
      completedDate: '2025.09.01',
      totalAmount: 1000000 + page * 10000 + i * 1000,
      paymentAmount: 1200000 + i * 1000,
      commission: 123456,
      deduction: 1234,
      deductionDetails: {
        shippingFeeChange: 1234,
        chargeOffset: 1234,
      },
      withheld: 123456,
      method: '계좌이체',
    }))

export const getMockDailySettlementPageResponse = (
  filters: DailySettlementFilters,
): DailySettlementPageResponse => {
  const { page, size } = filters
  const totalElements = 50

  const content = Array(size)
    .fill(null)
    .map((_, i) => ({
      settlementNumber: `DAILY-${page}-${i + 1}`,
      scheduledDate: '2025.09.01',
      completedDate: '2025.09.01',
      totalSettlementAmount: 1000000 + page * 10000 + i * 1000,
      amount: 1200000 + i * 1000,
      fee: 123456,
      deductibleRefund: 1234,
      deductibleRefundDetail: {
        deliveryFeeChange: 1234,
        balanceOffset: 1234,
      },
      withHoldingPayment: 123456,
      settlementMethod: '계좌이체',
    }))

  return {
    settlements: {
      content,
      page,
      size,
      totalPages: Math.ceil(totalElements / size),
      totalElements,
    },
    summary: {
      scheduledDateMin: filters.startDate ?? '2025.09.01',
      scheduledDateMax: filters.endDate ?? '2025.09.01',
      totalSettlementAmount: 2000000,
    },
  }
}
