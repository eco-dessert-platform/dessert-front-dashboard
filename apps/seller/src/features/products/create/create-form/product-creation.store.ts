import { create } from 'zustand'

interface ProductCreationState {
  productDetail: string
  setProductDetail: (content: string) => void
  reset: () => void
}

export const useProductCreationStore = create<ProductCreationState>((set) => ({
  productDetail: '',
  setProductDetail: (content) => set({ productDetail: content }),
  reset: () => set({ productDetail: '' }),
}))
