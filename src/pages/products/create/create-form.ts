import { useForm, Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ProductFormInput,
  DeliveryFormInput,
  ProductOptionFormInput,
} from '@/entity/products/create/product-form.type'
import { productSchema } from '@/features/products/create/create-form/craete-form-info/create-info.schema'
import { deliverySchema } from '@/features/products/create/create-form/create-form-delivery/create-delivery.schema'
import { productOptionSchema } from '@/features/products/create/create-form/create-form-options-info/create-options.schema'

export type CreateProductForm = ProductFormInput &
  DeliveryFormInput &
  ProductOptionFormInput

const createProductSchema = productSchema
  .and(deliverySchema)
  .and(productOptionSchema)

console.log(createProductSchema)

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
