import { client } from '@/shared/utils'

import {
  CreateAdminStoreResponseSchema,
  DeleteAdminStoresResponseSchema,
  RegisteredStoreListResponseSchema,
  UpdateAdminStoreResponseSchema,
} from './store-registration.contract'

import type {
  CreateAdminStoreInput,
  DeleteAdminStoresRequestParams,
  GetRegisteredStoresRequestParams,
  RegisteredStoreListResult,
  StoreDetailResponse,
  UpdateAdminStoreParams,
} from './store-registration.type'

export const getRegisteredStores = async (
  params: GetRegisteredStoresRequestParams = {},
): Promise<RegisteredStoreListResult> => {
  const response = await client.get('/api/v1/admin/stores/registered', {
    params,
  })
  const parsed = RegisteredStoreListResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}

export const updateAdminStore = async ({
  storeId,
  body,
}: UpdateAdminStoreParams): Promise<StoreDetailResponse> => {
  const response = await client.patch(`/api/v1/admin/stores/${storeId}`, body)
  const parsed = UpdateAdminStoreResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}

export const deleteAdminStores = async ({
  storeIds,
}: DeleteAdminStoresRequestParams): Promise<void> => {
  const response = await client.delete('/api/v1/admin/stores', {
    params: { storeIds },
  })
  const parsed = DeleteAdminStoresResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
}

export const createAdminStore = async ({
  request,
  profileImage,
}: CreateAdminStoreInput): Promise<StoreDetailResponse> => {
  const formData = new FormData()
  formData.append(
    'request',
    new Blob([JSON.stringify(request)], { type: 'application/json' }),
  )
  formData.append('profileImage', profileImage)

  const response = await client.post('/api/v1/admin/stores', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  const parsed = CreateAdminStoreResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}
