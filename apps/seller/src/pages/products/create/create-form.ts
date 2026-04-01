import { zodResolver } from '@hookform/resolvers/zod'
import { Resolver, useForm } from 'react-hook-form'

import {
  DeliveryFormInput,
  ProductFormInput,
  ProductOptionFormInput,
} from '@/entity/products/create/create-form/product-form.type'
import { deliverySchema } from '@/features/products/create/create-form-delivery/create-delivery.schema'
import { productSchema } from '@/features/products/create/create-form-info/create-info.schema'
import { productOptionSchema } from '@/features/products/create/create-form-options/create-options.schema'

export type CreateProductForm = ProductFormInput &
  DeliveryFormInput &
  ProductOptionFormInput

const createProductSchema = productSchema
  .and(deliverySchema)
  .and(productOptionSchema)

export const useCreateProductForm = () => {
  return useForm<CreateProductForm>({
    resolver: zodResolver(createProductSchema) as Resolver<CreateProductForm>,
    defaultValues: {
      productName: '',
      isFresh: true,
      productionTime: '',
      price: null,
      discountAmount: null,
      discountType: 'won',

      deliveryTerms: '',
      deliveryCompany: '',
      deliveryFee: null,
      deliveryMinFee: null,

      mainCategory: '',
      subCategory: '',
      optionName: '',
      ingredientCategories: ['glutenFree'],
      additionalPrice: null,
      stockQuantity: null,
      shippingDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      hasNutrition: true,
      totalWeight: null,
      calories: null,
      carbohydrate: null,
      sugar: null,
      protein: null,
      fat: null,
      sodium: null,
    },
    mode: 'onChange',
  })
}
