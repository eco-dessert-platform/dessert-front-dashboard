import {
  CompletedOrderListResponse,
  CompletedOrderTab,
  OrderItem,
  OrderStatus,
} from './order.type'

export const MOCK_COMPLETED_ORDERS: OrderItem[] = [
  // 구매확정 (6개)
  {
    recipientName: '김민수',
    orderNumber: '25030010001',
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
    ],
    orderStatus: 'DELIVERY_COMPLETED',
    paymentMethod: '간편결제',
    paymentDate: '2025. 03. 01',
    totalOrderAmount: 24300,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: '우체국택배',
    trackingNumber: '102938475619283',
  },
  {
    recipientName: '이서연',
    orderNumber: '25030010002',
    products: [
      {
        productName: '저당 그래놀라 클러스터 다이어트 간식',
        optionName: null,
        quantity: 3,
        price: 12000,
      },
    ],
    orderStatus: 'DELIVERY_COMPLETED',
    paymentMethod: '신용카드',
    paymentDate: '2025. 03. 01',
    totalOrderAmount: 36000,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: 'CJ대한통운',
    trackingNumber: '293847561928374',
  },
  {
    recipientName: '박지훈',
    orderNumber: '25030010003',
    products: [
      {
        productName: '단백질 쿠키 노밀가루 저당 식단관리',
        optionName: '초코칩',
        quantity: 2,
        price: 8500,
      },
    ],
    orderStatus: 'DELIVERY_COMPLETED',
    paymentMethod: '간편결제',
    paymentDate: '2025. 02. 28',
    totalOrderAmount: 17000,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: '한진택배',
    trackingNumber: '384756192837465',
  },
  {
    recipientName: '최유나',
    orderNumber: '25030010004',
    products: [
      {
        productName: '두부 티라미수 저칼로리 디저트',
        optionName: null,
        quantity: 1,
        price: 15000,
      },
    ],
    orderStatus: 'DELIVERY_COMPLETED',
    paymentMethod: '가상계좌',
    paymentDate: '2025. 02. 27',
    totalOrderAmount: 15000,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: 'CJ대한통운',
    trackingNumber: '475619283746519',
  },
  {
    recipientName: '정우진',
    orderNumber: '25030010024',
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
        quantity: 1,
        price: 7000,
      },
    ],
    orderStatus: 'DELIVERY_COMPLETED',
    paymentMethod: '간편결제',
    paymentDate: '2025. 03. 01',
    totalOrderAmount: 21000,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: '우체국택배',
    trackingNumber: '102938475619283',
  },
  {
    recipientName: '강하늘',
    orderNumber: '25030010005',
    products: [
      {
        productName: '아몬드 비스코티 저당 커피 간식',
        optionName: null,
        quantity: 1,
        price: 9500,
      },
    ],
    orderStatus: 'DELIVERY_COMPLETED',
    paymentMethod: '신용카드',
    paymentDate: '2025. 02. 26',
    totalOrderAmount: 9500,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: '롯데택배',
    trackingNumber: '561928374651928',
  },
  // 배송완료 (4개)
  {
    recipientName: '윤서진',
    orderNumber: '25030010006',
    products: [
      {
        productName: '단백질 파운드케이크 식단조절 베이커리',
        optionName: '플레인',
        quantity: 1,
        price: 18000,
      },
    ],
    orderStatus: 'DELIVERY_COMPLETED',
    paymentMethod: '신용카드',
    paymentDate: '2025. 02. 25',
    totalOrderAmount: 18000,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: 'CJ대한통운',
    trackingNumber: '619283746519283',
  },
  {
    recipientName: '임도현',
    orderNumber: '25030010007',
    products: [
      {
        productName: '저당 초콜릿 브라우니 다이어트 간식',
        optionName: null,
        quantity: 2,
        price: 11000,
      },
    ],
    orderStatus: 'DELIVERY_COMPLETED',
    paymentMethod: '간편결제',
    paymentDate: '2025. 02. 24',
    totalOrderAmount: 22000,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: '한진택배',
    trackingNumber: '719283746519284',
  },
  {
    recipientName: '신예린',
    orderNumber: '25030010008',
    products: [
      {
        productName: '귀리 그래놀라 바 저당 운동 간식',
        optionName: '다크초코',
        quantity: 3,
        price: 3500,
      },
    ],
    orderStatus: 'DELIVERY_COMPLETED',
    paymentMethod: '신용카드',
    paymentDate: '2025. 02. 23',
    totalOrderAmount: 10500,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: '로젠택배',
    trackingNumber: '819283746519285',
  },
  {
    recipientName: '오지아',
    orderNumber: '25030010009',
    products: [
      {
        productName: '노밀가루 프로틴 머핀 식단 간식',
        optionName: '블루베리',
        quantity: 2,
        price: 6500,
      },
    ],
    orderStatus: 'DELIVERY_COMPLETED',
    paymentMethod: '가상계좌',
    paymentDate: '2025. 02. 22',
    totalOrderAmount: 13000,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: 'CJ대한통운',
    trackingNumber: '919283746519286',
  },

  // 취소 (2개)
  {
    recipientName: '류성훈',
    orderNumber: '25030010010',
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
    paymentDate: '2025. 02. 20',
    totalOrderAmount: 18000,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
  },
  {
    recipientName: '전미래',
    orderNumber: '25030010011',
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
    paymentDate: '2025. 02. 18',
    totalOrderAmount: 29000,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
  },

  // 반품 (1개)
  {
    recipientName: '고은서',
    orderNumber: '25030010012',
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
    paymentDate: '2025. 02. 15',
    totalOrderAmount: 15000,
    deliveryStatus: 'COLLECTING',
    courierName: 'CJ대한통운',
    trackingNumber: '789012345678',
  },
]

const TAB_TO_STATUSES: Record<CompletedOrderTab, OrderStatus[]> = {
  completed: ['DELIVERY_COMPLETED'],
  canceled: ['CANCELED'],
  returned: ['RETURNED'],
  exchanged: ['EXCHANGED'],
}

export function filterCompletedOrdersByTab(
  orders: OrderItem[],
  tab?: CompletedOrderTab,
): OrderItem[] {
  if (!tab) return orders
  const statuses = TAB_TO_STATUSES[tab]
  return orders.filter((o) => statuses.includes(o.orderStatus))
}

export function calcCompletedStatusCount(
  orders: OrderItem[],
): CompletedOrderListResponse['statusCount'] {
  return {
    completed: orders.filter((o) => o.orderStatus === 'DELIVERY_COMPLETED')
      .length,
    canceled: orders.filter((o) => o.orderStatus === 'CANCELED').length,
    returned: orders.filter((o) => o.orderStatus === 'RETURNED').length,
    exchanged: orders.filter((o) => o.orderStatus === 'EXCHANGED').length,
  }
}

export function getMockCompletedOrderListResponse(
  tab?: CompletedOrderTab,
  page = 0,
  size = 10,
): CompletedOrderListResponse {
  const filtered = filterCompletedOrdersByTab(MOCK_COMPLETED_ORDERS, tab)
  const start = page * size

  return {
    statusCount: calcCompletedStatusCount(MOCK_COMPLETED_ORDERS),
    content: filtered.slice(start, start + size),
    page,
    size,
    totalPages: Math.ceil(filtered.length / size),
    totalElements: filtered.length,
  }
}
