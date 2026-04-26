import { queryOptions } from '@tanstack/react-query'

import { getUploadApprovals } from './product.api'

import type { GetUploadApprovalsRequestParams } from './product.type'

export const productQueries = {
  all: () => ['products'] as const,
  uploadApprovals: () => [...productQueries.all(), 'upload-approvals'] as const,

  uploadApprovalList: (params: GetUploadApprovalsRequestParams = {}) =>
    queryOptions({
      queryKey: [...productQueries.uploadApprovals(), params],
      queryFn: () => getUploadApprovals(params),
    }),
}
