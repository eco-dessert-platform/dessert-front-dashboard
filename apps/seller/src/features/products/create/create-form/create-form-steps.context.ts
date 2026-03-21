import React, { createContext } from 'react'

type FormStepStatus = Record<string, boolean>

interface FormStepsContextType {
  productFields: FormStepStatus
  setProductFields: React.Dispatch<React.SetStateAction<FormStepStatus>>
}

export const FormStepsContext = createContext<FormStepsContextType | null>(null)
