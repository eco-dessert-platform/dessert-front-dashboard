import { Settlement, TransactionSettlement } from './types'

export const TRANSACTION_SETTLEMENT_MOCK: TransactionSettlement[] = Array(
  10,
).fill({
  orderNumber: '250401A1F7',
  productOrderNumber: '250401A1F7',
  settlementId: '250401A1F7',
  category: '배송비',
  productName: '키토빵앗간 휘낭시에 (저단백 다이어트 빵)',
  expectedSettlementAmount: 123456,
  settlementBaseDate: '2025.09.01',
  expectedDate: '2025.09.01',
  completedDate: '2025.09.01',
  status: '정산 후 취소',
  paymentMethod: '카카오페이 카드',
  commissionRate: '1.23%',
  paymentAmount: 123456,
})

export const DAILY_SETTLEMENT_MOCK: Settlement[] = Array(10).fill({
  id: '250401A1F7',
  expectedDate: '2025.09.01',
  completedDate: '2025.09.01',
  totalAmount: 123456,
  paymentAmount: 123456,
  commission: 123456,
  deduction: 1234,
  deductionDetails: {
    shippingFeeChange: 1234,
    chargeOffset: 1234,
  },
  withheld: 123456,
  method: '계좌이체',
})
