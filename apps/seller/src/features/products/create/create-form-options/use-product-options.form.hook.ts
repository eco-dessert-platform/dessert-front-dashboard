import { useFormContext } from 'react-hook-form'

//import { CreateFormType } from '@/entity/products/create/create-form'
// CreateProductForm -> CreateFormType변경 예정입니다.
import { SUB_CATEGORY_MAP } from './create-form-options.constant'
import { ProductOptionsType } from './create-form-options.type'
import { productOptionSchema } from './create-options.schema'
import { createOptionsValidator } from './create-options-validator.utils'
import { useFloatInput } from '../create-calculation/create-form-float-input.hook'
import { useNumberInput } from '../create-calculation/create-form-number-input.hook'
import { CreateProductForm } from '../create-form/product-create.types'

export function useProductOptionForm(
  index: number,
  basePrice: number | null = null,
) {
  const form = useFormContext<CreateProductForm>()
  const p = `options.${index}` as const
  const optionValues = form.watch(p)
  const mainCategory = optionValues?.mainCategory
  const subCategory = optionValues?.subCategory
  const optionName = optionValues?.optionName ?? ''
  const additionalPrice = optionValues?.additionalPrice ?? null
  const stockQuantity = optionValues?.stockQuantity ?? null
  const shippingDays = optionValues?.shippingDays ?? []
  const hasNutrition = optionValues?.hasNutrition ?? true
  const ingredientCategories = optionValues?.ingredientCategories ?? []
  const totalWeight = optionValues?.totalWeight ?? null
  const servingSize = optionValues?.servingSize ?? null
  const carbohydrate = optionValues?.carbohydrate ?? null
  const sugar = optionValues?.sugar ?? null
  const protein = optionValues?.protein ?? null
  const fat = optionValues?.fat ?? null
  const calories = optionValues?.calories ?? null

  const subCategoryOptions = mainCategory
    ? (SUB_CATEGORY_MAP[mainCategory] ?? [])
    : []

  const totalPrice =
    basePrice !== null && additionalPrice !== null
      ? basePrice + additionalPrice
      : null

  const handleMainCategoryChange = (val: string) => {
    form.setValue(
      `${p}.mainCategory`,
      val as ProductOptionsType['mainCategory'],
      {
        shouldValidate: true,
      },
    )
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
  const servingSizeInput = useFloatInput(servingSize, (val) => {
    form.setValue(`${p}.servingSize`, val, { shouldValidate: true })
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

  const nutritionInputs: Record<
    keyof Pick<
      ProductOptionsType,
      | 'totalWeight'
      | 'calories'
      | 'carbohydrate'
      | 'sugar'
      | 'protein'
      | 'fat'
      | 'servingSize'
    >,
    {
      displayValue: string
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
      handleNull: () => void
    }
  > = {
    totalWeight: totalWeightInput,
    servingSize: servingSizeInput,
    carbohydrate: carbohydrateInput,
    sugar: sugarInput,
    protein: proteinInput,
    fat: fatInput,
    calories: caloriesInput,
  }

  const errors = form.formState.errors.options?.[index]
  const isFormField = createOptionsValidator(optionValues)

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
