import { useFormContext } from 'react-hook-form'

import { ProductOptionFormInput } from '@/entity/products/create/create-form/product-form.type'
import { SUB_CATEGORY_MAP } from '@/entity/products/create/create-options/product-options.constant'
import { CreateProductForm } from '@/pages/products/create/create-form'

import { useFloatInput } from '../create-calculation/create-form-float-input.hook'
import { useNumberInput } from '../create-calculation/create-form-number-input.hook'

export function useProductOptionForm(basePrice: number | null = null) {
  const form = useFormContext<CreateProductForm>()

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

  const additionalPriceInput = useNumberInput(
    additionalPrice,
    (val) => {
      form.setValue('additionalPrice', val, { shouldValidate: true })
    },
    { allowNegative: true },
  )
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
