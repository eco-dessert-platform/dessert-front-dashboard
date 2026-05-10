import { queryOptions } from '@tanstack/react-query'

import { getAdminProducts } from './management-all.api'

import type { GetAdminProductsRequestParams } from './management-all.type'

export const managementAllQueries = {
  all: () => ['management-all'] as const,
  products: () => [...managementAllQueries.all(), 'products'] as const,
  productList: (params: GetAdminProductsRequestParams = {}) =>
    queryOptions({
      queryKey: [...managementAllQueries.products(), params],
      queryFn: () => getAdminProducts(params),
    }),
}
