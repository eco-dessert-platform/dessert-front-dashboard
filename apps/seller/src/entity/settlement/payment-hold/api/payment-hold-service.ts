import type { ApiResponse } from '@/entity/auth/types'
import type {
  IPaymentHoldPageResponse,
  IPaymentHoldRequest,
} from '@/entity/settlement/payment-hold/entities'
import { client } from '@/shared/utils/axios'
import {
  getFileNameFromContentDisposition,
  triggerFileDownload,
} from '@/shared/utils/file-download'
import { AxiosInstance } from 'axios'

interface FieldError {
  field: string
  msg: string
}

interface PaymentHoldListResult {
  pageResponse: IPaymentHoldPageResponse
}

interface PaymentHoldListResponse extends ApiResponse<PaymentHoldListResult> {
  fieldErrors?: FieldError[]
}

class PaymentHoldService {
  constructor(private readonly http: AxiosInstance) {}

  async getPaymentHoldList(
    request: IPaymentHoldRequest,
  ): Promise<IPaymentHoldPageResponse> {
    const { data } = await this.http.get<PaymentHoldListResponse>(
      '/api/v1/seller/payment-hold',
      {
        params: request,
      },
    )

    if (!data.success || !data.result?.pageResponse) {
      throw new Error(data.message ?? '지급 보류 내역 조회에 실패했습니다.')
    }

    return data.result.pageResponse
  }

  async downloadExcel(request: IPaymentHoldRequest): Promise<void> {
    const { data, headers } = await this.http.post<Blob>(
      '/api/v1/seller/payment-hold/excel',
      request,
      {
        responseType: 'blob',
      },
    )

    if (data.type === 'application/json') {
      const errorText = await data.text()
      const error = JSON.parse(errorText) as { message?: string }
      throw new Error(error.message ?? '엑셀 다운로드에 실패했습니다.')
    }

    const fileName = getFileNameFromContentDisposition(
      headers['content-disposition'],
      '지급보류내역.xlsx',
    )

    triggerFileDownload(data, fileName)
  }
}

export const paymentHoldService = new PaymentHoldService(client)
