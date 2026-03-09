// FormStepsProvider.tsx
import React, { useState } from 'react'
import { FormStepsContext } from './create-form-steps.context'

type FormStepStatus = Record<string, boolean>

export const FormStepsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [productFields, setProductFields] = useState<FormStepStatus>({
    productInfo: false,
    productDelivery: false,
    productOptions: false,
  })

  return (
    <FormStepsContext.Provider
      value={{
        productFields,
        setProductFields,
      }}
    >
      {children}
    </FormStepsContext.Provider>
  )
}
