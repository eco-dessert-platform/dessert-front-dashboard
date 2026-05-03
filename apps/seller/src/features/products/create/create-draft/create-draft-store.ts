import { create } from 'zustand'
import { persist } from 'zustand/middleware'

//import { CreateFormType } from '@/entity/products/create/create-form'
import { CreateProductForm } from '../create-form'
// 이미지는 localStorage 저장 불가 사유로 제외합니다
type DraftData = Omit<CreateProductForm, 'mainImage' | 'extraImages'> & {
  productDetail: string
}

interface CreateDraftStore {
  draft: DraftData | null
  saveDraft: (data: DraftData) => void
  clearDraft: () => void
}

export const useCreateDraftStore = create<CreateDraftStore>()(
  persist(
    (set) => ({
      draft: null,
      saveDraft: (data) => set({ draft: data }),
      clearDraft: () => set({ draft: null }),
    }),
    {
      // 코드래빗 리뷰 반영 : persist 스키마 버전 관리 및 직렬화 안전장치 부재
      name: 'product-create-draft',
      version: 1,
      migrate: (persisted, version) => {
        if (version < 1) return { draft: null }
        return persisted as { draft: DraftData | null }
      },
    },
  ),
)
