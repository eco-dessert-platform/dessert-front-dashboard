import { create } from 'zustand'

import { CategoryOptions } from './category-options.constants'
import {
  ActiveTags,
  NutritionData,
  ProductFileType,
} from './create-header-store.type'
import { CREATE_FORM_STEP_IDS } from './create-header.constant'
import { EssentialOptions } from './essential-options.constants'

interface CreateFormStoreProps {
  // --- State ---
  productFields: ProductFileType
  currentStep: number
  headerHeight: number
  nutritionDataList: NutritionData[]
  isScrolling: boolean // Ref 대신 State로 관리 (Zustand는 선택적 구독이 가능하므로)

  // --- Actions ---
  setProductFields: (fields: Partial<ProductFileType>) => void
  setCurrentStep: (step: number) => void
  setHeaderHeight: (height: number) => void
  setNutritionData: (index: number, data: NutritionData) => void

  // 스크롤 로직
  scrollToStep: (index: number) => void

  // --- Computed (Derived State) ---
  getActiveTags: () => ActiveTags
}

// scrollToStep 재진입 시 이전 타이머/리스너를 정리하기 위한 모듈 레벨 토큰
let scrollUnlockTimer: ReturnType<typeof setTimeout> | null = null
let scrollUnlockListener: (() => void) | null = null

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
    currentStep: 1,
    headerHeight: 0,
    nutritionDataList: [
      { sugar: null, protein: null, fat: null, ingredientCategories: [] },
    ],
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

    setNutritionData: (index, data) =>
      set((state) => {
        const prev = state.nutritionDataList[index]
        // 값이 동일하면 새 배열을 만들지 않아 불필요한 리렌더를 방지
        if (prev && isSameNutrition(prev, data)) return {}
        const next = [...state.nutritionDataList]
        next[index] = data
        return { nutritionDataList: next }
      }),

    // 스크롤 로직 이식
    scrollToStep: (index) => {
      const targetId = CREATE_FORM_STEP_IDS[index]
      const element = document.getElementById(targetId)
      if (!element) return

      // 직전 호출이 걸어둔 타이머/리스너를 먼저 정리해 최신 호출만 unlock되도록 함
      if (scrollUnlockTimer) clearTimeout(scrollUnlockTimer)
      if (scrollUnlockListener) {
        window.removeEventListener('scrollend', scrollUnlockListener)
        scrollUnlockListener = null
      }

      set({ isScrolling: true, currentStep: index + 1 })
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })

      const unlock = () => {
        if (scrollUnlockTimer) {
          clearTimeout(scrollUnlockTimer)
          scrollUnlockTimer = null
        }
        if (scrollUnlockListener) {
          window.removeEventListener('scrollend', scrollUnlockListener)
          scrollUnlockListener = null
        }
        set({ isScrolling: false })
      }

      if ('onscrollend' in window) {
        scrollUnlockListener = unlock
        window.addEventListener('scrollend', unlock, { once: true })
        scrollUnlockTimer = setTimeout(unlock, 1000)
      } else {
        scrollUnlockTimer = setTimeout(unlock, 800)
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
