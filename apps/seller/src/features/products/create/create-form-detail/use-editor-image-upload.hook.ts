import { useEffect, useRef } from 'react'

import { useProductCreationStore } from '../create-form/product-creation.store'
export const useEditorImageUpdate = () => {
  const { setEditorImageFiles } = useProductCreationStore()

  const editorImageFiles = useRef<Map<string, File>>(new Map())

  const handleImageUpload = async (file: File) => {
    const blobUrl = URL.createObjectURL(file)
    editorImageFiles.current.set(blobUrl, file)
    return blobUrl
  }

  // 메모리 누수 방지를 위한 Cleanup
  useEffect(() => {
    const currentImages = editorImageFiles.current

    return () => {
      // 정석적인 방법으로는 unmount 시점에서 revoke를 통해 메모리 누수를 방지해야 하지만
      // 상세페이지 등록 페이지를 벗어난 후에 에디터가 가지고 있던 이미지 Map을 전역 Store에 백업하기 위해서
      // 폼 저장 성공 시 revoke 하는 전략으로 변경합니다.

      setEditorImageFiles(new Map(currentImages))
      currentImages.clear()
    }
  }, [setEditorImageFiles])

  return { handleImageUpload, editorImageFiles }
}
