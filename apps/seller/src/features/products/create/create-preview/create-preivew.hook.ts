import { useEffect, useState } from 'react'

import { useFormContext } from 'react-hook-form'

//import { CreateFormType } from '@/entity/products/create/create-form'
import { CreateProductForm } from '../create-form'
import { useProductCreationStore } from '../create-form/product-creation.store'

export const useCreatePreviewHook = () => {
  const { watch } = useFormContext<CreateProductForm>()
  const formData = watch()
  const { productDetail } = useProductCreationStore()

  const productPrice = formData.price
  const rawDiscount = formData.discountAmount
  const discountType = formData.discountType

  const price = productPrice ?? 0
  const discountAmount = rawDiscount ?? 0

  const discountPercent =
    discountType === 'won'
      ? price > 0
        ? Math.round((discountAmount / price) * 100)
        : 0
      : discountAmount

  const totalPrice =
    discountType === 'won'
      ? price - discountAmount
      : Math.round(price * (1 - discountAmount / 100))

  const isPriceEntered = productPrice !== null && productPrice > 0

  // 미리보기 URL들을 관리할 상태 (메모리 누수 방지용)
  const [allImageUrls, setAllImageUrls] = useState<string[]>([])

  useEffect(() => {
    const images: string[] = []

    const createUrl = (item: unknown): string | null => {
      if (!item) return null
      if (item instanceof File || item instanceof Blob) {
        return URL.createObjectURL(item)
      }
      if (typeof item === 'string' && item.startsWith('http')) {
        return item
      }
      // 추가 이미지 데이터가 { id: string, file: File } 형태의 객체인 경우 대응
      if (typeof item === 'object' && item !== null && 'file' in item) {
        const internalFile = (item as { file: unknown }).file
        if (internalFile instanceof File || internalFile instanceof Blob) {
          return URL.createObjectURL(internalFile)
        }
      }
      return null
    }

    // 1. 메인 이미지 처리
    const main = createUrl(formData.mainImage)
    if (main) images.push(main)

    // 2. 추가 이미지 처리 (FileList 및 Array 대응을 위해 인덱스로 접근)
    const extras = formData.extraImages
    if (extras && typeof extras === 'object') {
      const extraLength =
        'length' in extras ? (extras as ArrayLike<unknown>).length : 0
      for (let i = 0; i < extraLength; i++) {
        const file = (extras as Record<number, unknown>)[i]
        const url = createUrl(file)
        if (url) images.push(url)
      }
    }

    setAllImageUrls(images)

    // 다음 렌더링 시 혹은 언마운트 시 생성했던 URL들을 메모리에서 해제
    return () => {
      images.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url)
        }
      })
    }
  }, [formData.mainImage, formData.extraImages])

  return {
    formData,
    productPrice,
    productDetail,
    discountPercent,
    totalPrice,
    isPriceEntered,
    allImageUrls,
    discountAmount,
  }
}
