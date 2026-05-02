import { useEffect, useRef } from 'react'

export const useEditorImageUpdate = () => {
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
      currentImages.forEach((_file, url) => {
        URL.revokeObjectURL(url)
      })
      currentImages.clear()
    }
  }, [])

  return { handleImageUpload, editorImageFiles }
}
