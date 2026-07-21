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

  try {
    const parsed = parseISO(date)
    return Number.isNaN(parsed.getTime()) ? undefined : format(parsed, 'yyyy-MM')
  } catch {
    return undefined
  }
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

    if (data.type?.startsWith('application/json')) {
      const fallbackMessage = '엑셀 다운로드에 실패했습니다.'
      let message: string | undefined

      try {
        const errorText = await data.text()
        message = (JSON.parse(errorText) as { message?: string }).message
      } catch {
        // JSON 파싱 실패 시 기본 메시지 사용
      }

      throw new Error(message ?? fallbackMessage)
    }

    const fileName = getFileNameFromContentDisposition(
      headers['content-disposition'],
      VAT_EXCEL_FILE_NAME[request.type],
    )

    triggerFileDownload(data, fileName)
  }
}

export const vatService = new VatService(client)
