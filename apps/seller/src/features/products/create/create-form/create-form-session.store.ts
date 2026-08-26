import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { CreateProductForm } from './product-create.types'

export const PRODUCT_CREATE_SESSION_KEY = 'product-create-session'

/** File 객체는 직렬화할 수 없어 sessionStorage 저장에서 제외합니다. */
export type SerializableFormData = Omit<
  CreateProductForm,
  'mainImage' | 'extraImages'
> & {
  productDetail: string
}

export type SessionFileData = Pick<
  CreateProductForm,
  'mainImage' | 'extraImages'
>

interface CreateFormSessionStore {
  formData: SerializableFormData | null
  fileData: SessionFileData | null
  saveSession: (
    formData: SerializableFormData,
    fileData: SessionFileData,
  ) => void
  updateProductDetail: (productDetail: string) => void
  clearSession: () => void
}

export const useCreateFormSessionStore = create<CreateFormSessionStore>()(
  persist(
    (set, get) => ({
      formData: null,
      fileData: null,

      saveSession: (formData, fileData) => set({ formData, fileData }),

      updateProductDetail: (productDetail) => {
        const { formData } = get()
        set({
          formData: formData
            ? { ...formData, productDetail }
            : ({ productDetail } as SerializableFormData),
        })
      },

      clearSession: () => set({ formData: null, fileData: null }),
    }),
    {
      name: PRODUCT_CREATE_SESSION_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ formData: state.formData }),
    },
  ),
)
