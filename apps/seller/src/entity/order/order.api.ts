import { getMockOrderListResponse } from './order.mock'
import { OrderFilters, OrderListResponse } from './order.type'

export async function getOrders(
  filters: OrderFilters,
): Promise<OrderListResponse> {
  const page = filters.page ? Number(filters.page) : 0
  const size = filters.size ? Number(filters.size) : 10

  return getMockOrderListResponse(filters.tab, page, size)

  /* 실제 API 연동 시 아래 주석 해제하여 사용
  const { data } = await client.get<OrderListResponse>(
    '/api/v1/seller/orders',
    {
      params: filters,
    },
  )
  return data
  */
}