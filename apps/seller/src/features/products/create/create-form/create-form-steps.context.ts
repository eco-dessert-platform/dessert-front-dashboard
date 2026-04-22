import React, { createContext } from 'react'

export type FormStepStatus = Record<string, boolean>

export interface NutritionData {
  sugar: number
  protein: number
  fat: number
  ingredientCategories: string[]
}

export interface ActiveTags {
  [key: string]: boolean
}

interface FormStepsContextType {
  productFields: FormStepStatus
  currentStep: number
  headerHeight: number

  setProductFields: React.Dispatch<React.SetStateAction<FormStepStatus>>
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>
  scrollToStep: (index: number) => void

  isScrollingToStep: React.MutableRefObject<boolean>

  nutritionData: NutritionData
  setNutritionData: React.Dispatch<React.SetStateAction<NutritionData>>
  activeTags: ActiveTags

  productPrice: number | null
  setProductPrice: React.Dispatch<React.SetStateAction<number | null>>
}

export const FormStepsContext = createContext<FormStepsContextType | null>(null)
