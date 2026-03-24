import { client } from '@/shared/utils/axios'

import { OrderFilters, OrderListResponse } from './order.type'

export async function getOrders(
  filters: OrderFilters,
): Promise<OrderListResponse> {
  const { data } = await client.post<OrderListResponse>(
    '/api/v1/seller/orders/',
    filters,
  )
  return data
}
