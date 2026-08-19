import { zodResolver } from '@hookform/resolvers/zod'
import { Resolver, useForm } from 'react-hook-form'

import { DISCLOSURE_FIELDS } from '@/entity/products'

import { ProductOptionsType } from '../create-form-options'
import { CreateFormEntryMode } from './create-funnel-navigation.utils'
import { getSessionFormDefaults } from './create-form-session.utils'
import { CreateProductForm, createProductSchema } from './product-create.types'

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

export const CREATE_PRODUCT_DEFAULT_VALUES: CreateProductForm = {
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
  mainImage: null,
  extraImages: [],

  options: [DEFAULT_PRODUCT_OPTION] as unknown as CreateProductForm['options'],

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
}

export const useCreateProductForm = (entryMode: CreateFormEntryMode) => {
  const sessionDefaults =
    entryMode === 'restore' ? getSessionFormDefaults() : undefined

  return useForm<CreateProductForm>({
    resolver: zodResolver(createProductSchema) as Resolver<CreateProductForm>,
    defaultValues: {
      ...CREATE_PRODUCT_DEFAULT_VALUES,
      ...sessionDefaults,
    },
    mode: 'onChange',
  })
}
