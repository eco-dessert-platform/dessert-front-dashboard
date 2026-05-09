import { Product } from './upload-approval.type'

import type { UploadApproval } from './upload-approval.type'

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

export const getProductMockData = (page: number, size: number) => {
  const safePage = Math.max(1, page)
  const safeSize = Math.max(1, size)
  const start = (safePage - 1) * safeSize
  const end = start + safeSize
  return {
    data: ALL_MOCK_DATA.slice(start, end),
    totalCount: ALL_MOCK_DATA.length,
  }
}

const UPLOAD_APPROVAL_MOCK_DATA: UploadApproval[] = [
  { boardId: 1, storeName: '그린베이커리', boardTitle: '비건 통밀 식빵' },
  { boardId: 2, storeName: '달빛빵집', boardTitle: '저당 스콘 세트' },
  { boardId: 3, storeName: '디저트팩토리', boardTitle: '글루텐프리 쿠키' },
  { boardId: 4, storeName: '오븐브라더스', boardTitle: '고단백 케이크' },
  { boardId: 5, storeName: '슈가플래닛', boardTitle: '저지방 타르트' },
  { boardId: 6, storeName: '그린베이커리', boardTitle: '비건 휘낭시에' },
  { boardId: 7, storeName: '달빛빵집', boardTitle: '저당 마들렌' },
  { boardId: 8, storeName: '디저트팩토리', boardTitle: '글루텐프리 까눌레' },
  { boardId: 9, storeName: '오븐브라더스', boardTitle: '고단백 파운드케이크' },
  { boardId: 10, storeName: '슈가플래닛', boardTitle: '저지방 스콘 모둠' },
  { boardId: 11, storeName: '그린베이커리', boardTitle: '비건 쿠키 박스' },
  { boardId: 12, storeName: '달빛빵집', boardTitle: '저당 케이크 조각' },
  { boardId: 13, storeName: '디저트팩토리', boardTitle: '글루텐프리 타르트' },
  { boardId: 14, storeName: '오븐브라더스', boardTitle: '고단백 식빵 2종' },
  { boardId: 15, storeName: '슈가플래닛', boardTitle: '저지방 마들렌 세트' },
  { boardId: 16, storeName: '그린베이커리', boardTitle: '비건 까눌레 6개입' },
  { boardId: 17, storeName: '달빛빵집', boardTitle: '저당 파운드케이크' },
  { boardId: 18, storeName: '디저트팩토리', boardTitle: '글루텐프리 휘낭시에' },
  { boardId: 19, storeName: '오븐브라더스', boardTitle: '고단백 쿠키 모둠' },
  { boardId: 20, storeName: '슈가플래닛', boardTitle: '저지방 케이크 롤' },
  { boardId: 21, storeName: '그린베이커리', boardTitle: '비건 단팥빵' },
  { boardId: 22, storeName: '달빛빵집', boardTitle: '저당 크로와상' },
  { boardId: 23, storeName: '디저트팩토리', boardTitle: '글루텐프리 베이글' },
  { boardId: 24, storeName: '오븐브라더스', boardTitle: '고단백 브라우니' },
  { boardId: 25, storeName: '슈가플래닛', boardTitle: '저지방 머핀 세트' },
  { boardId: 26, storeName: '그린베이커리', boardTitle: '비건 바나나 브레드' },
  { boardId: 27, storeName: '달빛빵집', boardTitle: '저당 레몬 타르트' },
  {
    boardId: 28,
    storeName: '디저트팩토리',
    boardTitle: '글루텐프리 초코 쿠키',
  },
  { boardId: 29, storeName: '오븐브라더스', boardTitle: '고단백 그래놀라 바' },
  { boardId: 30, storeName: '슈가플래닛', boardTitle: '저지방 딸기 케이크' },
  { boardId: 31, storeName: '그린베이커리', boardTitle: '비건 호두 파운드' },
  { boardId: 32, storeName: '달빛빵집', boardTitle: '저당 말차 휘낭시에' },
  {
    boardId: 33,
    storeName: '디저트팩토리',
    boardTitle: '글루텐프리 아몬드 스콘',
  },
  { boardId: 34, storeName: '오븐브라더스', boardTitle: '고단백 단호박 식빵' },
  { boardId: 35, storeName: '슈가플래닛', boardTitle: '저지방 블루베리 머핀' },
  { boardId: 36, storeName: '그린베이커리', boardTitle: '비건 코코넛 마카롱' },
  { boardId: 37, storeName: '달빛빵집', boardTitle: '저당 얼그레이 케이크' },
  {
    boardId: 38,
    storeName: '디저트팩토리',
    boardTitle: '글루텐프리 오트밀 쿠키',
  },
  { boardId: 39, storeName: '오븐브라더스', boardTitle: '고단백 치즈 베이글' },
  { boardId: 40, storeName: '슈가플래닛', boardTitle: '저지방 복숭아 타르트' },
  { boardId: 41, storeName: '그린베이커리', boardTitle: '비건 흑임자 마들렌' },
  { boardId: 42, storeName: '달빛빵집', boardTitle: '저당 팥 도넛' },
  { boardId: 43, storeName: '디저트팩토리', boardTitle: '글루텐프리 카스텔라' },
  {
    boardId: 44,
    storeName: '오븐브라더스',
    boardTitle: '고단백 두부 브라우니',
  },
  { boardId: 45, storeName: '슈가플래닛', boardTitle: '저지방 요거트 케이크' },
  { boardId: 46, storeName: '그린베이커리', boardTitle: '비건 쑥 인절미 롤' },
  { boardId: 47, storeName: '달빛빵집', boardTitle: '저당 자몽 치즈케이크' },
  {
    boardId: 48,
    storeName: '디저트팩토리',
    boardTitle: '글루텐프리 퀴노아 크래커',
  },
  { boardId: 49, storeName: '오븐브라더스', boardTitle: '고단백 에그 타르트' },
  {
    boardId: 50,
    storeName: '슈가플래닛',
    boardTitle: '저지방 망고 무스케이크',
  },
]

export const getUploadApprovalMockData = (page: number, size: number) => {
  const safePage = Math.max(0, page)
  const safeSize = Math.max(1, size)
  const start = safePage * safeSize
  const end = start + safeSize
  return {
    content: UPLOAD_APPROVAL_MOCK_DATA.slice(start, end),
    page: safePage,
    size: safeSize,
    totalElements: UPLOAD_APPROVAL_MOCK_DATA.length,
    totalPages: Math.ceil(UPLOAD_APPROVAL_MOCK_DATA.length / safeSize),
  }
}
