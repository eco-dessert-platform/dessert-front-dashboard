import { client } from '@/shared/utils/axios'

import {
  getMockOrderDetailResponse,
  getMockOrderListResponse,
} from './order.mock'
import {
  OrderDetailResponse,
  OrderFilters,
  OrderListResponse,
} from './order.type'

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
