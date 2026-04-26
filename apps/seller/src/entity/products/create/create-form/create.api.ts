import { client } from '@/shared/utils/axios'

import { ApiResponse, StoreInfo } from './create.type'

// storeId 조회
export const getMyStore = async () => {
  const response = await client.get<ApiResponse<{ store: StoreInfo }>>(
    '/api/v1/seller/stores',
  )
  return response.data.result.store
}

// 상품 등록
export const createProduct = async (formData: FormData) => {
  const response = await client.post('/api/v1/seller/boards', formData)
  return response.data
}
