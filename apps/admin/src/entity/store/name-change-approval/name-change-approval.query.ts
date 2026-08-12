import { createQueryKeys } from '@lukemorales/query-key-factory'
import { createQuery } from 'react-query-kit'

import { getUpdateStoreNameRequests } from './name-change-approval.api'

import type {
  GetUpdateStoreNameRequestsParams,
  UpdateStoreNameRequestListResult,
} from './name-change-approval.type'

export const storeNameChangeQueries = createQueryKeys('stores', {
  nameChangeRequestList: null,
})

export const useStoreNameChangeRequestListQuery = createQuery<
  UpdateStoreNameRequestListResult,
  GetUpdateStoreNameRequestsParams
>({
  queryKey: storeNameChangeQueries.nameChangeRequestList.queryKey,
  fetcher: (params) => getUpdateStoreNameRequests(params),
})
