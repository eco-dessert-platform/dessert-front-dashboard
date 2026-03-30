export type ProductFormInput = {
  productName: string
  isFresh: boolean
  productionTime: string
  price: number | null
  discountAmount: number | null
  discountType: 'won' | 'percentage'
}

export type DeliveryFormInput = {
  deliveryTerms: string
  deliveryCompany: string
  deliveryFee: number | null
  deliveryMinFee: number | null
}

export type ProductOptionFormInput = {
  mainCategory: string
  subCategory: string
  optionName: string
  ingredientCategories: ('glutenFree' | 'vegan')[]
  additionalPrice: number | null
  stockQuantity: number | null
  shippingDays: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[]
  hasNutrition: boolean
  totalWeight: number | null
  calories: number | null
  carbohydrate: number | null
  sugar: number | null
  protein: number | null
  fat: number | null
  sodium: number | null
}

export type ProductDisclosureFormInput = {
  productInfoNotice: {
    productName: string // 제품명
    foodType: string // 식품의 유형
    manufacturer: string // 생산자
    originLocation: string // 소재지
    manufactureDate: string // 제조년월일
    expirationDate: string // 소비기한 또는 품질 유지기한
    storageGuide: string // 포장 단위 별 내용물 용량(중량) 수량
    packagingQuantityUnit: string // 포장 단위별 수량
    rawMaterialName: string // 원재료명 (농수산물의 원산지 표시 등에 관한 법률)
    nutritionInfo: string // 영양성분
    transgenic: string // 유전자 변형 식품에 해당하는 경우의 표시
    customerWarning: string // 소비자 안전을 위한 주의사항
    importFood: string // 수입 식품의 경우
  }
  // UI 전용 상태: 각 필드의 입력 모드 (기본값 / 직접 입력)
  productInfoNoticeMode: {
    productName: 'default' | 'manual'
    foodType: 'default' | 'manual'
    manufacturer: 'default' | 'manual'
    originLocation: 'default' | 'manual'
    manufactureDate: 'default' | 'manual'
    expirationDate: 'default' | 'manual'
    storageGuide: 'default' | 'manual'
    packagingQuantityUnit: 'default' | 'manual'
    rawMaterialName: 'default' | 'manual'
    nutritionInfo: 'default' | 'manual'
    transgenic: 'default' | 'manual'
    customerWarning: 'default' | 'manual'
    importFood: 'default' | 'manual'
  }
}
