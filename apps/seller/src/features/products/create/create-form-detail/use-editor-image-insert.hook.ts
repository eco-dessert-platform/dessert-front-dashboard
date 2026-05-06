import { useEffect, useRef } from 'react'

import { useProductCreationStore } from '../create-form/product-creation.store'
export const useEditorImageInsert = () => {
  const { setEditorImageFiles } = useProductCreationStore()

  const editorImageFiles = useRef<Map<string, File>>(new Map())

  const handleImageInsert = async (file: File) => {
    const blobUrl = URL.createObjectURL(file)
    editorImageFiles.current.set(blobUrl, file)
    return blobUrl
  }

  // 메모리 누수 방지를 위한 Cleanup
  useEffect(() => {
    const currentImages = editorImageFiles.current
    return () => {
      // [주의] 여기서 직접 revoke를 수행하면 에디터 상태 처리 전 Blob URL이 만료됩니다.
      // 따라서 이미지 관리 책임을 전역 Store로 이관하며,
      // 실제 메모리 해제(URL.revokeObjectURL)는 Store의 reset 혹은 저장 완료 시점에 수행해야 합니다.
      setEditorImageFiles(new Map(currentImages))
      currentImages.clear()
    }
  }, [setEditorImageFiles])

  return { handleImageInsert, editorImageFiles }
}
