import { useCreateHeaderStore } from './create-header-store.store'

export const useCreateHeaderSteps = () => {
  const store = useCreateHeaderStore()

  return {
    // 상태값 (State)
    currentStep: store.currentStep,
    headerHeight: store.headerHeight,
    productFields: store.productFields,
    nutritionDataList: store.nutritionDataList,
    activeTags: store.getActiveTags(),

    // 액션 (Actions)
    setCurrentStep: store.setCurrentStep,
    setHeaderHeight: store.setHeaderHeight,
    setProductFields: store.setProductFields,
    setNutritionData: store.setNutritionData,
    scrollToStep: store.scrollToStep,

    // Observer 로직 대응용 Ref 구조
    isScrollingToStep: { current: store.isScrolling },
  }
}
