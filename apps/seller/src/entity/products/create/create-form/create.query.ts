import { queryOptions } from '@tanstack/react-query'

import { getMyStore } from './create.api'

export const productKeys = {
  all: ['products'] as const,
  myStore: () => [...productKeys.all, 'myStore'] as const,
}

export const productQueries = {
  myStore: () =>
    queryOptions({
      queryKey: productKeys.myStore(),
      queryFn: getMyStore,
    }),
}
