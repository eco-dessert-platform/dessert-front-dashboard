import React, { createContext } from 'react'

interface FormStepsContextType {
  productInfo: boolean
  setProductInfo: React.Dispatch<React.SetStateAction<boolean>>
}

export const FormStepsContext = createContext<FormStepsContextType | null>(null)
