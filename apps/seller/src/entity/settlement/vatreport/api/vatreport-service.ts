import type { ApiResponse } from '@/entity/auth/types'
import type {
  IVatReportExcelRequest,
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

const getFileNameFromContentDisposition = (contentDisposition?: string) => {
  if (!contentDisposition) {
    return '부가세신고내역.xlsx'
  }

  const match = contentDisposition.match(
    /filename\*?=(?:UTF-8''|")?([^";\n]+)/i,
  )

  return match?.[1]
    ? decodeURIComponent(match[1].replace(/"/g, ''))
    : '부가세신고내역.xlsx'
}

const triggerFileDownload = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}

const buildExcelRequest = (
  filters: IVatReportFilter,
): IVatReportExcelRequest => ({
  dateType: 'BASE_DATE',
  startDate: filters.startDate,
  endDate: filters.endDate,
  status: 'ALL',
  paymentHoldId: 0,
  settlementId: '',
})

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

  async downloadExcel(filters: IVatReportFilter = {}): Promise<void> {
    const { data, headers } = await this.http.post<Blob>(
      '/api/v1/seller/payment-hold/excel',
      buildExcelRequest(filters),
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
    )

    triggerFileDownload(data, fileName)
  }
}

export const vatService = new VatService(client)
