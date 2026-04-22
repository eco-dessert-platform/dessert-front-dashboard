import type { ApiResponse } from '@/entity/auth/types'
import { client } from '@/shared/utils/axios'

import {
  getMockOrderDetailResponse,
  getMockOrderListResponse,
} from './order.mock'
import {
  CourierName,
  DeliveryStatus,
  OrderDeliveryStatusSpec,
  OrderDetail,
  OrderFilters,
  OrderItem,
  OrderListContent,
  OrderListResponse,
  OrderListResult,
  OrderStatusCount,
} from './order.type'

export interface UpdateOrderStatusRequest {
  orderNumbers: string[]
  reasonType: string
  reasonDetail: string
  images?: File[]
}

export interface UpdateTrackingRequest {
  orderNumber: string
  courierName: CourierName
  trackingNumber: string
}

export interface CompleteOrderRequest {
  orderNumbers: string[]
}

const useMock = import.meta.env.VITE_USE_MOCK === 'false'

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

  const TAB_TO_STATUS: Partial<Record<string, string>> = {
    paymentCompleted: 'PAYMENT_COMPLETED',
    orderConfirmed: 'ORDER_CONFIRMED',
    productShipped: 'PRODUCT_SHIPPED',
    deliveryCompleted: 'DELIVERY_COMPLETED',
    canceled: 'CANCELED',
    returned: 'RETURNED',
    exchanged: 'EXCHANGED',
  }

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

  if (!data.result) {
    throw new Error(data.message ?? '주문 목록 조회에 실패했습니다.')
  }

  return transformOrderListResult(data.result)
}

// ─── 스펙 응답 → 기존 UI 타입 변환 ────────────────────
// TODO: UI가 OrderListContent 구조에 맞게 리팩터되면 이 변환 제거

const DELIVERY_STATUS_MAP: Record<OrderDeliveryStatusSpec, DeliveryStatus> = {
  PREPARING: 'PRODUCT_PREPARING',
  COLLECTING: 'COLLECTING',
  COLLECT_COMPLETED: 'COLLECT_COMPLETED',
  DELIVERING: 'DELIVERING',
  DELIVERY_COMPLETED: 'DELIVERY_COMPLETED',
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
    recipientName: item.recipientName,
    orderNumber: item.orderNumber,
    products: item.orderItems.map((i) => ({
      productName: i.orderItemInfo.itemName,
      optionName: null,
      quantity: i.orderItemInfo.quantity,
      price: i.orderItemInfo.unitPrice,
    })),
    orderStatus: first?.orderStatus ?? 'PAYMENT_COMPLETED',
    paymentMethod: item.paymentInfo.paymentMethod,
    paymentDate: '',
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
  orderItemIds: number[],
): Promise<OrderDetail[]> {
  if (useMock) {
    return getMockOrderDetailResponse(orderItemIds)
  }

  const { data } = await client.post<ApiResponse<OrderDetail[]>>(
    '/api/v1/seller/orders/items',
    orderItemIds,
  )

  if (!data.result) {
    throw new Error(data.message ?? '주문 상세 조회에 실패했습니다.')
  }

  return data.result
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

  await client.post('/api/v1/seller/orders/status', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export async function updateTracking(
  request: UpdateTrackingRequest,
): Promise<void> {
  if (useMock) {
    return Promise.resolve()
  }

  await client.put('/api/v1/seller/orders/tracking', request)
}

export async function completeReturn(
  request: CompleteOrderRequest,
): Promise<void> {
  if (useMock) {
    return Promise.resolve()
  }

  await client.post('/api/v1/seller/orders/return/complete', request)
}

export async function completeExchange(
  request: CompleteOrderRequest,
): Promise<void> {
  if (useMock) {
    return Promise.resolve()
  }

  await client.post('/api/v1/seller/orders/exchange/complete', request)
}

export async function confirmOrder(
  request: CompleteOrderRequest,
): Promise<void> {
  if (useMock) {
    return Promise.resolve()
  }

  await client.post('/api/v1/seller/orders/confirm', request)
}
