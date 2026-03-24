import { client } from '@/shared/utils/axios'

import { getMockOrderListResponse } from './order.mock'
import { OrderFilters, OrderListResponse } from './order.type'

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
