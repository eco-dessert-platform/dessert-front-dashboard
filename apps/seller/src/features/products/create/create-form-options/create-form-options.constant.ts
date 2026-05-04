export const MAIN_CATEGORY_OPTIONS = [
  { label: '빵', value: 'bread' },
  { label: '과자/간식', value: 'snack' },
]

export const SUB_CATEGORY_MAP = {
  '': [],
  bread: [
    { label: '식빵·모닝빵', value: 'bread_white' },
    { label: '베이글·도넛', value: 'bread_bagel' },
    { label: '케이크', value: 'bread_cake' },
    { label: '기타', value: 'bread_etc' },
  ],
  snack: [
    { label: '잼·청', value: 'snack_jam' },
    { label: '쿠키·비스킷·크래커', value: 'snack_cookie' },
    { label: '그래놀라', value: 'snack_granola' },
    { label: '기타', value: 'snack_etc' },
  ],
}

export const NUTRITION_FIELDS = [
  { key: 'totalWeight', label: '총 중량(g)' },
  { key: 'servingSize', label: '1회 제공량(g)' },
  { key: 'carbohydrate', label: '탄수화물(g)' },
  { key: 'sugar', label: '당류(g)' },
  { key: 'protein', label: '단백질(g)' },
  { key: 'fat', label: '지방(g)' },
  { key: 'calories', label: '칼로리(kcal)' },
] as const

export type NutritionFieldKey = (typeof NUTRITION_FIELDS)[number]['key']

export const SHIPPING_DAYS = [
  { label: '월', value: 'mon' },
  { label: '화', value: 'tue' },
  { label: '수', value: 'wed' },
  { label: '목', value: 'thu' },
  { label: '금', value: 'fri' },
  { label: '토', value: 'sat' },
  { label: '일', value: 'sun' },
]
