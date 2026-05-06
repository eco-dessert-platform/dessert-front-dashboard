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
