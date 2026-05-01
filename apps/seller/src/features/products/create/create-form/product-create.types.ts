import z from 'zod'

import {
  DeliveryFormInput,
  ProductDisclosureFormInput,
  ProductFormInput,
  ProductOptionFormInput,
} from '@/entity/products'

import { deliverySchema } from '../create-form-delivery/create-delivery.schema'
import { disclosureSchema } from '../create-form-disclosure/create-disclosure.schema'
import { productSchema } from '../create-form-info/create-info.schema'
import { productOptionSchema } from '../create-form-options/create-options.schema'

export type CreateProductForm = ProductFormInput &
  DeliveryFormInput & {
    options: ProductOptionFormInput[] // Feature의 스키마 대신 Entity의 순수 타입을 사용
  } & ProductDisclosureFormInput

export const createProductSchema = productSchema
  .and(deliverySchema)
  .and(z.object({ options: z.array(productOptionSchema).min(1) }))
  .and(disclosureSchema)
