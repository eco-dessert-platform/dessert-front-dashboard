import { CreateProductRequest, ProductOptionRequest } from '@/entity/products'

import { ProductOptionsType } from '../create-form-options'
import { CreateProductForm } from './product-create.types'
import { mapToBackendCategory } from './map-to-backend-category.utils'

/** Spring @ModelAttribute가 읽을 수 있도록 중첩 값을 dot-notation으로 append */
export function appendFormValue(
  formData: FormData,
  key: string,
  value: unknown,
) {
  if (value === null || value === undefined) return

  if (value instanceof File) {
    formData.append(key, value, value.name)
    return
  }

  if (value instanceof Blob) {
    formData.append(key, value)
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      appendFormValue(formData, `${key}[${index}]`, item)
    })
    return
  }

  if (typeof value === 'object') {
    Object.entries(value as Record<string, unknown>).forEach(
      ([childKey, childValue]) => {
        appendFormValue(formData, `${key}.${childKey}`, childValue)
      },
    )
    return
  }

  if (typeof value === 'boolean') {
    formData.append(key, value ? 'true' : 'false')
    return
  }

  formData.append(key, String(value))
}

function mapOptionToRequest(option: ProductOptionsType): ProductOptionRequest {
  const days = new Set(option.shippingDays)
  const categorySource = option.subCategory || option.mainCategory

  return {
    title: option.optionName,
    category: mapToBackendCategory(categorySource),
    plusPriceWithBoardPrice: option.additionalPrice ?? 0,
    stock: option.stockQuantity ?? 0,
    dietaryTags: {
      glutenFreeTag: option.ingredientCategories.includes('glutenFree'),
      highProteinTag: (option.protein ?? 0) >= 11,
      sugarFreeTag: (option.sugar ?? 0) < 5,
      veganTag: option.ingredientCategories.includes('vegan'),
      ketogenicTag: false,
    },
    availability: {
      monday: days.has('mon'),
      tuesday: days.has('tue'),
      wednesday: days.has('wed'),
      thursday: days.has('thu'),
      friday: days.has('fri'),
      saturday: days.has('sat'),
      sunday: days.has('sun'),
    },
    nutritionInfo: option.hasNutrition
      ? {
          totalWeight: option.totalWeight ?? 0,
          servingSize: option.servingSize ?? 0,
          carbohydrates: option.carbohydrate ?? 0,
          sugars: option.sugar ?? 0,
          protein: option.protein ?? 0,
          fat: option.fat ?? 0,
          calories: option.calories ?? 0,
        }
      : null,
  }
}

export function mapCreateFormToBoardRequest(
  data: CreateProductForm,
  productDetail: string,
  storeId: number,
): CreateProductRequest {
  return {
    storeId,
    title: data.productName,
    isFresh: data.isFresh,
    productionStartAt: data.productionTime,
    price: data.price ?? 0,
    discountType: data.discountType === 'won' ? 'AMOUNT' : 'RATE',
    discountValue: data.discountAmount ?? 0,
    deliveryCondition: data.deliveryTerms,
    deliveryCompany: data.deliveryCompany,
    deliveryFee: data.deliveryFee ?? 0,
    freeShippingConditions: data.deliveryMinFee ?? 0,
    products: data.options.map(mapOptionToRequest),
    boardDetailRequest: {
      content: productDetail,
    },
    productInfoNoticeRequest: data.productInfoNotice,
  }
}

export interface BuildProductBoardFormDataParams {
  data: CreateProductForm
  productDetail: string
  storeId: number
  /** 에디터에 삽입된 상세 이미지 파일들 */
  boardDetailImages?: File[]
}

/**
 * POST /api/v1/seller/boards (multipart/form-data, Spring @ModelAttribute)
 */
export function buildProductBoardFormData({
  data,
  productDetail,
  storeId,
  boardDetailImages = [],
}: BuildProductBoardFormDataParams): FormData {
  if (!data.mainImage) {
    throw new Error('썸네일 이미지는 필수입니다.')
  }

  const request = mapCreateFormToBoardRequest(data, productDetail, storeId)
  const formData = new FormData()

  // 스칼라 / 중첩 객체·배열 → dot-notation
  Object.entries(request).forEach(([key, value]) => {
    appendFormValue(formData, key, value)
  })

  // 파일 파라미터
  formData.append('thumbnailImgFile', data.mainImage, data.mainImage.name)

  data.extraImages?.forEach((item) => {
    formData.append('productImgs', item.file, item.file.name)
  })

  boardDetailImages.forEach((file) => {
    formData.append('boardDetailImages', file, file.name)
  })

  return formData
}
