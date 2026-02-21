export interface TransactionSettlement {
  orderNumber: string // 주문번호
  productOrderNumber: string // 상품주문번호
  settlementId: string // 정산ID
  category: string // 구분
  productName: string // 상품명
  expectedSettlementAmount: number // 정산예정금액
  settlementBaseDate: string // 정산기준일
  expectedDate: string // 정산예정일
  completedDate: string // 정산완료일
  status: string // 정산상태
}

export interface Settlement {
  id: string // 정산ID
  expectedDate: string // 정산예정일
  completedDate: string // 정산완료일
  totalAmount: number // 정산금액
  paymentAmount: number // 결제금액(a)
  commission: number // 수수료(b)
  deduction: number // 공제/환급(c)
  withheld: number // 지급보류(d)
  method: string // 정산방식
}
