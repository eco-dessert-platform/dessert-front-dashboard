import { useShallow } from 'zustand/react/shallow'

import { useCreateHeaderStore } from './create-header-store.store'

export const useCreateHeaderSteps = () => {
  // 필요한 필드만 shallow 구독해 무관한 상태 변경에 의한 리렌더를 줄입니다
  const state = useCreateHeaderStore(
    useShallow((store) => ({
      currentStep: store.currentStep,
      headerHeight: store.headerHeight,
      productFields: store.productFields,
      nutritionDataList: store.nutritionDataList,
      isScrolling: store.isScrolling,
      setCurrentStep: store.setCurrentStep,
      setHeaderHeight: store.setHeaderHeight,
      setProductFields: store.setProductFields,
      setNutritionData: store.setNutritionData,
      scrollToStep: store.scrollToStep,
    })),
  )

  // 파생값은 구독 객체에 넣으면 매 렌더 새 객체로 불필요한 리렌더를 유발하므로 분리해 계산합니다.
  // nutritionDataList를 구독하므로 입력이 바뀌면 자연히 최신값으로 재계산됩니다.
  const activeTags = useCreateHeaderStore.getState().getActiveTags()

  return {
    currentStep: state.currentStep,
    headerHeight: state.headerHeight,
    productFields: state.productFields,
    nutritionDataList: state.nutritionDataList,
    activeTags,

    setCurrentStep: state.setCurrentStep,
    setHeaderHeight: state.setHeaderHeight,
    setProductFields: state.setProductFields,
    setNutritionData: state.setNutritionData,
    scrollToStep: state.scrollToStep,

    // Observer 로직 대응용 Ref 구조
    isScrollingToStep: { current: state.isScrolling },
  }
}
