export type ProductOptionsType = {
  mainCategory: 'bread' | 'snack' | ''
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
