import { useFormContext } from 'react-hook-form'

import { CreateProductForm } from '../create-form/product-create.types'

export function useProductThumbnailForm() {
  const form = useFormContext<CreateProductForm>()

  const mainImage = form.watch('mainImage')
  const extraImages = form.watch('extraImages') || []

  // 필수 입력 사항 판별: 대표 이미지가 있으면 true
  const isFormField = mainImage !== null

  const handleMainImageChange = (file: File | null) => {
    form.setValue('mainImage', file, { shouldValidate: true })
  }

  const handleExtraImagesChange = (files: File[]) => {
    form.setValue('extraImages', files, { shouldValidate: true })
  }

  return {
    form,
    mainImage,
    extraImages,
    isFormField,
    handleMainImageChange,
    handleExtraImagesChange,
  }
}
