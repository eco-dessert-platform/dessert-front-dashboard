import { client } from '@/shared/utils'

import {
  DeleteNoticesResponseSchema,
  NoticeDetailResponseSchema,
  NoticeListResponseSchema,
  NoticeMutationResponseSchema,
} from './notice.contract'

import type {
  CreateNoticeInput,
  DeleteNoticesResult,
  GetNoticeListRequestParams,
  NoticeDetail,
  NoticeListResult,
  NoticeMutationRequest,
  UpdateNoticeInput,
} from './notice.type'

const NOTICE_BASE_URL = '/api/v1/admin/notifications'

/** 등록/수정 공통 multipart 구성. 본문 이미지는 파일 파트로 따로 붙인다 */
/** 인스턴스 기본 헤더가 JSON이라 multipart 요청은 매번 덮어써야 한다 */
const MULTIPART_CONFIG = {
  headers: { 'Content-Type': 'multipart/form-data' },
}

const buildNoticeFormData = (
  request: NoticeMutationRequest,
  images: File[] = [],
) => {
  const formData = new FormData()
  formData.append(
    'request',
    new Blob([JSON.stringify(request)], { type: 'application/json' }),
  )
  images.forEach((file) => {
    formData.append('profileImage', file, file.name)
  })

  return formData
}

export const getNotices = async (
  params: GetNoticeListRequestParams = {},
): Promise<NoticeListResult> => {
  const response = await client.get(NOTICE_BASE_URL, { params })
  const parsed = NoticeListResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}

export const getNoticeDetail = async (
  noticeId: number,
): Promise<NoticeDetail> => {
  const response = await client.get(`${NOTICE_BASE_URL}/${noticeId}`)
  const parsed = NoticeDetailResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}

export const createNotice = async ({
  adminId,
  request,
  images,
}: CreateNoticeInput): Promise<void> => {
  const response = await client.post(
    `${NOTICE_BASE_URL}/${adminId}/register`,
    buildNoticeFormData(request, images),
    MULTIPART_CONFIG,
  )
  const parsed = NoticeMutationResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
}

export const updateNotice = async ({
  noticeId,
  request,
  images,
}: UpdateNoticeInput): Promise<void> => {
  const response = await client.put(
    `${NOTICE_BASE_URL}/${noticeId}`,
    buildNoticeFormData(request, images),
    MULTIPART_CONFIG,
  )
  const parsed = NoticeMutationResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
}

export const deleteNotices = async (
  noticeIds: number[],
): Promise<DeleteNoticesResult> => {
  const response = await client.delete(NOTICE_BASE_URL, { data: noticeIds })
  const parsed = DeleteNoticesResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}
