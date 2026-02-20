import { getMockOrderListResponse } from './order.mock'
import { OrderFilters, OrderListResponse } from './order.type'

export async function getOrders(
  filters: OrderFilters,
): Promise<OrderListResponse> {
  const page = filters.page ? Number(filters.page) : 0
  const size = filters.size ? Number(filters.size) : 10

  return getMockOrderListResponse(filters.tab, page, size)
}
