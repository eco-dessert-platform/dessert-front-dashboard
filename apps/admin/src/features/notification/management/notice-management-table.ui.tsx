import { useEffect, useMemo, useState } from 'react'

import { Table } from '@dessert/ui'
import { useNavigate } from 'react-router-dom'

import { useAdminNotificationsQuery } from '@/entity/notification'
import { ROUTES } from '@/shared/constant/routes'

import { useNoticeManagementActionGuard } from './notice-management-action-guard.hook'
import { getNoticeManagementColumns } from './notice-management-columns.util'
import { NoticeManagementTopArea } from './notice-management-top-area.ui'

import type { NoticeManagementTableRow } from './notice-management.type'

const PAGE_SIZE = 10
const DEFAULT_SORT = 'createdAt,desc'

const toTableRow = (
  item: {
    id?: number
    title: string
    createAt: string
    modifiedAt: string
  },
  index: number,
  page: number,
): NoticeManagementTableRow => ({
  id: String(item.id ?? `${page}-${index}`),
  title: item.title,
  content: '',
  createdAt: item.createAt,
  modifiedAt: item.modifiedAt,
})

export const NoticeManagementTable = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const { isActionPending, runWithActionGuard } =
    useNoticeManagementActionGuard()

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

  const handleEdit = (id: string) => {
    void runWithActionGuard('update', async () => {
      navigate(ROUTES.HOMEPAGE.NOTICE_EDIT.replace(':noticeId', id))
    })
  }

  const handleDelete = () => {
    if (selectedIds.length === 0) return

    void runWithActionGuard('delete', async () => {})
  }

  const columns = getNoticeManagementColumns({
    allSelected,
    isActionPending: isActionPending || isLoading,
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
          isActionPending={isActionPending || isLoading}
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
