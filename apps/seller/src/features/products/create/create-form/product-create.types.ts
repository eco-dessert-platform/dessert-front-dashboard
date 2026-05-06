import { z } from 'zod'

import { ProductDeliveryType } from '../create-form-delivery'
import { deliverySchema } from '../create-form-delivery/create-delivery.schema'
import { ProductDisclosureType } from '../create-form-disclosure'
import { disclosureSchema } from '../create-form-disclosure/create-disclosure.schema'
import { ProductInfoType } from '../create-form-info'
import { productSchema } from '../create-form-info/create-info.schema'
import { productOptionSchema } from '../create-form-options/create-options.schema'
import { thumbnailSchema } from '../create-form-thumbnail/create-form-thumbnail.schema'
import { ThumbnailFormType } from '../create-form-thumbnail/create-form-thumbnail.type'

//ThumbnailFormType이 entity에 있지 않는 이유는
//이전 PR에서 entity구조에 대한 FSD위반 코드리뷰를 받았기 때문입니다.
//상단 @/entity/products 역시 파일 구조 수정 예정이니 참고 부탁드립니다.

export type CreateFormType = ProductInfoType &
  ProductDeliveryType & {
    options: z.infer<typeof productOptionSchema>[]
  } & ProductDisclosureType &
  ThumbnailFormType

export const createProductSchema = productSchema
  .and(deliverySchema)
  .and(z.object({ options: z.array(productOptionSchema).min(1) }))
  .and(disclosureSchema)
  .and(thumbnailSchema)
