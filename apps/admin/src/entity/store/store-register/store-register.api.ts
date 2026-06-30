import { client } from '@/shared/utils'

import {
  DeleteStoresResponseSchema,
  StoreMutationResponseSchema,
} from './store-register.contract'

import type {
  CreateStoreInput,
  Store,
  UpdateStoreInput,
} from './store-register.type'

export const createStore = async ({
  request,
  profileImage,
}: CreateStoreInput): Promise<Store> => {
  const formData = new FormData()
  formData.append(
    'request',
    new Blob([JSON.stringify(request)], { type: 'application/json' }),
  )
  if (profileImage) {
    formData.append('profileImage', profileImage)
  }

  const response = await client.post('/api/v1/admin/stores', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  const parsed = StoreMutationResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}

export const updateStore = async ({
  storeId,
  request,
}: UpdateStoreInput): Promise<Store> => {
  const response = await client.patch(
    `/api/v1/admin/stores/${storeId}`,
    request,
  )
  const parsed = StoreMutationResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}

export const deleteStores = async (storeIds: number[]): Promise<void> => {
  const response = await client.delete('/api/v1/admin/stores', {
    params: { storeIds },
  })
  const parsed = DeleteStoresResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
}
