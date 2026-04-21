import React, { createContext } from 'react'

export type FormStepStatus = Record<string, boolean>

interface FormStepsContextType {
  productFields: FormStepStatus
  setProductFields: React.Dispatch<React.SetStateAction<FormStepStatus>>
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  scrollToStep: (index: number) => void
}

export const FormStepsContext = createContext<FormStepsContextType | null>(null)
