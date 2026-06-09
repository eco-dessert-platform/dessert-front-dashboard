import {
  IChargePageResponse,
  IChargeRow,
} from '@/entity/settlement/charge/entities'

export type ChargeCategory = 'ACCUMULATE' | 'DEDUCT'
export type ChargeStatus = 'PENDING' | 'COMPLETED' | 'FAILED'

const MOCK_TOTAL_ELEMENTS = 47

export const chargePageResponseMock: IChargePageResponse = {
  content: [
    {
      baseDate: '2025-09-01',
      settlementId: '250401A1F7',
      category: 'ACCUMULATE',
      amount: 123456,
      status: 'PENDING',
    },
  ],
  page: 0,
  size: 10,
  totalPages: 5,
  totalElements: 47,
}

export const getChargePageResponseMock = (
  page: number,
  size: number = chargePageResponseMock.size,
): IChargePageResponse => {
  const safePage = Math.max(0, page)
  const totalPages = Math.max(1, Math.ceil(MOCK_TOTAL_ELEMENTS / size))
  const start = safePage * size
  const end = Math.min(start + size, MOCK_TOTAL_ELEMENTS)

  const content = Array.from(
    { length: Math.max(0, end - start) },
    (_, index) => {
      const idNum = start + index + 1
      const month = String((idNum % 12) + 1).padStart(2, '0')
      const day = String((idNum % 28) + 1).padStart(2, '0')

      return {
        baseDate: `2025-${month}-${day}`,
        settlementId: `2504${String(idNum).padStart(2, '0')}A1F7`,
        category: idNum % 3 === 0 ? 'DEDUCT' : 'ACCUMULATE',
        amount: 123456 + idNum * 1000,
        status: idNum % 4 === 0 ? 'COMPLETED' : 'PENDING',
      } satisfies IChargeRow
    },
  )

  return {
    content,
    page: safePage,
    size,
    totalPages,
    totalElements: MOCK_TOTAL_ELEMENTS,
  }
}
