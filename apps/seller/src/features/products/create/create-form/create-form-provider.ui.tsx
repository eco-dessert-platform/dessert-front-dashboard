import { useCallback, useMemo, useRef, useState } from 'react'

import { CategoryOptions, EssentialOptions } from '@/entity/products'

import {
  ActiveTags,
  FormStepStatus,
  FormStepsContext,
  NutritionData,
} from './create-form-steps.context'

// FormStepsProvider - scrollToStep
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

  // 클릭으로 스크롤 중인지 여부를 ref로 관리 (리렌더 불필요)
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

  const [nutritionDataList, setNutritionDataList] = useState<NutritionData[]>([
    {
      sugar: 0,
      protein: 0,
      fat: 0,
      ingredientCategories: [],
    },
  ])

  const setNutritionData = useCallback((index: number, data: NutritionData) => {
    setNutritionDataList((prev) => {
      const next = [...prev]
      next[index] = data
      return next
    })
  }, [])

  const activeTags: ActiveTags = useMemo(() => {
    // 모든 옵션의 ingredientCategories 합산
    const allCategories = nutritionDataList.flatMap(
      (d) => d.ingredientCategories,
    )

    // 각 영양소는 하나라도 기준 충족하면 활성화
    const isGlutenFree = allCategories.includes('glutenFree')
    const isVegan = allCategories.includes('vegan')
    const isHighProtein = nutritionDataList.some(
      (d) => d.protein > 0 && d.protein >= 11,
    )
    const isLowFat = nutritionDataList.some((d) => d.fat > 0 && d.fat < 3)
    const isLowSugar = nutritionDataList.some((d) => d.sugar > 0 && d.sugar < 5)

    return {
      [EssentialOptions[0].title]: isGlutenFree,
      [EssentialOptions[1].title]: isVegan,
      [EssentialOptions[2].title]: isHighProtein,
      [EssentialOptions[3].title]: isLowFat,
      [EssentialOptions[4].title]: isLowSugar,
      [CategoryOptions[0].title]: isLowSugar && isLowFat,
      [CategoryOptions[1].title]: isHighProtein,
      [CategoryOptions[2].title]: isVegan && isGlutenFree,
    }
  }, [nutritionDataList])

  //상품 정보, 상품 옵션 정보에서 공유하는 가격
  const [productPrice, setProductPrice] = useState<number | null>(null)

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
        nutritionDataList,
        setNutritionData,
        activeTags,
        productPrice,
        setProductPrice,
      }}
    >
      {children}
    </FormStepsContext.Provider>
  )
}
