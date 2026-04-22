import { useCallback, useMemo, useRef, useState } from 'react'

import {
  ActiveTags,
  FormStepStatus,
  FormStepsContext,
  NutritionData,
} from './create-form-steps.context'

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

  //필수성분, 적용된 카테고리 부분

  const [nutritionData, setNutritionData] = useState<NutritionData>({
    sugar: 0,
    protein: 0,
    fat: 0,
    ingredientCategories: [],
  })

  const activeTags: ActiveTags = useMemo(() => {
    const { sugar, protein, fat, ingredientCategories } = nutritionData

    // 값이 실제로 입력되었는지 확인 (비어있거나 0이면 false 처리)
    const hasProtein = protein > 0
    const hasSugar = sugar > 0
    const hasFat = fat > 0

    const isGlutenFree = ingredientCategories.includes('glutenFree')
    const isVegan = ingredientCategories.includes('vegan')

    // "값이 존재함 && 기준치 미만/이상" 두 조건을 모두 만족해야 함
    const isHighProtein = hasProtein && protein >= 11
    const isLowFat = hasFat && fat < 3
    const isLowSugar = hasSugar && sugar < 5

    return {
      essential: {
        isGlutenFree,
        isVegan,
        isHighProtein,
        isLowFat,
        isLowSugar,
      },
      category: {
        // 칼로리 다운도 저당/저지방 둘 다 '실제 입력'이 있어야 함
        isCalorieDown: isLowSugar && isLowFat,
        isProteinRich: isHighProtein,
        isEasyDigestion: isVegan && isGlutenFree,
      },
    }
  }, [nutritionData])

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
        nutritionData,
        setNutritionData,
        activeTags,
      }}
    >
      {children}
    </FormStepsContext.Provider>
  )
}
