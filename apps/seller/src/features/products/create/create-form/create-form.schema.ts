import z from 'zod'

import { deliverySchema } from '../create-form-delivery'
import { disclosureSchema } from '../create-form-disclosure'
import { productSchema } from '../create-form-info'
import { productOptionSchema } from '../create-form-options'
import { thumbnailSchema } from '../create-form-thumbnail-upload'

export const CreateFormSchema = productSchema
  .and(deliverySchema)
  .and(z.object({ options: z.array(productOptionSchema).min(1) }))
  .and(disclosureSchema)
  .and(thumbnailSchema)
