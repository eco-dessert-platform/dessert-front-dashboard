import { queryOptions } from '@tanstack/react-query'

import { getUploadApprovals } from './upload-approval.api'

import type { GetUploadApprovalsRequestParams } from './upload-approval.type'

export const productQueries = {
  all: () => ['products'] as const,
  uploadApprovals: () => [...productQueries.all(), 'upload-approvals'] as const,

  uploadApprovalList: (params: GetUploadApprovalsRequestParams = {}) =>
    queryOptions({
      queryKey: [...productQueries.uploadApprovals(), params],
      queryFn: () => getUploadApprovals(params),
    }),
}
