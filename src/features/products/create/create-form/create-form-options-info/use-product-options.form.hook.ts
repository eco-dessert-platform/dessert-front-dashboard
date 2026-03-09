import { useForm, Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNumberInput } from '../create-form-number-input.hook'
import { useFloatInput } from '../create-form-float-input.hook'
import { SUB_CATEGORY_MAP } from '@/entity/products/create/product-options/product-options.constant'

type ProductOptionFormInput = {
  mainCategory: string
  subCategory: string
  optionName: string
  ingredientCategories: ('glutenFree' | 'vegan')[]
  additionalPrice: number | null
  stockQuantity: number | null
  shippingDays: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[]
  hasNutrition: boolean
  totalWeight: number | null
  calories: number | null
  carbohydrate: number | null
  sugar: number | null
  protein: number | null
  fat: number | null
  sodium: number | null
}

const productOptionSchema = z
  .object({
    mainCategory: z.string(),
    subCategory: z.string(),
    optionName: z.string(),
    ingredientCategories: z.array(z.enum(['glutenFree', 'vegan'])),
    additionalPrice: z.union([
      z
        .number({ error: '올바른 가격을 입력해주세요' })
        .min(-100000, '올바른 가격을 입력해주세요')
        .max(100000, '올바른 가격을 입력해주세요'),
      z.null(),
    ]),
    stockQuantity: z.union([z.number().int().min(0), z.null()]),
    shippingDays: z.array(
      z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']),
    ),
    hasNutrition: z.boolean(),
    totalWeight: z.union([z.number().min(0), z.null()]),
    calories: z.union([z.number().min(0), z.null()]),
    carbohydrate: z.union([z.number().min(0), z.null()]),
    sugar: z.union([z.number().min(0), z.null()]),
    protein: z.union([z.number().min(0), z.null()]),
    fat: z.union([z.number().min(0), z.null()]),
    sodium: z.union([z.number().min(0), z.null()]),
  })
  .refine(
    (data) =>
      data.optionName === '' ||
      (data.optionName.length >= 3 && data.optionName.length <= 49),
    { message: '3자 이상 50자 미만으로 입력해 주세요', path: ['optionName'] },
  )
  .refine((data) => data.additionalPrice !== null, {
    message: '',
    path: ['additionalPrice'],
  })

export function useProductOptionForm(basePrice: number | null = null) {
  const form = useForm<ProductOptionFormInput>({
    resolver: zodResolver(
      productOptionSchema,
    ) as Resolver<ProductOptionFormInput>,
    defaultValues: {
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

  const mainCategory = form.watch('mainCategory')
  const subCategory = form.watch('subCategory')
  const optionName = form.watch('optionName')
  const additionalPrice = form.watch('additionalPrice')
  const stockQuantity = form.watch('stockQuantity')
  const shippingDays = form.watch('shippingDays')
  const hasNutrition = form.watch('hasNutrition')
  const ingredientCategories = form.watch('ingredientCategories')
  const nutritionValues = form.watch([
    'totalWeight',
    'calories',
    'carbohydrate',
    'sugar',
    'protein',
    'fat',
    'sodium',
  ])

  const subCategoryOptions =
    mainCategory !== ''
      ? (SUB_CATEGORY_MAP[mainCategory as keyof typeof SUB_CATEGORY_MAP] ?? [])
      : []

  const totalPrice =
    basePrice !== null && additionalPrice !== null
      ? basePrice + additionalPrice
      : null

  const handleMainCategoryChange = (val: string) => {
    form.setValue('mainCategory', val, { shouldValidate: true })
    form.setValue('subCategory', '', { shouldValidate: false })
  }

  type Day = ProductOptionFormInput['shippingDays'][number]

  const toggleShippingDay = (days: string[]) => {
    form.setValue('shippingDays', days as Day[], { shouldValidate: true })
  }

  const toggleIngredient = (ingredient: 'glutenFree' | 'vegan') => {
    const next = ingredientCategories.includes(ingredient)
      ? ingredientCategories.filter((i) => i !== ingredient)
      : [...ingredientCategories, ingredient]
    form.setValue('ingredientCategories', next, { shouldValidate: true })
  }

  const additionalPriceInput = useNumberInput(additionalPrice, (val) => {
    form.setValue('additionalPrice', val, { shouldValidate: true })
  })
  const stockInput = useNumberInput(stockQuantity, (val) => {
    form.setValue('stockQuantity', val, { shouldValidate: true })
  })

  const totalWeightInput = useFloatInput(form.watch('totalWeight'), (val) => {
    form.setValue('totalWeight', val, { shouldValidate: true })
  })
  const caloriesInput = useFloatInput(form.watch('calories'), (val) => {
    form.setValue('calories', val, { shouldValidate: true })
  })
  const carbohydrateInput = useFloatInput(form.watch('carbohydrate'), (val) => {
    form.setValue('carbohydrate', val, { shouldValidate: true })
  })
  const sugarInput = useFloatInput(form.watch('sugar'), (val) => {
    form.setValue('sugar', val, { shouldValidate: true })
  })
  const proteinInput = useFloatInput(form.watch('protein'), (val) => {
    form.setValue('protein', val, { shouldValidate: true })
  })
  const fatInput = useFloatInput(form.watch('fat'), (val) => {
    form.setValue('fat', val, { shouldValidate: true })
  })
  const sodiumInput = useFloatInput(form.watch('sodium'), (val) => {
    form.setValue('sodium', val, { shouldValidate: true })
  })

  const nutritionInputs: Record<
    keyof Pick<
      ProductOptionFormInput,
      | 'totalWeight'
      | 'calories'
      | 'carbohydrate'
      | 'sugar'
      | 'protein'
      | 'fat'
      | 'sodium'
    >,
    {
      displayValue: string
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
      handleNull: () => void
    }
  > = {
    totalWeight: totalWeightInput,
    calories: caloriesInput,
    carbohydrate: carbohydrateInput,
    sugar: sugarInput,
    protein: proteinInput,
    fat: fatInput,
    sodium: sodiumInput,
  }

  const isNutritionValid =
    !hasNutrition || nutritionValues.every((val) => val !== null)

  const isFormField =
    mainCategory !== '' &&
    subCategory !== '' &&
    optionName.length >= 3 &&
    optionName.length <= 49 &&
    ingredientCategories.length > 0 &&
    additionalPrice !== null &&
    stockQuantity !== null &&
    isNutritionValid &&
    shippingDays.length >= 1 &&
    Object.keys(form.formState.errors).length === 0

  return {
    form,
    mainCategory,
    subCategory,
    subCategoryOptions,
    optionName,
    additionalPrice,
    stockQuantity,
    shippingDays,
    hasNutrition,
    ingredientCategories,
    totalPrice,
    isFormField,
    handleMainCategoryChange,
    toggleShippingDay,
    toggleIngredient,
    nutritionInputs,
    additionalPriceInput,
    stockInput,
  }
}
