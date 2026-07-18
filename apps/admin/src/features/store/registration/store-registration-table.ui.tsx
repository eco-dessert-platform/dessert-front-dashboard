import { useMemo, useState } from 'react'

import { Table, toast } from '@dessert/ui'

import { storeRegistrationMockData } from '@/entity/store/registration'

import { StoreRegistrationActionGroup } from './store-registration-action-group.ui'
import { getStoreRegistrationColumns } from './store-registration-columns.util'
import { StoreRegistrationDeleteConfirmDialog } from './store-registration-delete-confirm-dialog.ui'
import { StoreRegistrationEditDialog } from './store-registration-edit-dialog.ui'
import { StoreRegistrationFormDialog } from './store-registration-form-dialog.ui'

const TOTAL_PAGES = 1

export const StoreRegistrationTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingStoreId, setEditingStoreId] = useState<number | null>(null)

  const allSelected =
    storeRegistrationMockData.length > 0 &&
    selectedIds.length === storeRegistrationMockData.length

  const handleToggleAll = (checked: boolean | 'indeterminate') => {
    setSelectedIds(
      checked === true ? storeRegistrationMockData.map((row) => row.id) : [],
    )
  }

  const handleToggleRow = (id: number, checked: boolean | 'indeterminate') => {
    setSelectedIds((prev) =>
      checked === true
        ? prev.includes(id)
          ? prev
          : [...prev, id]
        : prev.filter((selectedId) => selectedId !== id),
    )
  }

  const handleCreate = () => {
    setIsCreateDialogOpen(true)
  }

  const handleDelete = () => {
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

  const handleEdit = (id: number) => {
    setEditingStoreId(id)
  }

  const editingStore = useMemo(
    () =>
      storeRegistrationMockData.find((store) => store.id === editingStoreId) ??
      null,
    [editingStoreId],
  )

  const columns = useMemo(
    () =>
      getStoreRegistrationColumns({
        allSelected,
        selectedIds,
        onToggleAll: handleToggleAll,
        onToggleRow: handleToggleRow,
        onEdit: handleEdit,
      }),
    [allSelected, selectedIds],
  )

  return (
    <>
      <Table
        data={storeRegistrationMockData}
        columns={columns}
        topArea={
          <StoreRegistrationActionGroup
            currentPage={currentPage}
            totalPages={TOTAL_PAGES}
            onPageChange={setCurrentPage}
            onCreate={handleCreate}
            onDelete={handleDelete}
            isDeleteDisabled={selectedIds.length === 0}
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
