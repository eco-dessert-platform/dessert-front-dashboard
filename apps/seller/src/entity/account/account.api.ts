import { isAxiosError } from 'axios'

import type { ApiResponse } from '@/entity/auth/types'
import { client } from '@/shared/utils/axios'

import type { AccountVerificationDetail } from './account.type'

export async function getAccountVerification(): Promise<AccountVerificationDetail | null> {
  try {
    const { data } = await client.get<ApiResponse<AccountVerificationDetail>>(
      '/api/v1/seller/sellers/account-verifications',
    )

    return data.result ?? null
  } catch (err) {
    // 인증 이력 없음: 스펙은 404, 실제 디플로이는 400 — 둘 다 "아직 인증 안 함"으로 흡수.
    if (isAxiosError(err)) {
      const status = err.response?.status
      if (status === 400 || status === 404) return null
    }
    throw err
  }
}
