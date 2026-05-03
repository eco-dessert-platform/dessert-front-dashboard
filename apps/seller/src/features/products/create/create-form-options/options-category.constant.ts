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
