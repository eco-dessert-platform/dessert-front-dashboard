import { queryOptions } from '@tanstack/react-query'

import { getUpdateStoreNameRequests } from './name-change-approval.api'

import type { GetUpdateStoreNameRequestsParams } from './name-change-approval.type'

export const storeNameChangeQueries = {
  all: () => ['stores'] as const,
  nameChangeRequests: () =>
    [...storeNameChangeQueries.all(), 'name-change-requests'] as const,

  nameChangeRequestList: (params: GetUpdateStoreNameRequestsParams = {}) =>
    queryOptions({
      queryKey: [...storeNameChangeQueries.nameChangeRequests(), params],
      queryFn: () => getUpdateStoreNameRequests(params),
    }),
}
