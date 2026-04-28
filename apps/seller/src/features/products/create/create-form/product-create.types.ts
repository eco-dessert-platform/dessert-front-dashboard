import {
  DeliveryFormInput,
  ProductDisclosureFormInput,
  ProductFormInput,
  ProductOptionFormInput,
  ThumbnailFormInput,
} from '@/entity/products'

import { deliverySchema } from '../create-form-delivery/create-delivery.schema'
import { disclosureSchema } from '../create-form-disclosure/create-disclosure.schema'
import { productSchema } from '../create-form-info/create-info.schema'
import { productOptionSchema } from '../create-form-options/create-options.schema'

export type CreateProductForm = ProductFormInput &
  DeliveryFormInput &
  ProductOptionFormInput &
  ProductDisclosureFormInput &
  ThumbnailFormInput

export const createProductSchema = productSchema
  .and(deliverySchema)
  .and(productOptionSchema)
  .and(disclosureSchema)
