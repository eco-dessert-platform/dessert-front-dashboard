import React, { createContext } from 'react'

export type FormStepStatus = Record<string, boolean>

export interface NutritionData {
  sugar: number | null
  protein: number | null
  fat: number | null
  ingredientCategories: string[]
}

export interface ActiveTags {
  [key: string]: boolean
}

export interface FormStepsContextType {
  productFields: FormStepStatus
  currentStep: number
  headerHeight: number

  setProductFields: React.Dispatch<React.SetStateAction<FormStepStatus>>
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>
  scrollToStep: (index: number) => void

  isScrollingToStep: React.MutableRefObject<boolean>

  nutritionDataList: NutritionData[]
  setNutritionData: (index: number, data: NutritionData) => void
  activeTags: ActiveTags

  productPrice: number | null
  setProductPrice: React.Dispatch<React.SetStateAction<number | null>>
}

export const FormStepsContext = createContext<FormStepsContextType | null>(null)
