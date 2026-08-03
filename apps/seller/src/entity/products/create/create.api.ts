import { client } from '@/shared/utils/axios'

import {
  ApiResponse,
  CreateProductBoardResult,
  StoreInfo,
} from './create.type'

// storeId 조회
export const getMyStore = async () => {
  const response = await client.get<ApiResponse<{ store: StoreInfo }>>(
    '/api/v1/seller/stores',
  )
  return response.data.result.store
}

export const createProductBoard = async (formData: FormData) => {
  const response = await client.post<ApiResponse<CreateProductBoardResult>>(
    '/api/v1/seller/boards',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
  return response.data
}

/** @deprecated createProductBoard 사용을 권장합니다. */
export const createProduct = createProductBoard
