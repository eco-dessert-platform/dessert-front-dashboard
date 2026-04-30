import type { ApiResponse } from '@/entity/auth/types'
import { client } from '@/shared/utils/axios'

import {
  getMockConfirmOrderResponse,
  getMockCreateExchangeResponse,
  getMockCreateReturnResponse,
  getMockCreateShipmentResponse,
  getMockOrderDetailResponse,
  getMockOrderListResponse,
  getMockUpdateShipmentResponse,
} from './order.mock'
import {
  CancelDecisionRequest,
  ConfirmOrderRequest,
  ConfirmOrderResult,
  CourierName,
  CreateExchangeRequest,
  CreateExchangeResult,
  CreateReturnRequest,
  CreateReturnResult,
  CreateShipmentResult,
  DeliveryStatus,
  OrderDeliveryStatusSpec,
  OrderDetail,
  OrderFilters,
  OrderItem,
  OrderListContent,
  OrderListResponse,
  OrderListResult,
  OrderStatusCount,
  ReturnDecisionRequest,
  ShipmentRequest,
  UpdateShipmentResult,
} from './order.type'
import {
  DELIVERY_STATUS_MAP,
  TAB_TO_STATUS,
} from '@/entity/order/order.constant.ts'
import { toWireOrderItemIds } from './order.wire'

export interface UpdateOrderStatusRequest {
  orderNumbers: string[]
  reasonType: string
  reasonDetail: string
  images?: File[]
}

export interface CompleteOrderRequest {
  orderNumbers: string[]
}

// VITE_USE_MOCK=true 일 때 mock 응답 사용
// 미설정(false) 기타 값이면 실서버호출
const useMock = import.meta.env.VITE_USE_MOCK === 'true'

function ensureSuccess(data: ApiResponse<unknown>, fallback: string): void {
  if (!data.success || data.result === null) {
    throw new Error(data.message ?? fallback)
  }
}

function unwrap<T>(data: ApiResponse<T>, fallback: string): T {
  if (!data.success || data.result === undefined) {
    throw new Error(data.message ?? fallback)
  }
  return data.result
}

export async function getOrders(
  filters: OrderFilters,
): Promise<OrderListResponse> {
  if (useMock) {
    return getMockOrderListResponse(filters)
  }

  const {
    tab,
    page,
    size,
    sort,
    searchKeyword,
    startDate,
    endDate,
    searchType,
  } = filters

  const today = new Date().toISOString().split('T')[0]

  const { data } = await client.post<ApiResponse<OrderListResult>>(
    '/api/v1/seller/orders/list',
    {
      orderStatus: tab ? (TAB_TO_STATUS[tab] ?? null) : null,
      searchType: searchType ?? 'BUYER_NAME',
      keywords: searchKeyword ? [searchKeyword] : [],
      isMultipleSearch: false,
      startDate: startDate ?? today,
      endDate: endDate ?? today,
    },
    {
      params: {
        page: page ?? 0,
        size: size ?? 100,
        sort: sort ?? 'orderDate,DESC',
      },
    },
  )

  return transformOrderListResult(
    unwrap(data, '주문 목록 조회에 실패했습니다.'),
  )
}

function transformOrderListResult(result: OrderListResult): OrderListResponse {
  const { orders, statusCounts } = result

  const mappedStatusCount: OrderStatusCount = {
    total: statusCounts.total,
    paymentCompleted: statusCounts.paymentCompleted,
    orderConfirmed: statusCounts.orderConfirmed,
    productShipped: statusCounts.shipped,
    deliveryCompleted: statusCounts.deliveryCompleted,
    canceled: statusCounts.cancelled,
    returned: statusCounts.returned,
    exchanged: statusCounts.exchanged,
  }

  return {
    statusCount: mappedStatusCount,
    content: orders.content.map(toOrderItem),
    page: orders.page,
    size: orders.size,
    totalPages: orders.totalPages,
    totalElements: orders.totalElements,
  }
}

function toOrderItem(item: OrderListContent): OrderItem {
  const first = item.orderItems[0]
  const courier = first?.courierCompany
  const validCourier =
    courier && courier !== 'NONE' ? (courier as CourierName) : null

  return {
    orderId: item.orderId,
    recipientName: item.recipientName,
    orderNumber: String(item.orderNumber),
    products: item.orderItems.map((i) => ({
      orderItemId: i.orderItemId,
      productName: i.orderItemInfo.itemName,
      optionName: null,
      quantity: i.orderItemInfo.quantity,
      price: i.orderItemInfo.unitPrice,
    })),
    orderStatus: first?.orderStatus ?? 'PAYMENT_COMPLETED',
    paymentMethod: item.paymentInfo.paymentMethod,
    paymentDate: null,
    totalOrderAmount: Number(item.totalOrderPrice) || 0,
    deliveryStatus: first?.orderDeliveryStatus
      ? (DELIVERY_STATUS_MAP[first.orderDeliveryStatus] ?? null)
      : null,
    courierName: validCourier,
    trackingNumber:
      first?.trackingNumber && first.trackingNumber !== '-'
        ? first.trackingNumber
        : null,
    returnStatus: null,
    exchangeStatus: null,
  }
}

export async function getOrderDetails(
  orderItemIds: string[],
): Promise<OrderDetail[]> {
  if (useMock) {
    return getMockOrderDetailResponse(orderItemIds)
  }

  const wireIds = toWireOrderItemIds(orderItemIds)
  if (wireIds.length === 0) {
    return []
  }

  const { data } = await client.post<ApiResponse<OrderDetail[]>>(
    '/api/v1/seller/orders/items',
    wireIds,
  )

  return unwrap(data, '주문 상세 조회에 실패했습니다.')
}

export async function updateOrderStatus(
  request: UpdateOrderStatusRequest,
): Promise<void> {
  if (useMock) {
    return Promise.resolve()
  }

  const formData = new FormData()
  formData.append('orderNumbers', JSON.stringify(request.orderNumbers))
  formData.append('reasonType', request.reasonType)
  formData.append('reasonDetail', request.reasonDetail)
  request.images?.forEach((image) => {
    formData.append('images', image)
  })

  const { data } = await client.post<ApiResponse<never>>(
    '/api/v1/seller/orders/status',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  )
  ensureSuccess(data, '주문 상태 변경에 실패했습니다.')
}

// NOTE: 운송장 API의 응답 envelope 키가 백엔드 스펙상
// POST(등록) = result.content (단수), PUT(수정) = result.contents (복수)로 갈림.
// 오타가 아니라 의도된 차이.
export async function createShipment(
  request: ShipmentRequest,
): Promise<CreateShipmentResult> {
  if (useMock) {
    return getMockCreateShipmentResponse(request)
  }

  const { orderId, orderItemIds, courierName, trackingNumber } = request
  const { data } = await client.post<
    ApiResponse<{ content: CreateShipmentResult }>
  >(`/api/v1/seller/orders/${orderId}/shipment`, {
    orderItemIds,
    courierName,
    trackingNumber,
  })

  return unwrap(data, '운송장 등록에 실패했습니다.').content
}

export async function updateShipment(
  request: ShipmentRequest,
): Promise<UpdateShipmentResult> {
  if (useMock) {
    return getMockUpdateShipmentResponse(request)
  }

  const { orderId, orderItemIds, courierName, trackingNumber } = request
  const { data } = await client.put<
    ApiResponse<{ contents: UpdateShipmentResult }>
  >(`/api/v1/seller/orders/${orderId}/shipment`, {
    orderItemIds,
    courierName,
    trackingNumber,
  })

  return unwrap(data, '운송장 수정에 실패했습니다.').contents
}

export async function completeReturn(
  request: CompleteOrderRequest,
): Promise<void> {
  if (useMock) {
    return Promise.resolve()
  }

  const { data } = await client.post<ApiResponse<never>>(
    '/api/v1/seller/orders/return/complete',
    request,
  )
  ensureSuccess(data, '반품 완료 처리에 실패했습니다.')
}

export async function completeExchange(
  request: CompleteOrderRequest,
): Promise<void> {
  if (useMock) {
    return Promise.resolve()
  }

  const { data } = await client.post<ApiResponse<never>>(
    '/api/v1/seller/orders/exchange/complete',
    request,
  )
  ensureSuccess(data, '교환 완료 처리에 실패했습니다.')
}

export async function createReturn(
  request: CreateReturnRequest,
): Promise<CreateReturnResult> {
  if (useMock) {
    return getMockCreateReturnResponse(request)
  }

  const { orderId, orderItemIds, reason, sellerComment } = request
  const { data } = await client.post<
    ApiResponse<{ content: CreateReturnResult }>
  >(`/api/v1/seller/orders/${orderId}/returns`, {
    orderItemIds,
    reason,
    sellerComment,
  })

  return unwrap(data, '반품 요청에 실패했습니다.').content
}

export async function createExchange(
  request: CreateExchangeRequest,
): Promise<CreateExchangeResult> {
  if (useMock) {
    return getMockCreateExchangeResponse(request)
  }

  const { orderId, orderItemIds, reason, sellerComment } = request
  const { data } = await client.post<
    ApiResponse<{ content: CreateExchangeResult }>
  >(`/api/v1/seller/orders/${orderId}/exchanges`, {
    orderItemIds,
    reason,
    sellerComment,
  })

  return unwrap(data, '교환 요청에 실패했습니다.').content
}

export async function decideCancel(
  request: CancelDecisionRequest,
): Promise<void> {
  if (useMock) {
    return Promise.resolve()
  }

  const { data } = await client.post<ApiResponse<never>>(
    '/api/v1/seller/cancels/decision',
    request,
  )
  ensureSuccess(data, '주문 취소 처리에 실패했습니다.')
}

export async function decideReturn(
  request: ReturnDecisionRequest,
): Promise<void> {
  if (useMock) {
    return Promise.resolve()
  }

  const { data } = await client.post<ApiResponse<never>>(
    '/api/v1/seller/returns/decision',
    request,
  )
  ensureSuccess(data, '반품 처리에 실패했습니다.')
}

export async function confirmOrder(
  request: ConfirmOrderRequest,
): Promise<ConfirmOrderResult> {
  if (useMock) {
    return getMockConfirmOrderResponse(request)
  }

  const { orderId, orderItemIds } = request
  const { data } = await client.post<
    ApiResponse<{ content: ConfirmOrderResult }>
  >(
    `/api/v1/seller/orders/${orderId}/confirm`,
    { orderItemIds },
  )

  return unwrap(data, '발주 확인에 실패했습니다.').content
}
