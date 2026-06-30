import { client } from '@/shared/utils'

import {
  UpdateStoreNameListResponseSchema,
  UpdateStoreNameMutationResponseSchema,
} from './name-change-approval.contract'

import type {
  GetUpdateStoreNamesRequestParams,
  UpdateStoreNameListResult,
} from './name-change-approval.type'

export const getUpdateStoreNames = async (
  params: GetUpdateStoreNamesRequestParams = {},
): Promise<UpdateStoreNameListResult> => {
  const response = await client.get('/api/v1/admin/stores', { params })
  const parsed = UpdateStoreNameListResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}

export const approveUpdateStoreName = async (
  requestId: number,
): Promise<void> => {
  const response = await client.patch(
    `/api/v1/admin/stores/${requestId}/approve`,
  )
  const parsed = UpdateStoreNameMutationResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
}

export const rejectUpdateStoreName = async (
  requestId: number,
): Promise<void> => {
  const response = await client.patch(
    `/api/v1/admin/stores/${requestId}/reject`,
  )
  const parsed = UpdateStoreNameMutationResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
}
