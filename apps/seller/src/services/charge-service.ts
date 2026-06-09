import type { ApiResponse } from '@/entity/auth/types'
import type {
  IChargeFilter,
  IChargePageResponse,
} from '@/entity/settlement/charge/entities'
import { client } from '@/shared/utils/axios'
import { AxiosInstance } from 'axios'

interface FieldError {
  field: string
  msg: string
}

export interface ChargeBalanceResult {
  chargeBalance: number
  pageResponse: IChargePageResponse
}

interface ChargeBalanceResponse extends ApiResponse<ChargeBalanceResult> {
  fieldErrors?: FieldError[]
}

class ChargeService {
  constructor(private readonly http: AxiosInstance) {}

  async getChargeBalance(
    filters: IChargeFilter = {},
  ): Promise<ChargeBalanceResult> {
    const { data } = await this.http.get<ChargeBalanceResponse>(
      '/api/v1/seller/charge-balance',
      {
        params: {
          ...filters,
        },
      },
    )

    if (!data.success || !data.result) {
      throw new Error(data.message ?? '충전금 조회에 실패했습니다.')
    }

    return data.result
  }
}

export const chargeService = new ChargeService(client)
