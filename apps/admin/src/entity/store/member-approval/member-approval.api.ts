import { client } from '@/shared/utils'

import { AdminSellerApplicationListResponseSchema } from './member-approval.contract'

import type {
  AdminSellerApplicationListResult,
  GetAdminSellerApplicationsRequestParams,
} from './member-approval.type'

export const getAdminSellerApplications = async (
  params: GetAdminSellerApplicationsRequestParams = {},
): Promise<AdminSellerApplicationListResult> => {
  const response = await client.get('/api/v1/admin/sellers', { params })
  const parsed = AdminSellerApplicationListResponseSchema.parse(response.data)

  if (!parsed.success) throw new Error(parsed.message)

  return parsed.result
}
