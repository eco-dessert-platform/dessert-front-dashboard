import { queryOptions } from '@tanstack/react-query'

import { getUpdateStoreNames } from './name-change-approval.api'

import type { GetUpdateStoreNamesRequestParams } from './name-change-approval.type'

export const nameChangeApprovalQueries = {
  all: () => ['admin-store-name-changes'] as const,

  list: (params: GetUpdateStoreNamesRequestParams = {}) =>
    queryOptions({
      queryKey: [...nameChangeApprovalQueries.all(), params],
      queryFn: () => getUpdateStoreNames(params),
    }),
}
