import { useForm, Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import {
  ProductFormInput,
  DeliveryFormInput,
  ProductOptionFormInput,
} from '@/entity/products/create/product-form.type'
import { productSchema } from '@/features/products/create/create-form/craete-form-info/create-info.schema'
import { deliverySchema } from '@/features/products/create/create-form/create-form-delivery/create-delivery.schema'
import { productOptionSchema } from '@/features/products/create/create-form/create-form-options-info/create-options.schema'

type CreateProductForm = ProductFormInput &
  DeliveryFormInput &
  ProductOptionFormInput

const createProductSchema = z.object({
  ...productSchema.shape,
  ...deliverySchema.shape,
  ...productOptionSchema.shape,
})
export const useForms = () => {
  const form = useForm<CreateProductForm>({
    resolver: zodResolver(createProductSchema) as Resolver<CreateProductForm>,
    mode: 'onChange',
  })
}
