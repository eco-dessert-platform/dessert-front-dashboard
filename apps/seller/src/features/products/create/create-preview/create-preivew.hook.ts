import { useEffect, useState } from 'react'

import { useFormContext } from 'react-hook-form'

//import { CreateFormType } from '@/entity/products/create/create-form'
import { CreateProductForm } from '../create-form'
import { useProductCreationStore } from '../create-form/product-creation.store'

export const useCreatePreviewHook = () => {
  const { watch } = useFormContext<CreateProductForm>()

  const [
    productName,
    productPrice,
    rawDiscount,
    discountType,
    deliveryFee,
    deliveryMinFee,
    mainImage,
    extraImages,
    options,
  ] = watch([
    'productName',
    'price',
    'discountAmount',
    'discountType',
    'deliveryFee',
    'deliveryMinFee',
    'mainImage',
    'extraImages',
    'options',
  ])

  const { productDetail } = useProductCreationStore()

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
      if (typeof item === 'object' && item !== null && 'file' in item) {
        const internalFile = (item as { file: unknown }).file
        if (internalFile instanceof File || internalFile instanceof Blob) {
          return URL.createObjectURL(internalFile)
        }
      }
      return null
    }

    const main = createUrl(mainImage)
    if (main) images.push(main)

    if (extraImages && typeof extraImages === 'object') {
      const extraLength =
        'length' in extraImages ? (extraImages as ArrayLike<unknown>).length : 0
      for (let i = 0; i < extraLength; i++) {
        const file = (extraImages as Record<number, unknown>)[i]
        const url = createUrl(file)
        if (url) images.push(url)
      }
    }

    setAllImageUrls(images)

    return () => {
      images.forEach((url) => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url)
      })
    }
  }, [mainImage, extraImages])

  return {
    productName,
    productPrice,
    productDetail,
    discountPercent,
    deliveryFee,
    deliveryMinFee,
    totalPrice,
    isPriceEntered,
    allImageUrls,
    discountAmount,
    hasMainImage: !!mainImage,
    options,
  }
}
