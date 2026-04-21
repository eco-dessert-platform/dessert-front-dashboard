import React, { createContext } from 'react'

export type FormStepStatus = Record<string, boolean>

interface FormStepsContextType {
  productFields: FormStepStatus
  currentStep: number
  headerHeight: number

  setProductFields: React.Dispatch<React.SetStateAction<FormStepStatus>>
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>
  scrollToStep: (index: number) => void

  isScrollingToStep: React.MutableRefObject<boolean>
}

export const FormStepsContext = createContext<FormStepsContextType | null>(null)
