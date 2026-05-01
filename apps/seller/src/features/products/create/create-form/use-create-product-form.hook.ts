import { zodResolver } from '@hookform/resolvers/zod'
import { Resolver, useForm } from 'react-hook-form'

import { DISCLOSURE_FIELDS, ProductOptionFormInput } from '@/entity/products'

import { CreateProductForm, createProductSchema } from './product-create.types'
export const DEFAULT_PRODUCT_OPTION: ProductOptionFormInput = {
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
}

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

      options: [
        DEFAULT_PRODUCT_OPTION,
      ] as unknown as CreateProductForm['options'],

      productInfoNotice: DISCLOSURE_FIELDS.reduce(
        (acc, field) => ({
          ...acc,
          [field.key]: '',
        }),
        {} as CreateProductForm['productInfoNotice'],
      ),
      productInfoNoticeMode: DISCLOSURE_FIELDS.reduce(
        (acc, field) => ({
          ...acc,
          [field.key]: 'default',
        }),
        {} as CreateProductForm['productInfoNoticeMode'],
      ),
    },
    mode: 'onChange',
  })
}
