import { queryOptions } from '@tanstack/react-query'

import { getOrderDetails, getOrders } from './order.api'
import { OrderFilters } from './order.type'

export const orderQueries = {
  all: () => ['order'],
  lists: () => [...orderQueries.all(), 'list'],
  list: (filters: OrderFilters) =>
    queryOptions({
      queryKey: [...orderQueries.lists(), filters],
      queryFn: () => getOrders(filters),
    }),
  details: () => [...orderQueries.all(), 'detail'],
  // orderItemIds는 wire 직전 string 표현(int64 ID의 문자열). 변환은 getOrderDetails 내부에서 1회 수행.
  detail: (orderItemIds: string[]) =>
    queryOptions({
      queryKey: [...orderQueries.details(), [...orderItemIds].sort()],
      queryFn: () => getOrderDetails(orderItemIds),
    }),
}
