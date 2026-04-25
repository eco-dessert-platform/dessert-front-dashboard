import { useState } from 'react'

import { useFormContext } from 'react-hook-form'

import type { CreateProductForm } from '../../../../entity/products/create/create-form/product-create.types'

export function useProductThumbnailForm() {
  const form = useFormContext<CreateProductForm>()

  const mainImage = form.watch('mainImage')
  const extraImages = form.watch('extraImages') || []

  const [deleteTarget, setDeleteTarget] = useState<number | 'main' | null>(null)

  // 필수 입력 사항 판별: 대표 이미지가 있으면 true
  const isFormField = mainImage !== null

  const handleMainImageChange = (file: File | null) => {
    form.setValue('mainImage', file, { shouldValidate: true })
  }

  const handleExtraImagesChange = (files: File[]) => {
    form.setValue('extraImages', files, { shouldValidate: true })
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'main' | 'extra',
  ) => {
    const files = e.target.files
    if (!files) return

    if (type === 'main') {
      handleMainImageChange(files[0])
    } else {
      const remainingSlots = 9 - extraImages.length
      const newFiles = Array.from(files).slice(0, remainingSlots)
      handleExtraImagesChange([...extraImages, ...newFiles])
    }
    e.target.value = ''
  }

  const handleImageDelete = () => {
    if (deleteTarget === 'main') {
      handleMainImageChange(null)
    } else if (typeof deleteTarget === 'number') {
      const newImages = extraImages.filter((_, i) => i !== deleteTarget)
      handleExtraImagesChange(newImages)
    }
    setDeleteTarget(null)
  }

  return {
    form,
    mainImage,
    extraImages,
    isFormField,
    deleteTarget,
    setDeleteTarget,
    handleFileChange,
    handleImageDelete,
  }
}
