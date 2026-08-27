export interface Notice {
  id: number
  title: string
  createdAt: string
  modifiedAt: string
}

export interface NoticeFormValues {
  title: string
  content: string
}

export interface GetNoticeListRequestParams {
  page?: number
  size?: number
  sort?: string[]
}

export interface NoticeListResult {
  content: NoticeListItem[]
  page: number
  size: number
  totalPages: number
  totalElements: number
}

export interface NoticeListItem {
  noticeId: number
  title: string
  createAt: string
  modifiedAt: string
}

export interface NoticeDetail {
  noticeId: number
  title: string
  content: string
  imageLinks: string[]
  createAt: string
  modifiedAt: string
}

export interface NoticeMutationRequest {
  title: string
  content: string
}

export interface CreateNoticeInput {
  adminId: number
  request: NoticeMutationRequest
  images?: File[]
}

export interface UpdateNoticeInput {
  noticeId: number
  request: NoticeMutationRequest
  images?: File[]
}

export interface DeleteNoticesResult {
  successCount: number
  failureCount: number
  failedNotices: { id: number; title: string }[]
}
