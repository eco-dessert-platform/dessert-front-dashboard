import { client } from '@/shared/utils/axios'

import {
  getMockOrderDetailResponse,
  getMockOrderListResponse,
} from './order.mock'
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

const useMock = import.meta.env.VITE_USE_MOCK === 'true'

export async function getOrders(
  filters: OrderFilters,
): Promise<OrderListResponse> {
  if (useMock) {
    return getMockOrderListResponse(filters)
  }

  const { data } = await client.post<OrderListResponse>(
    '/api/v1/seller/orders/',
    filters,
  )
  return data
}

export async function getOrderDetails(
  orderNumbers: string[],
): Promise<OrderDetailResponse> {
  if (useMock) {
    return getMockOrderDetailResponse(orderNumbers)
  }

  const { data } = await client.post<OrderDetailResponse>(
    '/api/v1/seller/orders/items',
    orderNumbers,
  )
  return data
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
