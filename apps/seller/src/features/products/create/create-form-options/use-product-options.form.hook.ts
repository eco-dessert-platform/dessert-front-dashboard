import { useFormContext } from 'react-hook-form'

//import { CreateFormType } from '@/entity/products/create/create-form'

import { SUB_CATEGORY_MAP } from '@/entity/products/create/create-options/product-options.constant'

import { ProductOptionsType } from './create-form-options.type'
import { productOptionSchema } from './create-options.schema'
import { useFloatInput } from '../create-calculation/create-form-float-input.hook'
import { useNumberInput } from '../create-calculation/create-form-number-input.hook'
import { CreateProductForm } from '../create-form/product-create.types'
export function useProductOptionForm(
  index: number,
  basePrice: number | null = null,
) {
  const form = useFormContext<CreateProductForm>()
  const p = `options.${index}` as const
  const mainCategory = form.watch(`${p}.mainCategory`)
  const subCategory = form.watch(`${p}.subCategory`)
  const optionName = form.watch(`${p}.optionName`)
  const additionalPrice = form.watch(`${p}.additionalPrice`)
  const stockQuantity = form.watch(`${p}.stockQuantity`)
  const shippingDays = form.watch(`${p}.shippingDays`)
  const hasNutrition = form.watch(`${p}.hasNutrition`)
  const ingredientCategories = form.watch(`${p}.ingredientCategories`)
  const nutritionValues = form.watch([
    `${p}.totalWeight`,
    `${p}.calories`,
    `${p}.carbohydrate`,
    `${p}.sugar`,
    `${p}.protein`,
    `${p}.fat`,
    `${p}.sodium`,
  ])

  const [totalWeight, calories, carbohydrate, sugar, protein, fat, sodium] =
    nutritionValues

  const subCategoryOptions = mainCategory
    ? (SUB_CATEGORY_MAP[mainCategory] ?? [])
    : []

  const totalPrice =
    basePrice !== null && additionalPrice !== null
      ? basePrice + additionalPrice
      : null

  const handleMainCategoryChange = (val: string) => {
    form.setValue(`${p}.mainCategory`, val as 'bread' | 'snack', {
      shouldValidate: true,
    })
    form.setValue(`${p}.subCategory`, '', { shouldValidate: false })
  }

  type Day = ProductOptionsType['shippingDays'][number]

  const toggleShippingDay = (days: string[]) => {
    const validDays = days.filter(
      (day): day is Day =>
        productOptionSchema.shape.shippingDays.element.safeParse(day).success,
    )
    form.setValue(`${p}.shippingDays`, validDays, { shouldValidate: true })
  }

  const toggleIngredient = (ingredient: 'glutenFree' | 'vegan') => {
    const next = ingredientCategories.includes(ingredient)
      ? ingredientCategories.filter((i) => i !== ingredient)
      : [...ingredientCategories, ingredient]
    form.setValue(`${p}.ingredientCategories`, next, { shouldValidate: true })
  }

  const additionalPriceInput = useNumberInput(
    additionalPrice,
    (val) => {
      form.setValue(`${p}.additionalPrice`, val, { shouldValidate: true })
    },
    { allowNegative: true },
  )
  const stockInput = useNumberInput(stockQuantity, (val) => {
    form.setValue(`${p}.stockQuantity`, val, { shouldValidate: true })
  })

  const totalWeightInput = useFloatInput(totalWeight, (val) => {
    form.setValue(`${p}.totalWeight`, val, { shouldValidate: true })
  })
  const caloriesInput = useFloatInput(calories, (val) => {
    form.setValue(`${p}.calories`, val, { shouldValidate: true })
  })
  const carbohydrateInput = useFloatInput(carbohydrate, (val) => {
    form.setValue(`${p}.carbohydrate`, val, { shouldValidate: true })
  })
  const sugarInput = useFloatInput(sugar, (val) => {
    form.setValue(`${p}.sugar`, val, { shouldValidate: true })
  })
  const proteinInput = useFloatInput(protein, (val) => {
    form.setValue(`${p}.protein`, val, { shouldValidate: true })
  })
  const fatInput = useFloatInput(fat, (val) => {
    form.setValue(`${p}.fat`, val, { shouldValidate: true })
  })
  const sodiumInput = useFloatInput(sodium, (val) => {
    form.setValue(`${p}.sodium`, val, { shouldValidate: true })
  })

  const nutritionInputs: Record<
    keyof Pick<
      ProductOptionsType,
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

  const errors = form.formState.errors.options?.[index]
  const hasOptionErrors = Object.keys(errors ?? {}).length > 0

  const isFormField =
    !!mainCategory &&
    subCategory !== '' &&
    optionName.length >= 3 &&
    optionName.length <= 49 &&
    ingredientCategories.length > 0 &&
    additionalPrice !== null &&
    stockQuantity !== null &&
    isNutritionValid &&
    shippingDays.length >= 1 &&
    !hasOptionErrors

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
    errors,
  }
}
