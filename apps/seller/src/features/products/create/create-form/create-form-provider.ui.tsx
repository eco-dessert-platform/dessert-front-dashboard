import { useState } from 'react'

import { FormStepStatus, FormStepsContext } from './create-form-steps.context'

export const FormStepsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [productFields, setProductFields] = useState<FormStepStatus>({
    productInfo: false,
    productDelivery: false,
    productThumbnail: false,
    productOptions: false,
    productDetail: false,
    productDisClosure: false,
  })

  const [currentStep, setCurrentStep] = useState(1)

  // 특정 영역으로 스크롤 이동하는 함수
  const scrollToStep = (index: number) => {
    const stepIds = [
      'productInfo',
      'productDelivery',
      'productThumbnail',
      'productOptions',
      'productDetail',
      'productDisclosure',
    ]
    const targetId = stepIds[index]
    const element = document.getElementById(targetId)

    console.log(element)

    const container = document.querySelector('main')

    if (element && container) {
      const headerOffset = 250
      const elementPosition = element.offsetTop // 부모 컨테이너 기준 위치

      container.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      })
    }
  }

  return (
    <FormStepsContext.Provider
      value={{
        productFields,
        setProductFields,
        currentStep,
        setCurrentStep,
        scrollToStep,
      }}
    >
      {children}
    </FormStepsContext.Provider>
  )
}
