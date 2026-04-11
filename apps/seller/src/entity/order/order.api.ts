import { client } from '@/shared/utils/axios'

import {
  CourierName,
  OrderDetailResponse,
  OrderFilters,
  OrderListResponse,
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

export async function getOrders(
  filters: OrderFilters,
): Promise<OrderListResponse> {
  const { tab, page, size, sort, searchKeyword, startDate, endDate, searchType } = filters

  const today = new Date().toISOString().split('T')[0]

  const TAB_TO_STATUS: Record<string, string> = {
    all: 'NONE',
    paymentCompleted: 'PAYMENT_COMPLETED',
    orderConfirmed: 'ORDER_CONFIRMED',
    productShipped: 'PRODUCT_SHIPPED',
    deliveryCompleted: 'DELIVERY_COMPLETED',
    canceled: 'CANCELED',
    returned: 'RETURNED',
    exchanged: 'EXCHANGED',
  }

  const { data } = await client.post<OrderListResponse>(
    '/api/v1/seller/orders/list',
    {
      orderStatus: TAB_TO_STATUS[tab ?? 'all'] ?? 'NONE',
      searchType: searchType ?? 'BUYER_NAME',
      keywords: searchKeyword ? [searchKeyword] : [],
      isMultipleSearch: false,
      startDate: startDate ?? today,
      endDate: endDate ?? today,
    },
    {
      params: { page: page ?? 0, size: size ?? 100, sort: sort ?? 'orderDate,DESC' },
    },
  )
  return data
}

export async function getOrderDetails(
  orderNumbers: string[],
): Promise<OrderDetailResponse> {
  const { data } = await client.post<OrderDetailResponse>(
    '/api/v1/seller/orders/items',
    orderNumbers,
  )
  return data
}

export async function updateOrderStatus(
  request: UpdateOrderStatusRequest,
): Promise<void> {
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
  await client.put('/api/v1/seller/orders/tracking', request)
}

export async function completeReturn(
  request: CompleteOrderRequest,
): Promise<void> {
  await client.post('/api/v1/seller/orders/return/complete', request)
}

export async function completeExchange(
  request: CompleteOrderRequest,
): Promise<void> {
  await client.post('/api/v1/seller/orders/exchange/complete', request)
}

export async function confirmOrder(
  request: CompleteOrderRequest,
): Promise<void> {
  await client.post('/api/v1/seller/orders/confirm', request)
}
