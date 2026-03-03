import { queryOptions } from '@tanstack/react-query'
import { OrderFilters } from './order.type'
import { getOrders } from './order.api'

export const orderQueries = {
  all: () => ['order'],
  lists: () => [...orderQueries.all(), 'list'],
  list: (filters: OrderFilters) =>
    queryOptions({
      queryKey: [...orderQueries.lists(), filters],
      queryFn: () => getOrders(filters),
    }),
}
