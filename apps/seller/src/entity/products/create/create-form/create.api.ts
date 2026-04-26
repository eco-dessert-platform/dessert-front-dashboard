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

// ✅ 확인 필요: 이미지 업로드 API
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('image', file) // ✅ 확인 필요: key 이름
  const response = await client.post<{ result: { url: string } }>(
    '/api/v1/images', // ✅ 확인 필요: 엔드포인트
    formData,
  )
  return response.data.result.url
}
