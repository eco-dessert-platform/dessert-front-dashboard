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
  // FormData 전달 시 Content-Type을 수동 지정하지 않습니다.
  // Axios가 boundary를 포함한 multipart/form-data 헤더를 자동으로 설정합니다.
  const response = await client.post<ApiResponse<CreateProductBoardResult>>(
    '/api/v1/seller/boards',
    formData,
  )
  return response.data
}

/** @deprecated createProductBoard 사용을 권장합니다. */
export const createProduct = createProductBoard
