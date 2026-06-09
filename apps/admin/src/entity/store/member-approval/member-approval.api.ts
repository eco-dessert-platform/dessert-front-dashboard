import { client } from '@/shared/utils'

import {
  AdminSellerListResponseSchema,
  ApproveSellersResponseSchema,
  RejectSellersResponseSchema,
} from './member-approval.contract'

import type {
  AdminSellerListResult,
  ApproveSellersRequest,
  ApproveSellersResult,
  GetAdminSellersRequestParams,
  RejectSellersRequest,
  RejectSellersResult,
} from './member-approval.type'

export const getAdminSellers = async (
  params: GetAdminSellersRequestParams = {},
): Promise<AdminSellerListResult> => {
  const response = await client.get('/api/v1/admin/sellers', { params })
  const parsed = AdminSellerListResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}

export const approveSellers = async (
  body: ApproveSellersRequest,
): Promise<ApproveSellersResult> => {
  const response = await client.put('/api/v1/admin/sellers/approve', body)
  const parsed = ApproveSellersResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}

export const rejectSellers = async (
  body: RejectSellersRequest,
): Promise<RejectSellersResult> => {
  const response = await client.patch('/api/v1/admin/sellers/reject', body)
  const parsed = RejectSellersResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}
