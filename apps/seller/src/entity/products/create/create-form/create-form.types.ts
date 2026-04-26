import {
  DeliveryFormInput,
  ProductDisclosureFormInput,
  ProductFormInput,
  ProductOptionFormInput,
  ThumbnailFormInput,
} from './create-indivisual-form.type'

export type CreateFormType = ProductFormInput &
  DeliveryFormInput & {
    options: ProductOptionFormInput[] // Feature의 스키마 대신 Entity의 순수 타입을 사용
  } & ProductDisclosureFormInput &
  ThumbnailFormInput
