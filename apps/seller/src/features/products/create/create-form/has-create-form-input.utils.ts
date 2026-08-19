import { isEqual } from 'lodash-es'

import { CREATE_PRODUCT_DEFAULT_VALUES } from './use-create-product-form.hook'
import { CreateProductForm } from './product-create.types'

function isEmptyProductDetail(productDetail: string) {
  const trimmed = productDetail.trim()
  return trimmed === '' || trimmed === '<p><br></p>'
}

function stripFiles(values: CreateProductForm) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mainImage, extraImages, ...rest } = values
  return rest
}

/**
 * 임시저장/저장하기 버튼 활성화 여부.
 * - form isDirty
 * - 또는 기본값과 다른 입력값 존재
 * - 또는 상세페이지 콘텐츠 존재
 */
export function hasCreateFormInput(
  values: CreateProductForm,
  productDetail: string,
  isDirty: boolean,
): boolean {
  if (isDirty) return true
  if (!isEmptyProductDetail(productDetail)) return true
  if (values.mainImage !== null) return true
  if ((values.extraImages?.length ?? 0) > 0) return true

  return !isEqual(
    stripFiles(values),
    stripFiles(CREATE_PRODUCT_DEFAULT_VALUES),
  )
}
