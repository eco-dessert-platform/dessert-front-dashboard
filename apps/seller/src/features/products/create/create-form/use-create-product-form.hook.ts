import { zodResolver } from '@hookform/resolvers/zod'
import { Resolver, useForm } from 'react-hook-form'

import { DISCLOSURE_FIELDS } from '../create-form-disclosure'
import { ProductOptionsType } from '../create-form-options'
import { CreateFormType, createProductSchema } from './product-create.types'
export const DEFAULT_PRODUCT_OPTION: ProductOptionsType = {
  mainCategory: '',
  subCategory: '',
  optionName: '',
  ingredientCategories: ['glutenFree'],
  additionalPrice: null,
  stockQuantity: null,
  shippingDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
  hasNutrition: true,
  totalWeight: null,
  servingSize: null,
  carbohydrate: null,
  sugar: null,
  protein: null,
  fat: null,
  calories: null,
}

export const useCreateProductForm = () => {
  return useForm<CreateFormType>({
    resolver: zodResolver(createProductSchema) as Resolver<CreateFormType>,
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

      options: [DEFAULT_PRODUCT_OPTION] as unknown as CreateFormType['options'],

      productInfoNotice: DISCLOSURE_FIELDS.reduce(
        (acc, field) => ({
          ...acc,
          [field.key]: '',
        }),
        {} as CreateFormType['productInfoNotice'],
      ),
      productInfoNoticeMode: DISCLOSURE_FIELDS.reduce(
        (acc, field) => ({
          ...acc,
          [field.key]: 'default',
        }),
        {} as CreateFormType['productInfoNoticeMode'],
      ),
    },
    mode: 'onChange',
  })
}
