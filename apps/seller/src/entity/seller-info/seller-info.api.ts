import type { ApiResponse } from '@/entity/auth/types'
import { client } from '@/shared/utils/axios'

import type {
  MyStoreSummary,
  SellerAccountUpdateRequest,
  UpdateStoreNameRequest,
  UpdateStoreNameResult,
} from './seller-info.type'

export async function getStore(): Promise<MyStoreSummary> {
  const { data } = await client.get<ApiResponse<MyStoreSummary>>(
    '/api/v1/seller/stores',
  )

  if (!data.result) {
    throw new Error(data.message ?? '스토어 정보 조회에 실패했습니다.')
  }

  return data.result
}

export async function requestStoreNameChange(
  payload: UpdateStoreNameRequest,
): Promise<UpdateStoreNameResult> {
  const { data } = await client.post<ApiResponse<UpdateStoreNameResult>>(
    '/api/v1/seller/stores/store-names',
    { newName: payload.newName.trim() },
  )

  if (!data.result) {
    throw new Error(data.message ?? '스토어명 변경 신청에 실패했습니다.')
  }

  return data.result
}

export async function updateSellerAccount(
  payload: SellerAccountUpdateRequest,
): Promise<void> {
  const sanitized: SellerAccountUpdateRequest = {
    ...payload,
    accountNumber: payload.accountNumber.replace(/\D/g, ''),
  }

  const { data } = await client.patch<ApiResponse<unknown>>(
    '/api/v1/seller/sellers/account',
    sanitized,
  )

  if (!data.success) {
    throw new Error(data.message ?? '계좌 정보 변경에 실패했습니다.')
  }
}
