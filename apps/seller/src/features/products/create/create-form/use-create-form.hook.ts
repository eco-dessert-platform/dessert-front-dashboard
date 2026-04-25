import { zodResolver } from '@hookform/resolvers/zod'
import { Resolver, useForm } from 'react-hook-form'

import { DISCLOSURE_FIELDS } from '@/entity/products/create/create-disclosure'
import {
  CreateFormType,
  ProductOptionFormInput,
} from '@/entity/products/create/create-form'

import { CreateFormSchema } from './create-form.schema'

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

export const useCreateForm = () => {
  return useForm<CreateFormType>({
    resolver: zodResolver(CreateFormSchema) as Resolver<CreateFormType>,
    defaultValues: {
      productName: '',
      isFresh: true,
      productionTime: '',
      price: null,
      discountAmount: null,
      discountType: 'AMOUNT',

      deliveryTerms: '',
      deliveryCompany: '',
      deliveryFee: null,
      deliveryMinFee: null,

      mainImage: null,
      extraImages: [],

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
