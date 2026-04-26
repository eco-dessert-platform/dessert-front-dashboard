// API 요청 타입
export interface CreateProductRequest {
  storeId: number
  title: string
  isFresh: boolean
  productionStartAt: string
  price: number
  discountType: 'AMOUNT' | 'PERCENT'
  discountValue: number
  deliveryCondition: string
  deliveryCompany: string
  deliveryFee: number
  freeShippingConditions: number
  content: string
  products: ProductOptionRequest[]
  productInfoNoticeRequest: Record<string, string>
}

export interface ProductOptionRequest {
  title: string
  category: string
  plusPriceWithBoardPrice: number
  stock: number
  dietaryTags: {
    glutenFreeTag: boolean
    highProteinTag: boolean
    sugarFreeTag: boolean
    veganTag: boolean
    ketogenicTag: boolean
  }
  availability: {
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
  }
  nutritionInfo: {
    totalWeight: number
    servingSize: number
    carbohydrates: number
    sugars: number
    protein: number
    fat: number
    calories: number
  } | null
}

// API 응답 타입
export interface StoreInfo {
  storeId: number
  name: string
  introduce: string
  profile: string
  phoneNumber: string
  email: string
}

export interface ApiResponse<T> {
  success: boolean
  code: number
  message: string
  result: T
}
