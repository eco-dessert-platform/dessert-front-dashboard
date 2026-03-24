import {
  OrderItem,
  OrderListResponse,
  OrderStatus,
  OrderStatusTab,
} from './order.type'

// 20개 Mock 주문 데이터
export const MOCK_ORDERS: OrderItem[] = [
  // PAYMENT_COMPLETED (6개)
  {
    recipientName: '홍길동',
    orderNumber: '2503020013',
    products: [
      {
        productName: '노밀가루 프로틴 식빵 식단조절빵',
        optionName: '밤',
        quantity: 1,
        price: 4700,
      },
      {
        productName: '프로틴스콘 노밀가루 노설탕 간식',
        optionName: '카카오커피',
        quantity: 2,
        price: 9800,
      },
      {
        productName: '프로틴스콘 노밀가루 노설탕 간식',
        optionName: '호두베리',
        quantity: 1,
        price: 4900,
      },
    ],
    orderStatus: 'PAYMENT_COMPLETED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-02',
    totalOrderAmount: 29200,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
  },
  {
    recipientName: '김철수',
    orderNumber: '2503010024',
    products: [
      {
        productName: '저당 그래놀라 클러스터 다이어트 간식',
        optionName: null,
        quantity: 3,
        price: 12000,
      },
    ],
    orderStatus: 'PAYMENT_COMPLETED',
    paymentMethod: '간편결제',
    paymentDate: '2025-03-01',
    totalOrderAmount: 36000,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
  },
  {
    recipientName: '이영희',
    orderNumber: '2502280031',
    products: [
      {
        productName: '단백질 쿠키 노밀가루 저당 식단관리',
        optionName: '초코칩',
        quantity: 2,
        price: 8500,
      },
      {
        productName: '단백질 쿠키 노밀가루 저당 식단관리',
        optionName: '땅콩버터',
        quantity: 1,
        price: 8500,
      },
    ],
    orderStatus: 'PAYMENT_COMPLETED',
    paymentMethod: '가상계좌',
    paymentDate: '2025-02-28',
    totalOrderAmount: 25500,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
  },
  {
    recipientName: '박민준',
    orderNumber: '2502270042',
    products: [
      {
        productName: '두부 티라미수 저칼로리 디저트',
        optionName: null,
        quantity: 1,
        price: 15000,
      },
    ],
    orderStatus: 'PAYMENT_COMPLETED',
    paymentMethod: '신용카드',
    paymentDate: '2025-02-27',
    totalOrderAmount: 15000,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
  },
  {
    recipientName: '최수진',
    orderNumber: '2502260055',
    products: [
      {
        productName: '저당 마들렌 식단조절 케이크',
        optionName: '레몬',
        quantity: 2,
        price: 7000,
      },
      {
        productName: '저당 마들렌 식단조절 케이크',
        optionName: '바닐라',
        quantity: 2,
        price: 7000,
      },
    ],
    orderStatus: 'PAYMENT_COMPLETED',
    paymentMethod: '간편결제',
    paymentDate: '2025-02-26',
    totalOrderAmount: 28000,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
  },
  {
    recipientName: '정도윤',
    orderNumber: '2502250066',
    products: [
      {
        productName: '아몬드 비스코티 저당 커피 간식',
        optionName: null,
        quantity: 1,
        price: 9500,
      },
    ],
    orderStatus: 'PAYMENT_COMPLETED',
    paymentMethod: '신용카드',
    paymentDate: '2025-02-25',
    totalOrderAmount: 9500,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
  },

  // ORDER_CONFIRMED (3개)
  {
    recipientName: '강서연',
    orderNumber: '2502240071',
    products: [
      {
        productName: '단백질 파운드케이크 식단조절 베이커리',
        optionName: '플레인',
        quantity: 1,
        price: 18000,
      },
      {
        productName: '단백질 파운드케이크 식단조절 베이커리',
        optionName: '초코',
        quantity: 1,
        price: 18000,
      },
    ],
    orderStatus: 'ORDER_CONFIRMED',
    paymentMethod: '신용카드',
    paymentDate: '2025-02-24',
    totalOrderAmount: 36000,
    deliveryStatus: 'PRODUCT_PREPARING',
    courierName: null,
    trackingNumber: null,
  },
  {
    recipientName: '윤하은',
    orderNumber: '2502230082',
    products: [
      {
        productName: '저당 초콜릿 브라우니 다이어트 간식',
        optionName: null,
        quantity: 2,
        price: 11000,
      },
    ],
    orderStatus: 'ORDER_CONFIRMED',
    paymentMethod: '간편결제',
    paymentDate: '2025-02-23',
    totalOrderAmount: 22000,
    deliveryStatus: 'PRODUCT_PREPARING',
    courierName: null,
    trackingNumber: null,
  },
  {
    recipientName: '임재원',
    orderNumber: '2502220093',
    products: [
      {
        productName: '귀리 그래놀라 바 저당 운동 간식',
        optionName: '다크초코',
        quantity: 3,
        price: 3500,
      },
      {
        productName: '귀리 그래놀라 바 저당 운동 간식',
        optionName: '피넛버터',
        quantity: 2,
        price: 3500,
      },
    ],
    orderStatus: 'ORDER_CONFIRMED',
    paymentMethod: '신용카드',
    paymentDate: '2025-02-22',
    totalOrderAmount: 17500,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
  },

  // PRODUCT_SHIPPED (3개)
  {
    recipientName: '신지호',
    orderNumber: '2502210104',
    products: [
      {
        productName: '노밀가루 프로틴 머핀 식단 간식',
        optionName: '블루베리',
        quantity: 2,
        price: 6500,
      },
    ],
    orderStatus: 'PRODUCT_SHIPPED',
    paymentMethod: '가상계좌',
    paymentDate: '2025-02-21',
    totalOrderAmount: 13000,
    deliveryStatus: 'DELIVERING',
    courierName: 'CJ대한통운',
    trackingNumber: '123456789012',
  },
  {
    recipientName: '오세진',
    orderNumber: '2502200115',
    products: [
      {
        productName: '저당 치즈케이크 식단조절 디저트',
        optionName: null,
        quantity: 1,
        price: 22000,
      },
      {
        productName: '저당 요거트 무스케이크',
        optionName: null,
        quantity: 1,
        price: 19000,
      },
    ],
    orderStatus: 'PRODUCT_SHIPPED',
    paymentMethod: '신용카드',
    paymentDate: '2025-02-20',
    totalOrderAmount: 41000,
    deliveryStatus: 'DELIVERING',
    courierName: '한진택배',
    trackingNumber: '234567890123',
  },
  {
    recipientName: '배나영',
    orderNumber: '2502190126',
    products: [
      {
        productName: '단백질 와플 노밀가루 저당 브런치',
        optionName: '플레인',
        quantity: 4,
        price: 5000,
      },
    ],
    orderStatus: 'PRODUCT_SHIPPED',
    paymentMethod: '간편결제',
    paymentDate: '2025-02-19',
    totalOrderAmount: 20000,
    deliveryStatus: 'DELIVERING',
    courierName: '로젠택배',
    trackingNumber: '345678901234',
  },

  // DELIVERY_COMPLETED (3개)
  {
    recipientName: '권지민',
    orderNumber: '2502150137',
    products: [
      {
        productName: '저당 레드벨벳 케이크 식단조절',
        optionName: null,
        quantity: 1,
        price: 35000,
      },
    ],
    orderStatus: 'DELIVERY_COMPLETED',
    paymentMethod: '신용카드',
    paymentDate: '2025-02-15',
    totalOrderAmount: 35000,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: 'CJ대한통운',
    trackingNumber: '456789012345',
  },
  {
    recipientName: '한소희',
    orderNumber: '2502140148',
    products: [
      {
        productName: '노밀가루 크레이프 케이크 저칼로리',
        optionName: '딸기',
        quantity: 1,
        price: 28000,
      },
      {
        productName: '노밀가루 크레이프 케이크 저칼로리',
        optionName: '망고',
        quantity: 1,
        price: 28000,
      },
    ],
    orderStatus: 'DELIVERY_COMPLETED',
    paymentMethod: '간편결제',
    paymentDate: '2025-02-14',
    totalOrderAmount: 56000,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: '우체국택배',
    trackingNumber: '567890123456',
  },
  {
    recipientName: '문준혁',
    orderNumber: '2502130159',
    products: [
      {
        productName: '저당 뱅쇼 젤리 다이어트 간식',
        optionName: null,
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'DELIVERY_COMPLETED',
    paymentMethod: '신용카드',
    paymentDate: '2025-02-13',
    totalOrderAmount: 16000,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: '한진택배',
    trackingNumber: '678901234567',
  },

  // CANCELED (2개)
  {
    recipientName: '류성훈',
    orderNumber: '2502100162',
    products: [
      {
        productName: '프로틴 리조또 닭가슴살 식사대용',
        optionName: '버섯',
        quantity: 2,
        price: 9000,
      },
    ],
    orderStatus: 'CANCELED',
    paymentMethod: '가상계좌',
    paymentDate: '2025-02-10',
    totalOrderAmount: 18000,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
  },
  {
    recipientName: '전미래',
    orderNumber: '2502080173',
    products: [
      {
        productName: '저당 과일 타르트 식단조절 디저트',
        optionName: '딸기',
        quantity: 1,
        price: 14500,
      },
      {
        productName: '저당 과일 타르트 식단조절 디저트',
        optionName: '블루베리',
        quantity: 1,
        price: 14500,
      },
    ],
    orderStatus: 'CANCELED',
    paymentMethod: '신용카드',
    paymentDate: '2025-02-08',
    totalOrderAmount: 29000,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
  },

  // RETURNED (2개)
  {
    recipientName: '고은서',
    orderNumber: '2502050184',
    products: [
      {
        productName: '저당 바나나 브레드 식단조절 빵',
        optionName: null,
        quantity: 2,
        price: 7500,
      },
    ],
    orderStatus: 'RETURNED',
    paymentMethod: '간편결제',
    paymentDate: '2025-02-05',
    totalOrderAmount: 15000,
    deliveryStatus: 'COLLECTING',
    courierName: 'CJ대한통운',
    trackingNumber: '789012345678',
  },
  {
    recipientName: '차동현',
    orderNumber: '2502030195',
    products: [
      {
        productName: '두부 초코무스 저칼로리 단백질 디저트',
        optionName: null,
        quantity: 1,
        price: 12000,
      },
    ],
    orderStatus: 'RETURNED',
    paymentMethod: '신용카드',
    paymentDate: '2025-02-03',
    totalOrderAmount: 12000,
    deliveryStatus: 'COLLECT_COMPLETED',
    courierName: '롯데택배',
    trackingNumber: '890123456789',
  },

  // EXCHANGED (1개)
  {
    recipientName: '서예나',
    orderNumber: '2502010206',
    products: [
      {
        productName: '저당 쌀 도넛 식단조절 간식 베이커리',
        optionName: '플레인',
        quantity: 2,
        price: 6000,
      },
      {
        productName: '저당 쌀 도넛 식단조절 간식 베이커리',
        optionName: '시나몬',
        quantity: 1,
        price: 6000,
      },
    ],
    orderStatus: 'EXCHANGED',
    paymentMethod: '신용카드',
    paymentDate: '2025-02-01',
    totalOrderAmount: 18000,
    deliveryStatus: 'COLLECTING',
    courierName: '한진택배',
    trackingNumber: '901234567890',
  },
]

// 탭 → API 상태 매핑
const TAB_TO_STATUS: Partial<Record<OrderStatusTab, OrderStatus>> = {
  paymentCompleted: 'PAYMENT_COMPLETED',
  orderConfirmed: 'ORDER_CONFIRMED',
  productShipped: 'PRODUCT_SHIPPED',
  deliveryCompleted: 'DELIVERY_COMPLETED',
  canceled: 'CANCELED',
  returned: 'RETURNED',
  exchanged: 'EXCHANGED',
}

// Mock API 필터 함수
export function filterOrdersByTab(
  orders: OrderItem[],
  tab?: OrderStatusTab,
): OrderItem[] {
  if (!tab || tab === 'all') {
    return orders
  }
  const status = TAB_TO_STATUS[tab]

  return status ? orders.filter((o) => o.orderStatus === status) : orders
}

// statusCount를 실시간으로 계산
export function calcStatusCount(orders: OrderItem[]) {
  return {
    total: orders.length,
    paymentCompleted: orders.filter(
      (o) => o.orderStatus === 'PAYMENT_COMPLETED',
    ).length,
    orderConfirmed: orders.filter((o) => o.orderStatus === 'ORDER_CONFIRMED')
      .length,
    productShipped: orders.filter((o) => o.orderStatus === 'PRODUCT_SHIPPED')
      .length,
    deliveryCompleted: orders.filter(
      (o) => o.orderStatus === 'DELIVERY_COMPLETED',
    ).length,
    canceled: orders.filter((o) => o.orderStatus === 'CANCELED').length,
    returned: orders.filter((o) => o.orderStatus === 'RETURNED').length,
    exchanged: orders.filter((o) => o.orderStatus === 'EXCHANGED').length,
  }
}

// Mock API 응답 생성
export function getMockOrderListResponse(
  tab?: OrderStatusTab,
  page = 0,
  size = 10,
): OrderListResponse {
  const filtered = filterOrdersByTab(MOCK_ORDERS, tab)
  const start = page * size

  return {
    statusCount: calcStatusCount(MOCK_ORDERS), // 탭과 무관하게 전체 카운트
    content: filtered.slice(start, start + size),
    page,
    size,
    totalPages: Math.ceil(filtered.length / size),
    totalElements: filtered.length,
  }
}
