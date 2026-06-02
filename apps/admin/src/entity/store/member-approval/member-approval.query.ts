import { queryOptions } from '@tanstack/react-query'

import { getAdminSellers } from './member-approval.api'

import type { GetAdminSellersRequestParams } from './member-approval.type'

export const memberApprovalQueries = {
  all: () => ['admin-sellers'] as const,

  list: (params: GetAdminSellersRequestParams = {}) =>
    queryOptions({
      queryKey: [...memberApprovalQueries.all(), params],
      queryFn: () => getAdminSellers(params),
    }),
}
