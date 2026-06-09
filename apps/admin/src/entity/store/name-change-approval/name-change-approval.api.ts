import { client } from '@/shared/utils'

import { UpdateStoreNameListResponseSchema } from './name-change-approval.contract'

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
