import { create } from 'zustand'

interface ProductCreationState {
  productDetail: string
  editorImageFiles: Map<string, File>
  setProductDetail: (content: string) => void
  setEditorImageFiles: (files: Map<string, File>) => void
  reset: () => void
}

export const useProductCreationStore = create<ProductCreationState>((set) => ({
  productDetail: '',
  editorImageFiles: new Map(),
  setProductDetail: (content) => set({ productDetail: content }),
  setEditorImageFiles: (files) => set({ editorImageFiles: files }),
  reset: () =>
    set({
      productDetail: '',
      editorImageFiles: new Map(),
    }),
}))
