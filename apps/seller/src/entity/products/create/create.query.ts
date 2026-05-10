import { queryOptions } from '@tanstack/react-query'

import { getMyStore } from './create.api'

export const productQueries = {
  all: () => ['products'] as const,
  myStore: () =>
    queryOptions({
      queryKey: [...productQueries.all(), 'myStore'],
      queryFn: getMyStore,
    }),
}
