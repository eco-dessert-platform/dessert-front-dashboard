// create-page의 스크롤 감지와 store의 scrollToStep이 공유하는 단계별 DOM id 목록.
// 순서/값이 어긋나면 클릭 이동과 active 계산이 달라지므로 단일 출처로 관리합니다.
export const CREATE_FORM_STEP_IDS = [
  'productInfo',
  'productDelivery',
  'productThumbnail',
  'productOptions',
  'productDetail',
  'productDisclosure',
] as const
