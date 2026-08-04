import { client } from '@/shared/utils'

import {
  UpdateStoreNameApproveResponseSchema,
  UpdateStoreNameRejectResponseSchema,
  UpdateStoreNameRequestListResponseSchema,
} from './name-change-approval.contract'

import type {
  GetUpdateStoreNameRequestsParams,
  UpdateStoreNameApproveResult,
  UpdateStoreNameRejectRequest,
  UpdateStoreNameRejectResult,
  UpdateStoreNameRequestListResult,
} from './name-change-approval.type'

export const getUpdateStoreNameRequests = async (
  params: GetUpdateStoreNameRequestsParams = {},
): Promise<UpdateStoreNameRequestListResult> => {
  const response = await client.get('/api/v1/admin/stores', { params })
  const parsed = UpdateStoreNameRequestListResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}

export const approveUpdateStoreNameRequest = async (
  requestId: number,
): Promise<UpdateStoreNameApproveResult> => {
  const response = await client.patch(
    `/api/v1/admin/stores/${requestId}/approve`,
  )
  const parsed = UpdateStoreNameApproveResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}

export const rejectUpdateStoreNameRequest = async (
  requestId: number,
  body: UpdateStoreNameRejectRequest,
): Promise<UpdateStoreNameRejectResult> => {
  const response = await client.patch(
    `/api/v1/admin/stores/${requestId}/reject`,
    body,
  )
  const parsed = UpdateStoreNameRejectResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}
