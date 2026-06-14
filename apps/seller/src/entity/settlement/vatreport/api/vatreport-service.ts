import type { ApiResponse } from '@/entity/auth/types'
import type {
  IVatReportFilter,
  IVatReportResponse,
} from '@/entity/settlement/vatreport/entities'
import { client } from '@/shared/utils/axios'
import { AxiosInstance } from 'axios'
import { format, parseISO } from 'date-fns'

interface FieldError {
  field: string
  msg: string
}

interface VatReportResponse extends ApiResponse<IVatReportResponse> {
  fieldErrors?: FieldError[]
}

const toMonthParam = (date?: string) => {
  if (!date) {
    return undefined
  }

  return format(parseISO(date), 'yyyy-MM')
}

class VatService {
  constructor(private readonly http: AxiosInstance) {}

  async getVatReport(
    filters: IVatReportFilter = {},
  ): Promise<IVatReportResponse> {
    const { data } = await this.http.get<VatReportResponse>(
      '/api/v1/seller/vat',
      {
        params: {
          startMonth: toMonthParam(filters.startDate),
          endMonth: toMonthParam(filters.endDate),
        },
      },
    )

    if (!data.success || !data.result) {
      throw new Error(data.message ?? '부가세 신고 내역 조회에 실패했습니다.')
    }

    return data.result
  }
}

export const vatService = new VatService(client)
