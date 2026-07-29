import { useCallback, useEffect, useMemo, useState } from 'react'

import { Table, toast } from '@dessert/ui'
import { keepPreviousData } from '@tanstack/react-query'

import {
  RegisteredStoreInfo,
  StoreRegistration,
  useRegisteredStoreListQuery,
} from '@/entity/store/registration'

import { StoreRegistrationActionGroup } from './store-registration-action-group.ui'
import { getStoreRegistrationColumns } from './store-registration-columns.util'
import { StoreRegistrationDeleteConfirmDialog } from './store-registration-delete-confirm-dialog.ui'
import { StoreRegistrationEditDialog } from './store-registration-edit-dialog.ui'
import { StoreRegistrationFormDialog } from './store-registration-form-dialog.ui'

const PAGE_SIZE = 20
const DEFAULT_SORT = ['createdAt,DESC']

const toTableRow = ({
  storeId,
  storeName,
  businessNumber,
  introduce,
  phoneNumber,
  subPhoneNumber,
  email,
  originAddressLine,
  originAddressDetail,
}: RegisteredStoreInfo): StoreRegistration => ({
  id: storeId,
  storeName,
  businessNumber,
  introduction: introduce,
  phone: phoneNumber,
  subPhoneNumber,
  email,
  baseAddress: originAddressLine,
  detailAddress: originAddressDetail,
})

export const StoreRegistrationTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingStoreId, setEditingStoreId] = useState<number | null>(null)

  const { data, isPlaceholderData } = useRegisteredStoreListQuery({
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
  const isTableActionDisabled = isPlaceholderData
  const allSelected =
    tableData.length > 0 && selectedIds.length === tableData.length

  useEffect(() => {
    if (currentPage <= totalPages) return

    setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  useEffect(() => {
    setSelectedIds([])
    setEditingStoreId(null)
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
    setIsCreateDialogOpen(true)
  }

  const handleDelete = () => {
    if (isTableActionDisabled) return

    if (selectedIds.length === 0) {
      toast.info('선택된 스토어가 없습니다.')
      return
    }

    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    setSelectedIds([])
    setIsDeleteDialogOpen(false)
    toast.success('스토어 삭제는 추후 API 연결 예정입니다.')
  }

  const handleEdit = useCallback(
    (id: number) => {
      if (isTableActionDisabled) return

      setEditingStoreId(id)
    },
    [isTableActionDisabled],
  )

  const editingStore = useMemo(
    () => tableData.find((store) => store.id === editingStoreId) ?? null,
    [editingStoreId, tableData],
  )

  const columns = useMemo(
    () =>
      getStoreRegistrationColumns({
        allSelected,
        selectedIds,
        onToggleAll: handleToggleAll,
        onToggleRow: handleToggleRow,
        onEdit: handleEdit,
        isTableActionDisabled,
      }),
    [
      allSelected,
      handleEdit,
      handleToggleAll,
      handleToggleRow,
      isTableActionDisabled,
      selectedIds,
    ],
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSelectedIds([])
    setEditingStoreId(null)
  }

  return (
    <>
      <Table
        data={tableData}
        columns={columns}
        topArea={
          <StoreRegistrationActionGroup
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onCreate={handleCreate}
            onDelete={handleDelete}
            isDeleteDisabled={selectedIds.length === 0 || isTableActionDisabled}
          />
        }
      />
      <StoreRegistrationFormDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
      <StoreRegistrationDeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <StoreRegistrationEditDialog
        store={editingStore}
        onClose={() => setEditingStoreId(null)}
      />
    </>
  )
}
