import { zodResolver } from '@hookform/resolvers/zod'
import { Resolver, useForm } from 'react-hook-form'

import {
  DeliveryFormInput,
  ProductFormInput,
  ProductOptionFormInput,
  ProductDisclosureFormInput,
} from '@/entity/products'
import {
  deliverySchema,
  disclosureSchema,
  productSchema,
  productOptionSchema,
} from '@/features/products/create'

export type CreateProductForm = ProductFormInput &
  DeliveryFormInput &
  ProductOptionFormInput &
  ProductDisclosureFormInput

const createProductSchema = productSchema
  .and(deliverySchema)
  .and(productOptionSchema)
  .and(disclosureSchema)

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

      productInfoNotice: {
        productName: '',
        foodType: '',
        manufacturer: '',
        originLocation: '',
        manufactureDate: '',
        expirationDate: '',
        storageGuide: '',
        packagingQuantityUnit: '',
        rawMaterialName: '',
        nutritionInfo: '',
        transgenic: '',
        customerWarning: '',
        importFood: '',
      },
      productInfoNoticeMode: {
        productName: 'default',
        foodType: 'default',
        manufacturer: 'default',
        originLocation: 'default',
        manufactureDate: 'default',
        expirationDate: 'default',
        storageGuide: 'default',
        packagingQuantityUnit: 'default',
        rawMaterialName: 'default',
        nutritionInfo: 'default',
        transgenic: 'default',
        customerWarning: 'default',
        importFood: 'default',
      },
    },
    mode: 'onChange',
  })
}
