// FormStepsProvider.tsx
import React, { useState } from 'react'
import { FormStepsContext } from './create-form-steps.context'

export const FormStepsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [productInfo, setProductInfo] = useState(false)
  const [productDelivery, setProductDelivery] = useState(false)

  return (
    <FormStepsContext.Provider
      value={{
        productInfo,
        setProductInfo,
        productDelivery,
        setProductDelivery,
      }}
    >
      {children}
    </FormStepsContext.Provider>
  )
}
