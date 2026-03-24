export const NUTRITION_FIELDS = [
  { key: 'totalWeight', label: '총 중량(g)' },
  { key: 'calories', label: '열량(kcal)' },
  { key: 'carbohydrate', label: '탄수화물(g)' },
  { key: 'sugar', label: '당류(g)' },
  { key: 'protein', label: '단백질(g)' },
  { key: 'fat', label: '지방(g)' },
  { key: 'sodium', label: '나트륨(mg)' },
] as const

export type NutritionFieldKey = (typeof NUTRITION_FIELDS)[number]['key']
