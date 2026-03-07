import { Product } from './product.type'

const STORES = [
  '그린베이커리',
  '달빛빵집',
  '디저트팩토리',
  '오븐브라더스',
  '슈가플래닛',
]
const BASES = [
  '통밀 식빵',
  '스콘',
  '쿠키',
  '케이크',
  '타르트',
  '휘낭시에',
  '마들렌',
  '까눌레',
  '파운드',
]
const TAGS = ['비건', '저지방', '글루텐프리', '저당', '고단백']

const generateMockData = (count: number): Product[] => {
  return Array.from({ length: count }).map((_, i) => {
    const storeName = STORES[i % STORES.length]
    // 상품명은 태그와 베이스를 조합하여 생성
    const productName = `${TAGS[i % TAGS.length]} ${BASES[(i * 3) % BASES.length]}`

    // 옵션 개수는 상품당 1~3개
    const optionCount = (i % 3) + 1
    const productOptions = Array.from({ length: optionCount }).map((_, j) => {
      // 옵션마다 태그 1~2개
      const optionTags = [TAGS[(i + j) % TAGS.length]]
      if (j % 2 === 0) {
        const nextTag = TAGS[(i + j + 2) % TAGS.length]
        if (!optionTags.includes(nextTag)) optionTags.push(nextTag)
      }

      const priceOffset = j * 500
      // 0원 옵션이 있어야 기본 가격이 되므로 j === 0은 0
      const optionPrice = j === 0 ? 0 : priceOffset

      return {
        optionId: 20000 + i * 10 + j,
        optionName: j === 0 ? '기본' : `추가옵션 ${j}`,
        price: optionPrice,
        // 품절 상태를 만들기 위해 특정 로직으로 0 재고 설정 (ex: i가 4의 배수이고 j가 첫 옵션일 때 품절)
        stock: i % 4 === 0 && j === 0 ? 0 : 50 + ((i * 7 + j * 3) % 100),
        tags: optionTags,
      }
    })

    return {
      productId: 1000 + i,
      storeName,
      productName,
      // 3000원 ~ 12000원 사이
      productPrice: 3000 + ((i * 300) % 9000),
      productOptions,
    }
  })
}

// 52개의 충분한 임시 데이터를 생성
const ALL_MOCK_DATA = generateMockData(52)

// 이전 구현을 위해 임시로 유지
export const PRODUCT_MOCK_DATA = ALL_MOCK_DATA.slice(0, 5)

export const getProductMockData = (page: number, size: number) => {
  const start = (page - 1) * size
  const end = start + size
  return {
    data: ALL_MOCK_DATA.slice(start, end),
    totalCount: ALL_MOCK_DATA.length,
  }
}
