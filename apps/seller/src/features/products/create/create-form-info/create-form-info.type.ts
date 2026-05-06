export type ProductInfoType = {
  productName: string
  isFresh: boolean
  productionTime: string
  price: number | null
  discountAmount: number | null
  discountType: 'won' | 'percentage'
}
