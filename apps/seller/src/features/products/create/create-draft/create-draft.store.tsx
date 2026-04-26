import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { CreateFormType } from '@/entity/products/create/create-form'

// 이미지는 localStorage 저장 불가 사유로 제외합니다
type DraftData = Omit<CreateFormType, 'mainImage' | 'extraImages'> & {
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
    { name: 'product-create-draft' },
  ),
)
