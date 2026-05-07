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

export type ReturnStatus =
  | 'RETURN_REQUESTED' // 반품요청
  | 'RETURN_APPROVED' // 반품승인
  | 'RETURN_REJECTED' // 반품거절
  | 'PRODUCT_COLLECTING' // 상품회수
  | 'PRODUCT_CHECKING' // 상품확인
  | 'RETURN_IN_PROGRESS' // 반품진행
  | 'RETURN_ON_HOLD' // 반품보류
  | 'RETURN_TURNED_DOWN' // 반품반려
  | 'RETURN_COMPLETED' // 반품완료

export type ExchangeStatus =
  | 'EXCHANGE_REQUESTED' // 교환요청
  | 'EXCHANGE_APPROVED' // 교환승인
  | 'EXCHANGE_REJECTED' // 교환거절
  | 'PRODUCT_COLLECTING' // 상품회수
  | 'PRODUCT_CHECKING' // 상품확인
  | 'EXCHANGE_IN_PROGRESS' // 교환진행
  | 'EXCHANGE_SHIPPING' // 교환배송
  | 'EXCHANGE_ON_HOLD' // 교환보류
  | 'EXCHANGE_TURNED_DOWN' // 교환반려
  | 'EXCHANGE_COMPLETED' // 교환완료

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

export type OrderAction =
  | 'detailView'
  | 'confirmOrder'
  | 'cancelOrder'
  | 'requestReturn'
  | 'requestExchange'
  | 'approveCancellation'
  | 'rejectCancellation'
  | 'approveReturn'
  | 'rejectReturn'
  | 'completeReturn'
  | 'turnDownReturn'
  | 'holdReturn'
  | 'approveExchange'
  | 'rejectExchange'
  | 'completeExchange'
  | 'turnDownExchange'
  | 'holdExchange'

export interface OrderProduct {
  orderItemId: number
  productName: string
  optionName: string | null
  quantity: number
  price: number
}

export interface OrderItem {
  orderId: number
  recipientName: string
  orderNumber: string
  products: OrderProduct[]
  orderStatus: OrderStatus
  paymentMethod: PaymentMethod
  paymentDate: string | null
  totalOrderAmount: number
  deliveryStatus: DeliveryStatus | null
  courierName: CourierName | null
  trackingNumber: string | null
  returnStatus: ReturnStatus | null
  exchangeStatus: ExchangeStatus | null
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

// ─── 주문 내역 조회 API 스펙 원본 응답 ────────────────
// (fetcher 내부에서 OrderListResponse 로 transform)

export type OrderDeliveryStatusSpec =
  | 'PREPARING'
  | 'COLLECTING'
  | 'COLLECT_COMPLETED'
  | 'DELIVERING'
  | 'DELIVERY_COMPLETED'

export interface OrderListItemInfo {
  itemName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface OrderListItemDetail {
  orderItemId: number
  orderNumber: string
  orderStatus: OrderStatus
  orderItemInfo: OrderListItemInfo
  orderDeliveryStatus: OrderDeliveryStatusSpec
  courierCompany: CourierName | 'NONE' | null
  trackingNumber: string | null
}

export interface OrderListPaymentInfo {
  paymentStatus: string
  paymentMethod: PaymentMethod
}

export interface OrderListContent {
  orderId: number
  orderNumber: string
  recipientName: string
  orderItems: OrderListItemDetail[]
  paymentInfo: OrderListPaymentInfo
  totalOrderPrice: string
  sellerId: number
}

export interface OrderListSpecStatusCounts {
  total: number
  paymentCompleted: number
  orderConfirmed: number
  shipped: number
  deliveryCompleted: number
  cancelled: number
  returned: number
  exchanged: number
}

export interface OrderListResult {
  orders: {
    content: OrderListContent[]
    page: number
    size: number
    totalPages: number
    totalElements: number
  }
  statusCounts: OrderListSpecStatusCounts
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
  action: OrderAction // 이벤트 핸들러 key
}

// 버튼 그룹 (취소/반품/교환 탭에서 사용)
type GroupButton = {
  type: 'group'
  items: Array<{
    label: string
    action: OrderAction
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

export interface OrderDetail {
  orderNumber: string
  orderInfo: {
    orderDate: string
    orderStatusLabel: string
  }
  buyer: {
    recipientName: string
    buyerName: string
    buyerPhone1: string
    buyerPhone2: string | null
  }
  shipping: {
    statusLabel: string
    courierCompany: CourierName | null
    trackingNumber: string | null
    shippingFee: number
    address: string
    memo: string | null
  }
  orderItem: {
    boardTitle: string
    itemName: string
    quantity: number
    unitPrice: number
    totalPrice: number
  }
}

export interface CompletedOrderListResponse {
  statusCount: CompletedOrderStatusCount
  content: OrderItem[]
  page: number
  size: number
  totalPages: number
  totalElements: number
}

// ─── 다건 액션 공통 요약 ──────────────────────────────

export interface BulkActionSummary {
  requestedCount: number
  successCount: number
  failCount: number
}

// ─── 발주 확인 API ────────────────────────────────────

export interface ConfirmOrderRequest {
  orderId: number
  orderItemIds: number[]
}

export interface ConfirmOrderResult {
  orderId: number
  summary: BulkActionSummary
  confirmedOrderItemIds: number[]
  failedOrderItemIds: number[]
}

// ─── 운송장 입력/수정 공통 Request ─────────────────────

export interface ShipmentRequest {
  orderId: number
  orderItemIds: number[]
  courierName: CourierName
  trackingNumber: string
}

// ─── 운송장 입력 API (POST) ───────────────────────────

export interface CreateShipmentResult {
  orderId: number
  summary: BulkActionSummary
  successOrderItemIds: number[]
  failedOrderItemIds: number[]
  courierName: CourierName | null
  trackingNumber: string | null
  shippedAt: string | null
}

// ─── 판매자 요청 반품 생성 API ────────────────────────

export interface CreateReturnRequest {
  orderId: number
  orderItemIds: number[]
  reason: string | null
  sellerComment: string | null
}

export interface CreateReturnResult {
  orderId: number
  summary: BulkActionSummary
  successOrderItemIds: number[]
  failedOrderItemIds: number[]
}

// ─── 판매자 요청 교환 생성 API ────────────────────────

export interface CreateExchangeRequest {
  orderId: number
  orderItemIds: number[]
  reason: string | null
  sellerComment: string | null
}

export interface CreateExchangeResult {
  orderId: number
  summary: BulkActionSummary
  successOrderItemIds: number[]
  failedOrderItemIds: number[]
}

// ─── 주문 취소 승인/거절 API ──────────────────────────

export type CancelDecisionType = 'APPROVE' | 'REJECT'

export interface CancelDecisionRequest {
  cancelIds: number[]
  decisionType: CancelDecisionType
  reason: string | null
}

// ─── 반품 요청 승인/거절 API ──────────────────────────

export type ReturnDecisionType = 'APPROVE' | 'REJECT'

export interface ReturnDecisionRequest {
  returnIds: number[]
  decisionType: ReturnDecisionType
  reason: string | null
}

// ─── 운송장 수정 API (PUT) ────────────────────────────

export interface UpdateShipmentItem {
  orderId: number
  orderStatus: OrderStatus
  deliveryStatus: DeliveryStatus | null
  courierName: CourierName | null
  trackingNumber: string | null
  updatedAt: string
}

export type UpdateShipmentResult = UpdateShipmentItem[]
