import { client } from '@/shared/utils/axios'

import {
  CompletedOrderFilters,
  CompletedOrderListResponse,
} from './order.type'

export async function getCompletedOrders(
  filters: CompletedOrderFilters,
): Promise<CompletedOrderListResponse> {
  const { data } = await client.get<CompletedOrderListResponse>(
    '/api/v1/seller/completed-orders',
    { params: filters },
  )
  return data
}
