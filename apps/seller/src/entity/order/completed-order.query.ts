import { queryOptions } from '@tanstack/react-query'

import { getCompletedOrders } from './completed-order.api'
import { CompletedOrderFilters } from './order.type'

export const completedOrderQueries = {
  all: () => ['completed-order'],
  lists: () => [...completedOrderQueries.all(), 'list'],
  list: (filters: CompletedOrderFilters) =>
    queryOptions({
      queryKey: [...completedOrderQueries.lists(), filters],
      queryFn: () => getCompletedOrders(filters),
    }),
}
