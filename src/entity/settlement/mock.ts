import { Settlement, TransactionSettlement } from './types'

export const getTransactionSettlementMock = (
  page: number,
  size: number = 10,
  keyword: string = '',
): TransactionSettlement[] => {
  const allData = Array(50)
    .fill(null)
    .map((_, i) => ({
      orderNumber: `ORD-${page}-${i + 1}`,
      productOrderNumber: `PORD-${page}-${i + 1}`,
      settlementId: `ST-${page}-${i + 1}`,
      category: i % 2 === 0 ? '판매금액' : '배송비',
      productName: `[Page ${page}] 키토빵앗간 휘낭시에 ${i + 1}`,
      expectedSettlementAmount: 123456 + i * 100,
      settlementBaseDate: '2025.09.01',
      expectedDate: '2025.09.01',
      completedDate: '2025.09.01',
      status: '정산완료',
      paymentMethod: '카카오페이 카드',
      commissionRate: '1.23%',
      paymentAmount: 123456 + i * 100,
    }))

  const filtered = keyword
    ? allData.filter(
        (item) =>
          item.orderNumber.includes(keyword) ||
          item.productName.includes(keyword),
      )
    : allData

  return filtered.slice((page - 1) * size, page * size)
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
