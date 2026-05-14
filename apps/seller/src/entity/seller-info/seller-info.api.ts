import { isAxiosError } from 'axios'

import type { ApiResponse } from '@/entity/auth/types'
import { client } from '@/shared/utils/axios'

import type {
  AccountVerificationDetail,
  StoreNameCheckResult,
  UpdateStoreNameRequest,
  UpdateStoreNameResult,
} from './seller-info.type'

export async function checkStoreName(
  storeName: string,
): Promise<StoreNameCheckResult> {
  const { data } = await client.get<ApiResponse<StoreNameCheckResult>>(
    '/api/v1/seller/stores/check-name',
    {
      params: { storeName: storeName.trim() },
    },
  )

  if (!data.result) {
    throw new Error(data.message ?? '스토어 중복 확인에 실패했습니다.')
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

export async function getAccountVerification(): Promise<AccountVerificationDetail | null> {
  try {
    const { data } = await client.get<ApiResponse<AccountVerificationDetail>>(
      '/api/v1/seller/sellers/account-verifications',
    )

    return data.result ?? null
  } catch (err) {
    // 계좌 인증 이력이 없으면 400 — 에러가 아니라 "아직 인증 안 함" 상태이므로 null
    if (isAxiosError(err) && err.response?.status === 400) return null
    throw err
  }
}
