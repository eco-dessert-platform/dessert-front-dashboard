import { create } from 'zustand'

import { CategoryOptions } from './category-options.constants'
import {
  ActiveTags,
  NutritionData,
  ProductStageCompletion,
} from './create-header-store.type'
import { CREATE_FORM_STEP_IDS } from './create-header.constant'
import { EssentialOptions } from './essential-options.constants'

interface CreateFormStoreProps {
  // --- State ---
  productFields: ProductStageCompletion
  headerHeight: number
  nutritionDataList: NutritionData[]

  // --- Actions ---
  setProductFields: (fields: Partial<ProductStageCompletion>) => void
  setHeaderHeight: (height: number) => void
  setNutritionData: (index: number, data: NutritionData) => void

  scrollToStep: (index: number) => void

  // --- Computed (Derived State) ---
  getActiveTags: () => ActiveTags
}

const isSameNutrition = (a: NutritionData, b: NutritionData) =>
  a.sugar === b.sugar &&
  a.protein === b.protein &&
  a.fat === b.fat &&
  a.ingredientCategories.length === b.ingredientCategories.length &&
  a.ingredientCategories.every((c, i) => c === b.ingredientCategories[i])

export const useCreateHeaderStore = create<CreateFormStoreProps>(
  (set, get) => ({
    productFields: {
      productInfo: false,
      productDelivery: false,
      productThumbnail: false,
      productOptions: false,
      productDetail: false,
      productDisclosure: false,
    },
    headerHeight: 0,
    nutritionDataList: [
      { sugar: null, protein: null, fat: null, ingredientCategories: [] },
    ],

    setProductFields: (fields: Partial<ProductStageCompletion>) =>
      set((state) => ({
        productFields: {
          ...state.productFields,
          ...fields,
        },
      })),
    setHeaderHeight: (height) => set({ headerHeight: height }),

    setNutritionData: (index, data) =>
      set((state) => {
        const prev = state.nutritionDataList[index]
        // 값이 동일하면 새 배열을 만들지 않아 불필요한 리렌더를 방지
        if (prev && isSameNutrition(prev, data)) return {}
        const next = [...state.nutritionDataList]
        next[index] = data
        return { nutritionDataList: next }
      }),

    scrollToStep: (index) => {
      const targetId = CREATE_FORM_STEP_IDS[index]
      const element = document.getElementById(targetId)
      if (!element) return

      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    getActiveTags: () => {
      const { nutritionDataList } = get()
      const allCategories = nutritionDataList.flatMap(
        (d) => d.ingredientCategories,
      )

      const isGlutenFree = allCategories.includes('glutenFree')
      const isVegan = allCategories.includes('vegan')
      const isHighProtein = nutritionDataList.some(
        (d) => d.protein !== null && d.protein >= 11,
      )
      const isLowFat = nutritionDataList.some(
        (d) => d.fat !== null && d.fat < 3,
      )
      const isLowSugar = nutritionDataList.some(
        (d) => d.sugar !== null && d.sugar < 5,
      )

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
    },
  }),
)
