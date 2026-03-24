export type OrderStatusTab =
  | 'all' // 전체
  | 'paymentCompleted' // 결제완료
  | 'orderConfirmed' // 발주확인
  | 'productShipped' // 상품발송
  | 'deliveryCompleted' // 배송완료
  | 'canceled' // 취소
  | 'returned' // 반품
  | 'exchanged' // 교환

export type OrderStatus =
  | 'PAYMENT_COMPLETED' // 결제완료
  | 'ORDER_CONFIRMED' // 발주확인
  | 'PRODUCT_SHIPPED' // 상품발송
  | 'DELIVERY_COMPLETED' // 배송완료
  | 'CANCELED' // 취소
  | 'RETURNED' // 반품
  | 'EXCHANGED' // 교환

export type DeliveryStatus =
  | 'PRODUCT_PREPARING' // 상품준비
  | 'COLLECTING' // 수거중
  | 'COLLECT_COMPLETED' // 수거완료
  | 'DELIVERING' // 배송중
  | 'DELIVERY_COMPLETED' // 배송완료

export type PaymentMethod = '신용카드' | '간편결제' | '가상계좌'

export type CourierName =
  | 'CJ대한통운'
  | '롯데택배'
  | '한진택배'
  | '로젠택배'
  | '우체국택배'
  | 'CJ대한통운(국제택배)'
  | 'CU편의점택배'
  | 'GOP당일택배'
  | 'GOS당일택배'
  | 'GPSLOGIX'
  | 'GSFresh'
  | 'GSI익스프레스'
  | 'GSMNTON'
  | 'GSPostbox퀵'
  | 'GSPostbox택배'
  | '기타'

export interface OrderProduct {
  productName: string
  optionName: string | null
  quantity: number
  price: number
}

export interface OrderItem {
  recipientName: string
  orderNumber: string
  products: OrderProduct[]
  orderStatus: OrderStatus
  paymentMethod: PaymentMethod
  paymentDate: string
  totalOrderAmount: number
  deliveryStatus: DeliveryStatus | null
  courierName: CourierName | null
  trackingNumber: string | null
}

export interface OrderStatusCount {
  total: number // 전체
  paymentCompleted: number // 결제완료
  orderConfirmed: number // 발주확인
  productShipped: number // 상품발송
  deliveryCompleted: number // 배송완료
  canceled: number // 취소
  returned: number // 반품
  exchanged: number // 교환
}

export interface OrderListResponse {
  statusCount: OrderStatusCount
  content: OrderItem[]
  page: number
  size: number
  totalPages: number
  totalElements: number
}

export type SearchType =
  | 'ORDER_NUMBER'
  | 'RECIPIENT_NAME'
  | 'PRODUCT_NAME'
  | 'TRACKING_NUMBER'

export type SortOrder = 'ASC' | 'DESC'

export interface OrderFilters {
  tab?: OrderStatusTab
  startDate?: string
  endDate?: string
  deliveryStatus?: DeliveryStatus
  searchType?: SearchType
  searchKeyword?: string
  page?: string
  size?: string
  sort?: SortOrder
}

// 독립 버튼 (Button 컴포넌트)
type SingleButton = {
  type: 'single'
  label: string
  variant: 'primary-outlined' | 'secondary-outlined'
  action: string // 이벤트 핸들러 key
}

// 버튼 그룹 (취소/반품/교환 탭에서 사용)
type GroupButton = {
  type: 'group'
  items: Array<{
    label: string
    action: string
  }>
}

export type ActionButton = SingleButton | GroupButton

// 완료 주문 내역
export type CompletedOrderTab =
  | 'completed' // 완료
  | 'canceled' // 취소
  | 'returned' // 반품
  | 'exchanged' // 교환

export type CompletedOrderStatus =
  | 'ALL' // 전체
  | 'PURCHASE_CONFIRMED' // 구매확정
  | 'DELIVERY_COMPLETED' // 배송완료

export interface CompletedOrderStatusCount {
  completed: number
  canceled: number
  returned: number
  exchanged: number
}

export interface CompletedOrderFilters {
  tab?: CompletedOrderTab
  startDate?: string
  endDate?: string
  orderStatus?: CompletedOrderStatus
  searchType?: SearchType
  searchKeyword?: string
  page?: string
  size?: string
  sort?: SortOrder
}

export interface CompletedOrderListResponse {
  statusCount: CompletedOrderStatusCount
  content: OrderItem[]
  page: number
  size: number
  totalPages: number
  totalElements: number
}
