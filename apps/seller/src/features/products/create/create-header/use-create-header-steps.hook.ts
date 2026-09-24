import { useShallow } from 'zustand/react/shallow'

import { useCreateHeaderStore } from './create-header-store.store'
import { getCompletedSteps } from './is-stage-complete.utils'

export const useCreateHeaderSteps = () => {
  const state = useCreateHeaderStore(
    useShallow((store) => ({
      headerHeight: store.headerHeight,
      productFields: store.productFields,
      nutritionDataList: store.nutritionDataList,
      setHeaderHeight: store.setHeaderHeight,
      setProductFields: store.setProductFields,
      setNutritionData: store.setNutritionData,
      scrollToStep: store.scrollToStep,
    })),
  )

  const activeTags = useCreateHeaderStore.getState().getActiveTags()
  const completedSteps = getCompletedSteps(state.productFields)

  return {
    headerHeight: state.headerHeight,
    productFields: state.productFields,
    completedSteps,
    nutritionDataList: state.nutritionDataList,
    activeTags,

    setHeaderHeight: state.setHeaderHeight,
    setProductFields: state.setProductFields,
    setNutritionData: state.setNutritionData,
    scrollToStep: state.scrollToStep,
  }
}
