import { ProductOptionsType } from './create-form-options.type'

/** 단일 상품 옵션의 필수 입력 완료 여부를 검증합니다. */
export function createOptionsValidator(
  values: ProductOptionsType | null | undefined,
): boolean {
  if (!values) return false

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

  const trimmedName = (optionName ?? '').trim()
  const isOptionNameValid = trimmedName.length >= 1 && trimmedName.length <= 49

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
    isOptionNameValid &&
    (ingredientCategories?.length ?? 0) > 0 &&
    additionalPrice != null &&
    stockQuantity != null &&
    isNutritionValid &&
    (shippingDays?.length ?? 0) >= 1
  )
}

/** 옵션 배열 전체가 필수 입력을 충족했는지 검증합니다. */
export function areAllOptionsValid(
  options: ProductOptionsType[] | null | undefined,
): boolean {
  if (!options || options.length === 0) return false
  return options.every((opt) => createOptionsValidator(opt))
}
