import { isAxiosError } from 'axios'

import type { ApiResponse } from '@/entity/auth/types'
import { client } from '@/shared/utils/axios'

import type { AccountVerificationDetail } from './seller-info.type'

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
