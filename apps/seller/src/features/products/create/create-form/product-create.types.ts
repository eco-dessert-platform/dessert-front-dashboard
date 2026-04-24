import z from 'zod'

import {
  DeliveryFormInput,
  ProductDisclosureFormInput,
  ProductFormInput,
  ThumbnailFormInput,
} from '@/entity/products'

import { deliverySchema } from '../create-form-delivery/create-delivery.schema'
import { disclosureSchema } from '../create-form-disclosure/create-disclosure.schema'
import { productSchema } from '../create-form-info/create-info.schema'
import { productOptionSchema } from '../create-form-options/create-options.schema'
import { thumbnailSchema } from '../create-form-thumbnail-upload'

const productOptionsWrapperSchema = z.object({
  options: z.array(productOptionSchema).min(1),
})
type ProductOptionsWrapper = z.infer<typeof productOptionsWrapperSchema>

export type CreateProductForm = ProductFormInput &
  DeliveryFormInput &
  ProductOptionsWrapper &
  ProductDisclosureFormInput &
  ThumbnailFormInput

export const createProductSchema = productSchema
  .and(deliverySchema)
  .and(productOptionsWrapperSchema)
  .and(disclosureSchema)
  .and(thumbnailSchema)
