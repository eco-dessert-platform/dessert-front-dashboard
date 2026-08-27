import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Table, toast } from '@dessert/ui'
import { keepPreviousData } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import {
  Notice,
  NoticeListItem,
  useNoticeListQuery,
} from '@/entity/home-page/notice'
import { CLIENT_NOTICE_URL, ROUTES } from '@/shared/constant'

import { NoticeActionGroup } from './notice-action-group.ui'
import { getNoticeColumns } from './notice-columns.util'
import { NoticeDeleteConfirmDialog } from './notice-delete-confirm-dialog.ui'
import { useDeleteNoticesMutation } from './notice.mutation'

const PAGE_SIZE = 20
const DEFAULT_SORT = ['createAt,DESC']

const toTableRow = ({
  noticeId,
  title,
  createAt,
  modifiedAt,
}: NoticeListItem): Notice => ({
  id: noticeId,
  title,
  createdAt: createAt,
  modifiedAt,
})

export const NoticeTable = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const isDeleteSubmittingRef = useRef(false)
  const { mutate: removeNotices, isPending: isDeleting } =
    useDeleteNoticesMutation()

  const { data, isPlaceholderData, isLoading } = useNoticeListQuery({
    variables: {
      page: currentPage - 1,
      size: PAGE_SIZE,
      sort: DEFAULT_SORT,
    },
    placeholderData: keepPreviousData,
  })

  const tableData = useMemo(
    () => data?.content.map(toTableRow) ?? [],
    [data?.content],
  )
  const totalPages = Math.max(data?.totalPages ?? 1, 1)
  const isTableActionDisabled = isPlaceholderData || isDeleting
  const allSelected =
    tableData.length > 0 && selectedIds.length === tableData.length

  useEffect(() => {
    if (currentPage <= totalPages) return

    setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  useEffect(() => {
    setSelectedIds([])
    setIsDeleteDialogOpen(false)
  }, [currentPage])

  const handleToggleAll = useCallback(
    (checked: boolean | 'indeterminate') => {
      if (isTableActionDisabled) return

      setSelectedIds(checked === true ? tableData.map((row) => row.id) : [])
    },
    [isTableActionDisabled, tableData],
  )

  const handleToggleRow = useCallback(
    (id: number, checked: boolean | 'indeterminate') => {
      if (isTableActionDisabled) return

      setSelectedIds((prev) =>
        checked === true
          ? prev.includes(id)
            ? prev
            : [...prev, id]
          : prev.filter((selectedId) => selectedId !== id),
      )
    },
    [isTableActionDisabled],
  )

  const handleCreate = () => {
    navigate(ROUTES.HOMEPAGE.NOTICE_CREATE)
  }

  const handleEdit = useCallback(
    (id: number) => {
      if (isTableActionDisabled) return

      navigate(ROUTES.HOMEPAGE.noticeEdit(id))
    },
    [isTableActionDisabled, navigate],
  )

  /** 공지사항명 클릭 시 클라이언트 공지사항 화면을 새 탭으로 연다 */
  const handleSelectNotice = useCallback((id: number) => {
    window.open(CLIENT_NOTICE_URL(id), '_blank', 'noopener,noreferrer')
  }, [])

  const handleDelete = () => {
    if (isTableActionDisabled) return

    if (selectedIds.length === 0) {
      toast.info('선택된 공지사항이 없습니다.')
      return
    }

    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (isTableActionDisabled || selectedIds.length === 0) return
    if (isDeleteSubmittingRef.current) return

    isDeleteSubmittingRef.current = true

    removeNotices(selectedIds, {
      onSuccess: () => {
        setSelectedIds([])
        setIsDeleteDialogOpen(false)
      },
      onSettled: () => {
        isDeleteSubmittingRef.current = false
      },
    })
  }

  const columns = useMemo(
    () =>
      getNoticeColumns({
        allSelected,
        selectedIds,
        onToggleAll: handleToggleAll,
        onToggleRow: handleToggleRow,
        onEdit: handleEdit,
        onSelectNotice: handleSelectNotice,
        isTableActionDisabled,
      }),
    [
      allSelected,
      handleEdit,
      handleSelectNotice,
      handleToggleAll,
      handleToggleRow,
      isTableActionDisabled,
      selectedIds,
    ],
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSelectedIds([])
  }

  return (
    <>
      <Table
        data={tableData}
        columns={columns}
        emptyMessage={isLoading ? undefined : '등록된 공지사항이 없습니다.'}
        topArea={
          <NoticeActionGroup
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onCreate={handleCreate}
            onDelete={handleDelete}
            isDeleteDisabled={selectedIds.length === 0 || isTableActionDisabled}
          />
        }
      />
      <NoticeDeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        disabled={isDeleting}
      />
    </>
  )
}
