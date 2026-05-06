import { create } from 'zustand'

interface ProductCreationState {
  productDetail: string
  editorImageFiles: Map<string, File>
  setProductDetail: (content: string) => void
  setEditorImageFiles: (files: Map<string, File>) => void
  reset: () => void
}

export const useProductCreationStore = create<ProductCreationState>(
  (set, get) => ({
    productDetail: '',
    editorImageFiles: new Map(),
    setProductDetail: (content) => set({ productDetail: content }),
    setEditorImageFiles: (files) => set({ editorImageFiles: files }),
    reset: () => {
      // 기존에 생성된 모든 Blob URL을 메모리에서 해제합니다.
      const { editorImageFiles } = get()
      editorImageFiles.forEach((_, blobUrl) => {
        URL.revokeObjectURL(blobUrl)
      })

      set({
        productDetail: '',
        editorImageFiles: new Map(),
      })
    },
  }),
)
