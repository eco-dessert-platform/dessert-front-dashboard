import type { ApiResponse } from '@/entity/auth/types'
import { VAT_EXCEL_FILE_NAME } from '@/entity/settlement/vatreport/constants'
import type {
  IVatExcelDownloadRequest,
  IVatReportFilter,
  IVatReportResponse,
} from '@/entity/settlement/vatreport/entities'
import { client } from '@/shared/utils/axios'
import {
  getFileNameFromContentDisposition,
  triggerFileDownload,
} from '@/shared/utils/file-download'
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

  async downloadExcel(request: IVatExcelDownloadRequest): Promise<void> {
    const { data, headers } = await this.http.get<Blob>(
      '/api/v1/seller/vat/excel',
      {
        params: {
          startMonth: toMonthParam(request.startDate),
          endMonth: toMonthParam(request.endDate),
          type: request.type,
        },
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
      VAT_EXCEL_FILE_NAME[request.type],
    )

    triggerFileDownload(data, fileName)
  }
}

export const vatService = new VatService(client)
