import { client } from '@/shared/utils/axios'

import { getMockCompletedOrderListResponse } from './completed-order.mock'
import { CompletedOrderFilters, CompletedOrderListResponse } from './order.type'

const useMock = import.meta.env.VITE_USE_MOCK === 'true'

export async function getCompletedOrders(
  filters: CompletedOrderFilters,
): Promise<CompletedOrderListResponse> {
  if (useMock) {
    return getMockCompletedOrderListResponse(filters)
  }

  const { data } = await client.get<CompletedOrderListResponse>(
    '/api/v1/seller/completed-orders',
    { params: filters },
  )
  return data
}
