import type { ApiResponse } from '@/entity/auth/types'
import { client } from '@/shared/utils/axios'

import type { StoreNameCheckResult } from './store.type'

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
