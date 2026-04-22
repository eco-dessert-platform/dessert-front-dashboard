import {
  ConfirmOrderRequest,
  ConfirmOrderResult,
  CreateExchangeRequest,
  CreateExchangeResult,
  CreateReturnRequest,
  CreateReturnResult,
  CreateShipmentResult,
  OrderDetail,
  OrderFilters,
  OrderItem,
  OrderListResponse,
  OrderStatus,
  OrderStatusTab,
  ShipmentRequest,
  UpdateShipmentResult,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
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
    returnStatus: null,
    exchangeStatus: null,
  },

  // RETURNED (9개 - 반품 플로우 전체 상태)
  {
    recipientName: '최하윤',
    orderNumber: '2502050184',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'RETURNED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
    returnStatus: 'RETURN_REQUESTED',
    exchangeStatus: null,
  },
  {
    recipientName: '최하윤',
    orderNumber: '2502040185',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'RETURNED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
    returnStatus: 'RETURN_APPROVED',
    exchangeStatus: null,
  },
  {
    recipientName: '최하윤',
    orderNumber: '2502030186',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'RETURNED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
    returnStatus: 'RETURN_REJECTED',
    exchangeStatus: null,
  },
  {
    recipientName: '최하윤',
    orderNumber: '2502020187',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'RETURNED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: 'COLLECTING',
    courierName: 'CJ대한통운',
    trackingNumber: '1234567899123',
    returnStatus: 'PRODUCT_COLLECTING',
    exchangeStatus: null,
  },
  {
    recipientName: '최하윤',
    orderNumber: '2502010188',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'RETURNED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: 'CJ대한통운',
    trackingNumber: '1234567899123',
    returnStatus: 'PRODUCT_CHECKING',
    exchangeStatus: null,
  },
  {
    recipientName: '최하윤',
    orderNumber: '2501310189',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'RETURNED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: 'CJ대한통운',
    trackingNumber: '1234567899123',
    returnStatus: 'RETURN_IN_PROGRESS',
    exchangeStatus: null,
  },
  {
    recipientName: '최하윤',
    orderNumber: '2501300190',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'RETURNED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: 'CJ대한통운',
    trackingNumber: '1234567899123',
    returnStatus: 'RETURN_ON_HOLD',
    exchangeStatus: null,
  },
  {
    recipientName: '최하윤',
    orderNumber: '2501290191',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'RETURNED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: 'CJ대한통운',
    trackingNumber: '1234567899123',
    returnStatus: 'RETURN_TURNED_DOWN',
    exchangeStatus: null,
  },
  {
    recipientName: '최하윤',
    orderNumber: '2501280192',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'RETURNED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: 'DELIVERY_COMPLETED',
    courierName: 'CJ대한통운',
    trackingNumber: '1234567899123',
    returnStatus: 'RETURN_COMPLETED',
    exchangeStatus: null,
  },

  // EXCHANGED (10개 - 교환 플로우 전체 상태)
  {
    recipientName: '최하윤',
    orderNumber: '2502050301',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'EXCHANGED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
    returnStatus: null,
    exchangeStatus: 'EXCHANGE_REQUESTED',
  },
  {
    recipientName: '최하윤',
    orderNumber: '2502040302',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'EXCHANGED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: 'PRODUCT_PREPARING',
    courierName: null,
    trackingNumber: null,
    returnStatus: null,
    exchangeStatus: 'EXCHANGE_APPROVED',
  },
  {
    recipientName: '최하윤',
    orderNumber: '2502030303',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'EXCHANGED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: null,
    courierName: null,
    trackingNumber: null,
    returnStatus: null,
    exchangeStatus: 'EXCHANGE_REJECTED',
  },
  {
    recipientName: '최하윤',
    orderNumber: '2502020304',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'EXCHANGED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: 'COLLECTING',
    courierName: 'CJ대한통운',
    trackingNumber: '1234567899123',
    returnStatus: null,
    exchangeStatus: 'PRODUCT_COLLECTING',
  },
  {
    recipientName: '최하윤',
    orderNumber: '2502010305',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'EXCHANGED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: 'COLLECT_COMPLETED',
    courierName: '우체국택배',
    trackingNumber: '1234567899123',
    returnStatus: null,
    exchangeStatus: 'PRODUCT_CHECKING',
  },
  {
    recipientName: '최하윤',
    orderNumber: '2501310306',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'EXCHANGED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: 'DELIVERING',
    courierName: '한진택배',
    trackingNumber: '1234567899123',
    returnStatus: null,
    exchangeStatus: 'EXCHANGE_IN_PROGRESS',
  },
  {
    recipientName: '최하윤',
    orderNumber: '2501300307',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'EXCHANGED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: 'DELIVERING',
    courierName: '한진택배',
    trackingNumber: '1234567899123',
    returnStatus: null,
    exchangeStatus: 'EXCHANGE_SHIPPING',
  },
  {
    recipientName: '최하윤',
    orderNumber: '2501290308',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'EXCHANGED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: 'COLLECTING',
    courierName: 'CJ대한통운',
    trackingNumber: '1234567899123',
    returnStatus: null,
    exchangeStatus: 'EXCHANGE_ON_HOLD',
  },
  {
    recipientName: '최하윤',
    orderNumber: '2501280309',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'EXCHANGED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: 'COLLECT_COMPLETED',
    courierName: '우체국택배',
    trackingNumber: '1234567899123',
    returnStatus: null,
    exchangeStatus: 'EXCHANGE_TURNED_DOWN',
  },
  {
    recipientName: '최하윤',
    orderNumber: '2501270310',
    products: [
      {
        productName:
          '비건 비스코티 초코 아몬드 / 쌀 디저트 글루텐프리 노밀가루 베이커리',
        optionName: '현미 비스코티',
        quantity: 2,
        price: 8000,
      },
    ],
    orderStatus: 'EXCHANGED',
    paymentMethod: '신용카드',
    paymentDate: '2025-03-01',
    totalOrderAmount: 5000,
    deliveryStatus: 'COLLECT_COMPLETED',
    courierName: '우체국택배',
    trackingNumber: '1234567899123',
    returnStatus: null,
    exchangeStatus: 'EXCHANGE_COMPLETED',
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
export function filterOrders(
  orders: OrderItem[],
  filters: OrderFilters,
): OrderItem[] {
  let result = orders

  // 탭 필터
  if (filters.tab && filters.tab !== 'all') {
    const status = TAB_TO_STATUS[filters.tab]
    if (status) result = result.filter((o) => o.orderStatus === status)
  }

  // 날짜 필터
  if (filters.startDate) {
    result = result.filter((o) => o.paymentDate >= filters.startDate!)
  }
  if (filters.endDate) {
    result = result.filter((o) => o.paymentDate <= filters.endDate!)
  }

  // 배송상태 필터
  if (filters.deliveryStatus) {
    result = result.filter((o) => o.deliveryStatus === filters.deliveryStatus)
  }

  // 검색 키워드 필터
  if (filters.searchKeyword && filters.searchType) {
    const keyword = filters.searchKeyword.toLowerCase()
    result = result.filter((o) => {
      switch (filters.searchType) {
        case 'ORDER_NUMBER':
          return o.orderNumber.includes(keyword)
        case 'RECIPIENT_NAME':
          return o.recipientName.toLowerCase().includes(keyword)
        case 'PRODUCT_NAME':
          return o.products.some((p) =>
            p.productName.toLowerCase().includes(keyword),
          )
        case 'TRACKING_NUMBER':
          return o.trackingNumber?.includes(keyword) ?? false
        default:
          return true
      }
    })
  }

  // 정렬
  if (filters.sort === 'ASC') {
    result = [...result].sort(
      (a, b) => a.paymentDate.localeCompare(b.paymentDate),
    )
  } else {
    result = [...result].sort(
      (a, b) => b.paymentDate.localeCompare(a.paymentDate),
    )
  }

  return result
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

// ─── 주문 상세 Mock ───────────────────────────────────

function buildMockOrderDetails(order: OrderItem): OrderDetail[] {
  return order.products.map((product) => ({
    orderNumber: order.orderNumber,
    orderInfo: {
      orderDate: order.paymentDate,
      orderStatusLabel:
        {
          PAYMENT_COMPLETED: '결제완료',
          ORDER_CONFIRMED: '발주확인',
          PRODUCT_SHIPPED: '상품발송',
          DELIVERY_COMPLETED: '배송완료',
          CANCELED: '취소',
          RETURNED: '반품',
          EXCHANGED: '교환',
        }[order.orderStatus] ?? order.orderStatus,
    },
    buyer: {
      recipientName: order.recipientName,
      buyerName: order.recipientName,
      buyerPhone1: '010-1234-5678',
      buyerPhone2: Math.random() > 0.5 ? '010-5678-9000' : null,
    },
    shipping: {
      statusLabel: order.deliveryStatus
        ? {
            PRODUCT_PREPARING: '상품준비중',
            COLLECTING: '수거중',
            COLLECT_COMPLETED: '수거완료',
            DELIVERING: '배송중',
            DELIVERY_COMPLETED: '배송완료',
          }[order.deliveryStatus]
        : '-',
      courierCompany: order.courierName,
      trackingNumber: order.trackingNumber,
      shippingFee: 3000,
      address: '서울시 강남구 테헤란로 1234, 100호',
      memo: '문 앞에 놓아주세요.',
    },
    orderItem: {
      boardTitle: product.productName,
      itemName: product.optionName ?? product.productName,
      quantity: product.quantity,
      unitPrice: product.price,
      totalPrice: product.price * product.quantity,
    },
  }))
}

// 운송장 입력(POST) mock — 요청한 itemIds 전부 성공 처리
export function getMockCreateShipmentResponse(
  request: ShipmentRequest,
): CreateShipmentResult {
  return {
    orderId: request.orderId,
    summary: {
      requestedCount: request.orderItemIds.length,
      successCount: request.orderItemIds.length,
      failCount: 0,
    },
    successOrderItemIds: request.orderItemIds,
    failedOrderItemIds: [],
    courierName: request.courierName,
    trackingNumber: request.trackingNumber,
    shippedAt: new Date().toISOString(),
  }
}

// 운송장 수정(PUT) mock — 요청한 itemIds 각각에 대해 업데이트 결과 반환
export function getMockUpdateShipmentResponse(
  request: ShipmentRequest,
): UpdateShipmentResult {
  const now = new Date().toISOString()
  return request.orderItemIds.map(() => ({
    orderId: request.orderId,
    orderStatus: 'PRODUCT_SHIPPED' as const,
    deliveryStatus: 'DELIVERING' as const,
    courierName: request.courierName,
    trackingNumber: request.trackingNumber,
    updatedAt: now,
  }))
}

// 반품 요청 생성 mock — 요청한 itemIds 전부 성공 처리
export function getMockCreateReturnResponse(
  request: CreateReturnRequest,
): CreateReturnResult {
  return {
    orderId: request.orderId,
    summary: {
      requestedCount: request.orderItemIds.length,
      successCount: request.orderItemIds.length,
      failCount: 0,
    },
    successOrderItemIds: request.orderItemIds,
    failedOrderItemIds: [],
  }
}

// 교환 요청 생성 mock — 요청한 itemIds 전부 성공 처리
export function getMockCreateExchangeResponse(
  request: CreateExchangeRequest,
): CreateExchangeResult {
  return {
    orderId: request.orderId,
    summary: {
      requestedCount: request.orderItemIds.length,
      successCount: request.orderItemIds.length,
      failCount: 0,
    },
    successOrderItemIds: request.orderItemIds,
    failedOrderItemIds: [],
  }
}

// 발주확인 mock — 요청한 itemIds 전부 성공 처리
export function getMockConfirmOrderResponse(
  request: ConfirmOrderRequest,
): ConfirmOrderResult {
  return {
    orderId: request.orderId,
    summary: {
      requestedCount: request.orderItemIds.length,
      successCount: request.orderItemIds.length,
      failCount: 0,
    },
    confirmedOrderItemIds: request.orderItemIds,
    failedOrderItemIds: [],
  }
}

// TODO: 스펙은 orderItemId(number[])지만 mock 데이터에 ID가 없어 orderNumber를 숫자 캐스팅해 매칭
export function getMockOrderDetailResponse(
  orderItemIds: number[],
): OrderDetail[] {
  if (orderItemIds.length === 0) return []
  const matched = MOCK_ORDERS.filter((o) =>
    orderItemIds.includes(Number(o.orderNumber)),
  )
  const result = matched.length > 0 ? matched : MOCK_ORDERS.slice(0, orderItemIds.length)
  return result.flatMap(buildMockOrderDetails)
}

// Mock API 응답 생성
export function getMockOrderListResponse(
  filters: OrderFilters,
): OrderListResponse {
  const page = filters.page ? Number(filters.page) : 0
  const size = filters.size ? Number(filters.size) : 10
  const filtered = filterOrders(MOCK_ORDERS, filters)
  const start = page * size

  return {
    statusCount: calcStatusCount(MOCK_ORDERS),
    content: filtered.slice(start, start + size),
    page,
    size,
    totalPages: Math.ceil(filtered.length / size),
    totalElements: filtered.length,
  }
}
