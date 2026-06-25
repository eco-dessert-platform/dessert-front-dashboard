export type ProductFileType = Record<string, boolean>

export interface NutritionData {
  sugar: number | null
  protein: number | null
  fat: number | null
  ingredientCategories: string[]
}

export interface ActiveTags {
  [key: string]: boolean
}
