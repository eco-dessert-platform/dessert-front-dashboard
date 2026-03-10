import { useState } from 'react'

type FormStepStatus = Record<string, boolean>

export const useCreateFormSteps = () => {
  const [productFields, setProductFields] = useState<FormStepStatus>({
    productInfo: false,
    productDelivery: false,
    productOptions: false,
  })

  return { productFields, setProductFields }
}
