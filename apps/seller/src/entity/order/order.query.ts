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
  detail: (orderItemIds: number[]) =>
    queryOptions({
      queryKey: [...orderQueries.details(), orderItemIds],
      queryFn: () => getOrderDetails(orderItemIds),
    }),
}
