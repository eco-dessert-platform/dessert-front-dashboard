import { ProductOptionsType } from './create-form-options.type'

export function createOptionsValidator(values: ProductOptionsType): boolean {
  const {
    mainCategory,
    subCategory,
    optionName,
    ingredientCategories,
    additionalPrice,
    stockQuantity,
    shippingDays,
    hasNutrition,
    totalWeight,
    servingSize,
    carbohydrate,
    sugar,
    protein,
    fat,
    calories,
  } = values

  const nutritionValues = [
    totalWeight,
    servingSize,
    carbohydrate,
    sugar,
    protein,
    fat,
    calories,
  ]
  const isNutritionValid =
    !hasNutrition || nutritionValues.every((val) => val != null)

  return (
    !!mainCategory &&
    !!subCategory &&
    optionName.length >= 1 &&
    optionName.length <= 49 &&
    ingredientCategories.length > 0 &&
    additionalPrice != null &&
    stockQuantity != null &&
    isNutritionValid &&
    shippingDays.length >= 1
  )
}
