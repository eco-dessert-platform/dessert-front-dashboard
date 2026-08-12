import { useEffect, useMemo, useState } from 'react'

import { Table, toast } from '@dessert/ui'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

import {
  notificationQueries,
  useAdminNotificationsQuery,
  useDeleteAdminNotificationsMutation,
} from '@/entity/notification'
import { ROUTES } from '@/shared/constant/routes'

import { useNoticeManagementActionGuard } from './notice-management-action-guard.hook'
import { getNoticeManagementColumns } from './notice-management-columns.util'
import { NoticeManagementTopArea } from './notice-management-top-area.ui'

import type { NoticeManagementTableRow } from './notice-management.type'

const PAGE_SIZE = 10
const DEFAULT_SORT = 'createdAt,desc'
const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss'
const CUSTOMER_URL =
  import.meta.env.VITE_PUBLIC_CUSTOMER_URL ?? 'https://www.bbanggree.com'

const formatNoticeDateTime = (value: string) => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return value

  return format(date, DATE_TIME_FORMAT)
}

const pickNoticeId = (item: {
  id?: number
  noticeId?: number
  noticeID?: number
  noticeNo?: number
  notificationId?: number
  notificationID?: number
  notificationNo?: number
  adminNoticeId?: number
  adminNoticeID?: number
  adminNotificationId?: number
  adminNotificationID?: number
}) =>
  item.id ??
  item.noticeId ??
  item.noticeID ??
  item.noticeNo ??
  item.notificationId ??
  item.notificationID ??
  item.notificationNo ??
  item.adminNoticeId ??
  item.adminNoticeID ??
  item.adminNotificationId ??
  item.adminNotificationID

const toTableRow = (
  item: {
    id?: number
    noticeId?: number
    noticeID?: number
    noticeNo?: number
    notificationId?: number
    notificationID?: number
    notificationNo?: number
    adminNoticeId?: number
    adminNoticeID?: number
    adminNotificationId?: number
    adminNotificationID?: number
    title: string
    content?: string
    createAt: string
    modifiedAt: string
  },
  index: number,
  page: number,
): NoticeManagementTableRow => {
  const noticeId = pickNoticeId(item)

  return {
    id: String(noticeId ?? `${page}-${index}`),
    noticeId: noticeId ?? null,
    title: item.title,
    content: item.content ?? '',
    createdAt: formatNoticeDateTime(item.createAt),
    modifiedAt: formatNoticeDateTime(item.modifiedAt),
  }
}

export const NoticeManagementTable = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const { isActionPending, runWithActionGuard } =
    useNoticeManagementActionGuard()
  const { isPending: isDeleting, mutateAsync: deleteNotifications } =
    useDeleteAdminNotificationsMutation()

  const queryVariables = useMemo(
    () => ({
      page: currentPage - 1,
      size: PAGE_SIZE,
      sort: DEFAULT_SORT,
    }),
    [currentPage],
  )

  const { data, isError, isLoading } = useAdminNotificationsQuery({
    variables: queryVariables,
  })

  const tableData = useMemo(() => {
    return (
      data?.content.map((item, index) =>
        toTableRow(item, index, queryVariables.page),
      ) ?? []
    )
  }, [data?.content, queryVariables.page])

  const totalPages = data?.totalPages ?? 1

  useEffect(() => {
    const responseTotalPages = data?.totalPages

    if (responseTotalPages === undefined) return

    const maxPage = Math.max(responseTotalPages, 1)

    if (currentPage > maxPage) {
      setCurrentPage(maxPage)
    }
  }, [currentPage, data?.totalPages])

  useEffect(() => {
    setSelectedIds([])
  }, [currentPage])

  const allSelected =
    tableData.length > 0 && selectedIds.length === tableData.length

  const isTableActionDisabled = isActionPending || isLoading || isDeleting

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSelectedIds([])
  }

  const toggleAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedIds(tableData.map((row) => row.id))
      return
    }

    setSelectedIds([])
  }

  const toggleRow = (rowId: string, checked: boolean | 'indeterminate') => {
    setSelectedIds((prev) =>
      checked === true
        ? prev.includes(rowId)
          ? prev
          : [...prev, rowId]
        : prev.filter((id) => id !== rowId),
    )
  }

  const handleCreate = () => {
    void runWithActionGuard('create', async () => {
      navigate(ROUTES.HOMEPAGE.NOTICE_CREATE)
    })
  }

  const handleEdit = (row: NoticeManagementTableRow) => {
    if (row.noticeId === null) {
      toast.error(
        '공지사항을 수정할 수 없습니다.',
        '목록 응답에 공지사항 ID가 없어 수정 화면으로 이동할 수 없습니다.',
      )
      return
    }

    void runWithActionGuard('update', async () => {
      navigate(
        ROUTES.HOMEPAGE.NOTICE_EDIT.replace(':noticeId', String(row.noticeId)),
        {
          state: {
            notice: {
              noticeId: row.noticeId,
              title: row.title,
              content: row.content,
            },
          },
        },
      )
    })
  }

  const handleDelete = () => {
    if (selectedIds.length === 0) return

    void runWithActionGuard('delete', async () => {
      const noticeIds = tableData
        .filter((row) => selectedIds.includes(row.id))
        .map((row) => row.noticeId)
        .filter((noticeId): noticeId is number => noticeId !== null)

      if (noticeIds.length === 0) {
        toast.error(
          '공지사항을 삭제할 수 없습니다.',
          '목록 응답에 공지사항 ID가 없어 삭제 요청을 보낼 수 없습니다.',
        )
        return
      }

      try {
        const result = await deleteNotifications(noticeIds)
        await queryClient.invalidateQueries({
          queryKey: notificationQueries.list.queryKey,
        })
        setSelectedIds([])

        if (result.failureCount > 0) {
          toast.error(
            `${result.successCount}건 삭제, ${result.failureCount}건 실패`,
            result.failedNotices.map((notice) => notice.title).join('\n'),
          )
          return
        }

        toast.success(`${result.successCount}건의 공지사항을 삭제했습니다.`)
      } catch (error) {
        toast.error(
          '공지사항 삭제에 실패했습니다.',
          error instanceof Error ? error.message : '다시 시도해주세요.',
        )
      }
    })
  }

  const columns = getNoticeManagementColumns({
    allSelected,
    customerUrl: CUSTOMER_URL,
    isActionPending: isTableActionDisabled,
    selectedIds,
    onEdit: handleEdit,
    toggleAll,
    toggleRow,
  })

  if (isError) {
    return (
      <p className="typo-title-14-r text-gray-700">
        공지사항 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
      </p>
    )
  }

  return (
    <Table
      data={tableData}
      columns={columns}
      maxHeight="676px"
      tableClassName="w-full table-fixed"
      topArea={
        <NoticeManagementTopArea
          currentPage={currentPage}
          isActionPending={isTableActionDisabled}
          selectedCount={selectedIds.length}
          totalPages={totalPages}
          onCreate={handleCreate}
          onDelete={handleDelete}
          onPageChange={handlePageChange}
        />
      }
    />
  )
}
