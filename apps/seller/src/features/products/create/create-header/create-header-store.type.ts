import { CREATE_FORM_STEP_IDS } from './create-header.constant'

export type ProductStageKey = (typeof CREATE_FORM_STEP_IDS)[number]

export type ProductStageCompletion = Record<ProductStageKey, boolean>

/** @deprecated ProductStageCompletion 사용을 권장합니다. */
export type ProductFileType = ProductStageCompletion

export interface NutritionData {
  sugar: number | null
  protein: number | null
  fat: number | null
  ingredientCategories: string[]
}

export interface ActiveTags {
  [key: string]: boolean
}
