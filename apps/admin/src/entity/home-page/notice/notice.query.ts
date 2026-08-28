import { createQueryKeys } from '@lukemorales/query-key-factory'
import { createQuery } from 'react-query-kit'

import { getNoticeDetail, getNotices } from './notice.api'

import type {
  GetNoticeListRequestParams,
  NoticeDetail,
  NoticeListResult,
} from './notice.type'

export const noticeQueries = createQueryKeys('notices', {
  list: null,
  detail: null,
})

export const useNoticeListQuery = createQuery<
  NoticeListResult,
  GetNoticeListRequestParams
>({
  queryKey: noticeQueries.list.queryKey,
  fetcher: (params) => getNotices(params),
})

export const useNoticeDetailQuery = createQuery<
  NoticeDetail,
  { noticeId: number }
>({
  queryKey: noticeQueries.detail.queryKey,
  fetcher: ({ noticeId }) => getNoticeDetail(noticeId),
})
