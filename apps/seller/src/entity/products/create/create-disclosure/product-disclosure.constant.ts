export const DISCLOSURE_FIELDS = [
  { label: '1. 제품명', key: 'productName' },
  { label: '2. 식품의 유형', key: 'foodType' },
  { label: '3. 생산자', key: 'manufacturer' },
  { label: '4. 소재지', key: 'originLocation' },
  { label: '5. 제조년월일', key: 'manufactureDate' },
  { label: '6. 소비기한 또는 품질 유지기한', key: 'expirationDate' },
  { label: '7. 포장 단위 별 내용물 용량(중량) 수량', key: 'packagingContents' },
  { label: '8. 포장 단위별 수량', key: 'packagingQuantityUnit' },
  {
    label: '9. 원재료명 (농수산물의 원산지 표시 등에 관한 법률)',
    key: 'rawMaterialName',
  },
  { label: '10. 영양성분', key: 'nutritionInfo' },
  { label: '11. 유전자 변형 식품에 해당하는 경우의 표시', key: 'transgenic' },
  { label: '12. 소비자 안전을 위한 주의사항', key: 'customerWarning' },
  { label: '13. 수입 식품의 경우', key: 'importFood' },
] as const

export const RADIO_OPTIONS = [
  { label: '기본 값', value: 'default' },
  { label: '직접 입력', value: 'manual' },
] as const

export type ProductInfoNoticeKey = (typeof DISCLOSURE_FIELDS)[number]['key']
