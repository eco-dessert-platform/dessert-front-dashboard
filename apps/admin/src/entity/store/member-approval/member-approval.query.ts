import { queryOptions } from '@tanstack/react-query'

import { getAdminSellerApplications } from './member-approval.api'

import type { GetAdminSellerApplicationsRequestParams } from './member-approval.type'

export const memberApprovalQueries = {
  all: () => ['member-approval'] as const,
  sellerApplications: () =>
    [...memberApprovalQueries.all(), 'seller-applications'] as const,
  sellerApplicationList: (
    params: GetAdminSellerApplicationsRequestParams = {},
  ) =>
    queryOptions({
      queryKey: [...memberApprovalQueries.sellerApplications(), params],
      queryFn: () => getAdminSellerApplications(params),
    }),
}
