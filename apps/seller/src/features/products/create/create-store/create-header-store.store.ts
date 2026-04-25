import { create } from 'zustand'

import {
  CategoryOptions,
  EssentialOptions,
} from '@/entity/products/create/create-header'
import {
  ActiveTags,
  NutritionData,
  ProductFileType,
} from '@/entity/products/create/create-store'

interface CreateFormStoreProps {
  // --- State ---
  productFields: ProductFileType
  currentStep: number
  headerHeight: number
  nutritionDataList: NutritionData[]
  productPrice: number | null
  isScrolling: boolean // Ref 대신 State로 관리 (Zustand는 선택적 구독이 가능하므로)

  // --- Actions ---
  setProductFields: (fields: Partial<ProductFileType>) => void
  setCurrentStep: (step: number) => void
  setHeaderHeight: (height: number) => void
  setProductPrice: (price: number | null) => void
  setNutritionData: (index: number, data: NutritionData) => void

  // 스크롤 로직
  scrollToStep: (index: number) => void

  // --- Computed (Derived State) ---
  getActiveTags: () => ActiveTags
}

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
    currentStep: 1,
    headerHeight: 0,
    nutritionDataList: [
      { sugar: null, protein: null, fat: null, ingredientCategories: [] },
    ],
    productPrice: null,
    isScrolling: false,

    setProductFields: (fields: Partial<ProductFileType>) =>
      set(
        (state): Partial<CreateFormStoreProps> => ({
          // 1. 리턴 타입을 Partial로 명시
          productFields: {
            ...state.productFields,
            ...fields,
          } as ProductFileType, // 결과물을 FormStepStatus로 단언(Assertion)
        }),
      ),
    setCurrentStep: (step) => set({ currentStep: step }),
    setHeaderHeight: (height) => set({ headerHeight: height }),
    setProductPrice: (price) => set({ productPrice: price }),

    setNutritionData: (index, data) =>
      set((state) => {
        const next = [...state.nutritionDataList]
        next[index] = data
        return { nutritionDataList: next }
      }),

    // 스크롤 로직 이식
    scrollToStep: (index) => {
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

      set({ isScrolling: true, currentStep: index + 1 })
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })

      const unlock = () => set({ isScrolling: false })
      if ('onscrollend' in window) {
        window.addEventListener('scrollend', unlock, { once: true })
        setTimeout(unlock, 1000) // fallback
      } else {
        setTimeout(unlock, 800)
      }
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
