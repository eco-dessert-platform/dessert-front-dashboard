import { createContext, useContext, useState } from 'react'

type FormStepsContextType = {
  productInfo: boolean
  setProductInfo: (value: boolean) => void
}

const FormStepsContext = createContext<FormStepsContextType | null>(null)

export const FormStepsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [productInfo, setProductInfo] = useState(false)

  return (
    <FormStepsContext.Provider value={{ productInfo, setProductInfo }}>
      {children}
    </FormStepsContext.Provider>
  )
}

export const useFormSteps = () => {
  const context = useContext(FormStepsContext)
  if (!context) throw new Error('FormStepsProvider 안에서 사용해주세요')
  return context
}
