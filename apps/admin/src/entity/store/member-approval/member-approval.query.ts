import { queryOptions } from '@tanstack/react-query'

import { getMemberApprovals } from './member-approval.api'

import type { GetMemberApprovalsParams } from './member-approval.type'

export const memberApprovalQueries = {
  all: () => ['member-approval'] as const,
  lists: () => [...memberApprovalQueries.all(), 'list'] as const,
  list: (params: GetMemberApprovalsParams = {}) =>
    queryOptions({
      queryKey: [...memberApprovalQueries.lists(), params],
      queryFn: () => getMemberApprovals(params),
    }),
}
