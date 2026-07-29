import { isAxiosError } from 'axios'

import { client } from '@/shared/utils'

import {
  AdminSellerApplicationApproveListResponseSchema,
  AdminSellerApplicationListResponseSchema,
  AdminSellerApplicationRejectListResponseSchema,
  AdminSellerDocumentDownloadRequestSchema,
} from './member-approval.contract'

import type {
  AdminSellerApplicationApproveListResult,
  AdminSellerApplicationListResult,
  AdminSellerApplicationRejectListResult,
  AdminSellerDocumentDownloadRequest,
  AdminSellerDocumentDownloadResult,
  GetAdminSellerApplicationsRequestParams,
  StoreApplicationApprove,
  StoreApplicationIds,
} from './member-approval.type'

const DEFAULT_DOCUMENTS_FILENAME = 'documents.zip'

const getFilenameFromContentDisposition = (
  contentDisposition: string | undefined,
) => {
  if (!contentDisposition) return DEFAULT_DOCUMENTS_FILENAME

  const utf8Filename = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i)
  if (utf8Filename?.[1]) {
    return decodeURIComponent(utf8Filename[1])
  }

  const filename = contentDisposition.match(/filename="?([^";]+)"?/i)

  return filename?.[1] ?? DEFAULT_DOCUMENTS_FILENAME
}

const getBlobErrorMessage = async (blob: Blob) => {
  try {
    const text = await blob.text()
    const parsed = JSON.parse(text) as { message?: string }

    return parsed.message
  } catch {
    return undefined
  }
}

export const getAdminSellerApplications = async (
  params: GetAdminSellerApplicationsRequestParams = {},
): Promise<AdminSellerApplicationListResult> => {
  const response = await client.get('/api/v1/admin/sellers', { params })
  const parsed = AdminSellerApplicationListResponseSchema.parse(response.data)

  if (!parsed.success) throw new Error(parsed.message)

  return parsed.result
}

export const approveAdminSellerApplications = async (
  body: StoreApplicationApprove[],
): Promise<AdminSellerApplicationApproveListResult> => {
  const response = await client.put('/api/v1/admin/sellers/approve', body)
  const parsed = AdminSellerApplicationApproveListResponseSchema.parse(
    response.data,
  )

  if (!parsed.success) throw new Error(parsed.message)

  return parsed.result
}

export const rejectAdminSellerApplications = async (
  body: StoreApplicationIds,
): Promise<AdminSellerApplicationRejectListResult> => {
  const response = await client.patch('/api/v1/admin/sellers/reject', body)
  const parsed = AdminSellerApplicationRejectListResponseSchema.parse(
    response.data,
  )

  if (!parsed.success) throw new Error(parsed.message)

  return parsed.result
}

export const downloadAdminSellerDocuments = async (
  body: AdminSellerDocumentDownloadRequest,
): Promise<AdminSellerDocumentDownloadResult> => {
  const requestBody = AdminSellerDocumentDownloadRequestSchema.parse(body)

  try {
    const response = await client.post<Blob>(
      '/api/v1/admin/sellers/documents/download',
      requestBody,
      { responseType: 'blob' },
    )

    return {
      blob: response.data,
      filename: getFilenameFromContentDisposition(
        response.headers['content-disposition'],
      ),
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.data instanceof Blob) {
      const message = await getBlobErrorMessage(error.response.data)
      throw new Error(message ?? '셀러 제출 서류 다운로드에 실패했습니다.')
    }

    throw error
  }
}
