import { client } from '@/shared/utils'

import {
  AdminSellerApplicationApproveListResponseSchema,
  AdminSellerApplicationListResponseSchema,
  AdminSellerApplicationRejectListResponseSchema,
} from './member-approval.contract'

import type {
  AdminSellerApplicationApproveListResult,
  AdminSellerApplicationListResult,
  AdminSellerApplicationRejectListResult,
  GetAdminSellerApplicationsRequestParams,
  StoreApplicationApprove,
  StoreApplicationIds,
} from './member-approval.type'

export const getAdminSellerApplications = async (
  params: GetAdminSellerApplicationsRequestParams = {},
): Promise<AdminSellerApplicationListResult> => {
  const response = await client.get('/api/v1/admin/sellers', { params })
  const parsed = AdminSellerApplicationListResponseSchema.parse(response.data)

  if (!parsed.success) throw new Error(parsed.message)

  return parsed.result
}

export const approveAdminSellerApplications = async (
  body: StoreApplicationApprove[],
): Promise<AdminSellerApplicationApproveListResult> => {
  const response = await client.put('/api/v1/admin/sellers/approve', body)
  const parsed = AdminSellerApplicationApproveListResponseSchema.parse(
    response.data,
  )

  if (!parsed.success) throw new Error(parsed.message)

  return parsed.result
}

export const rejectAdminSellerApplications = async (
  body: StoreApplicationIds,
): Promise<AdminSellerApplicationRejectListResult> => {
  const response = await client.patch('/api/v1/admin/sellers/reject', body)
  const parsed = AdminSellerApplicationRejectListResponseSchema.parse(
    response.data,
  )

  if (!parsed.success) throw new Error(parsed.message)

  return parsed.result
}
