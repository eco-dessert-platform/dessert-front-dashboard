/**
 * 프론트 카테고리 값 → 백엔드 Category Enum 매핑
 *
 * 명시 규칙:
 * - bread_white → BREAD
 * - bread_bagel → BAGEL
 * - bread_cake → CAKE
 * - snack_cookie → COOKIE
 * - snack_granola → GRANOLA
 * - 그 외(BAGEL, TART, JAM, SNACK, ICE_CREAM, YOGURT, ETC 등)는 대문자 변환
 */
const CATEGORY_ENUM_MAP: Record<string, string> = {
  bread_white: 'BREAD',
  bread_bagel: 'BAGEL',
  bread_cake: 'CAKE',
  bread_etc: 'ETC',
  snack_cookie: 'COOKIE',
  snack_granola: 'GRANOLA',
  snack_jam: 'JAM',
  snack_etc: 'ETC',
}

export function mapToBackendCategory(category: string): string {
  const normalized = category.trim()
  if (!normalized) return 'ETC'

  return CATEGORY_ENUM_MAP[normalized] ?? normalized.toUpperCase()
}
