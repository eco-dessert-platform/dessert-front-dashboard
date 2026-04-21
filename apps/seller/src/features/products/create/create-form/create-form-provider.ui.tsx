import { useCallback, useRef, useState } from 'react'

import { FormStepStatus, FormStepsContext } from './create-form-steps.context'

// FormStepsProvider - scrollToStep 수정
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
    productDisclosure: false,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [headerHeight, setHeaderHeight] = useState(0)

  // 🔑 클릭으로 스크롤 중인지 여부를 ref로 관리 (리렌더 불필요)
  const isScrollingToStep = useRef(false)
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scrollToStep = useCallback((index: number) => {
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

    if (!element) return

    // 1. Observer 일시 비활성화 + step 즉시 확정
    isScrollingToStep.current = true
    setCurrentStep(index + 1)

    // 2. 이전 타이머 초기화
    if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current)

    // 3. 스크롤
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })

    // 4. scrollend 이벤트 지원 시 사용, 미지원 시 timeout fallback
    const unlock = () => {
      isScrollingToStep.current = false
      window.removeEventListener('scrollend', unlock)
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current)
    }

    if ('onscrollend' in window) {
      window.addEventListener('scrollend', unlock, { once: true })
      // scrollend가 발화 안 될 경우 대비 안전망
      scrollEndTimer.current = setTimeout(unlock, 1000)
    } else {
      // fallback: smooth scroll 최대 소요 시간 대기
      scrollEndTimer.current = setTimeout(unlock, 800)
    }
  }, [])

  return (
    <FormStepsContext.Provider
      value={{
        productFields,
        setProductFields,
        currentStep,
        setCurrentStep,
        scrollToStep,
        headerHeight,
        setHeaderHeight,
        isScrollingToStep, // ref 전달
      }}
    >
      {children}
    </FormStepsContext.Provider>
  )
}
