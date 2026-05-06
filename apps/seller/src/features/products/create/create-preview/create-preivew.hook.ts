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

  // 미리보기 URL들을 관리할 상태
  const [allImageUrls, setAllImageUrls] = useState<string[]>([])

  useEffect(() => {
    const newUrls: string[] = []

    // 메인 이미지 처리 (File 객체인지 확인)
    if (formData.mainImage instanceof File) {
      newUrls.push(URL.createObjectURL(formData.mainImage))
    }

    // 추가 이미지 처리 (FileList 또는 File[] 대응)
    if (formData.extraImages) {
      Array.from(formData.extraImages).forEach((file) => {
        if (file instanceof File) {
          newUrls.push(URL.createObjectURL(file))
        }
      })
    }

    setAllImageUrls(newUrls)

    // 다음 렌더링 시 혹은 언마운트 시 생성했던 URL들을 메모리에서 해제
    return () => {
      newUrls.forEach((url) => URL.revokeObjectURL(url))
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
