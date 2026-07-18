import { createQueryKeys } from '@lukemorales/query-key-factory'
import { createQuery } from 'react-query-kit'

import { getAdminSellerApplications } from './member-approval.api'

import type {
  AdminSellerApplicationListResult,
  GetAdminSellerApplicationsRequestParams,
} from './member-approval.type'

export const memberApprovalQueries = createQueryKeys('member-approval', {
  sellerApplicationList: null,
})

export const useSellerApplicationListQuery = createQuery<
  AdminSellerApplicationListResult,
  GetAdminSellerApplicationsRequestParams
>({
  queryKey: memberApprovalQueries.sellerApplicationList.queryKey,
  fetcher: (params) => getAdminSellerApplications(params),
})
