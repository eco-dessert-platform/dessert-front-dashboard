import type { AdminProduct } from './management-all.type'

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

const generateMockData = (count: number): AdminProduct[] => {
  return Array.from({ length: count }).map((_, i) => {
    const storeName = STORES[i % STORES.length]
    const productName = `${TAGS[i % TAGS.length]} ${BASES[(i * 3) % BASES.length]}`

    const optionCount = (i % 3) + 1
    const productOptions = Array.from({ length: optionCount }).map((_, j) => {
      const optionTags = [TAGS[(i + j) % TAGS.length]]
      if (j % 2 === 0) {
        const nextTag = TAGS[(i + j + 2) % TAGS.length]
        if (!optionTags.includes(nextTag)) optionTags.push(nextTag)
      }

      const priceOffset = j * 500
      const optionPrice = j === 0 ? 0 : priceOffset

      return {
        optionId: 20000 + i * 10 + j,
        optionName: j === 0 ? '기본' : `추가옵션 ${j}`,
        price: optionPrice,
        stock: i % 4 === 0 && j === 0 ? 0 : 50 + ((i * 7 + j * 3) % 100),
        tags: optionTags,
      }
    })

    return {
      productId: 1000 + i,
      storeId: 100 + (i % STORES.length),
      storeName,
      productName,
      productPrice: 3000 + ((i * 300) % 9000),
      productOptions,
    }
  })
}

const ALL_MOCK_DATA = generateMockData(52)

export const getAdminProductMockData = (page: number, size: number) => {
  const safePage = Math.max(1, page)
  const safeSize = Math.max(1, size)
  const start = (safePage - 1) * safeSize
  const end = start + safeSize
  return {
    content: ALL_MOCK_DATA.slice(start, end),
    page: safePage,
    size: safeSize,
    totalElements: ALL_MOCK_DATA.length,
    totalPages: Math.ceil(ALL_MOCK_DATA.length / safeSize),
  }
}
