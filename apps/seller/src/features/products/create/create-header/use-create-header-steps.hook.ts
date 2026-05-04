import { useMemo, useRef } from 'react'

import { useShallow } from 'zustand/shallow'

import { useCreateHeaderStore } from './create-header-store.store'

export const useCreateHeaderSteps = () => {
  const state = useCreateHeaderStore(
    useShallow((s) => ({
      currentStep: s.currentStep,
      headerHeight: s.headerHeight,
      productFields: s.productFields,
      nutritionDataList: s.nutritionDataList,
      productPrice: s.productPrice,
      activeTags: s.getActiveTags(),
      isScrolling: s.isScrolling,
    })),
  )
  const actions = useCreateHeaderStore(
    useShallow((s) => ({
      setCurrentStep: s.setCurrentStep,
      setHeaderHeight: s.setHeaderHeight,
      setProductFields: s.setProductFields,
      setNutritionData: s.setNutritionData,
      setProductPrice: s.setProductPrice,
      scrollToStep: s.scrollToStep,
    })),
  )
  const isScrollingToStep = useRef(state.isScrolling)
  isScrollingToStep.current = state.isScrolling
  return useMemo(
    () => ({ ...state, ...actions, isScrollingToStep }),
    [state, actions, isScrollingToStep],
  )
}
