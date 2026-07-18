import { useMemo, useState } from 'react'

import { Table } from '@dessert/ui'

import { storeRegistrationMockData } from '@/entity/store/registration'

import { StoreRegistrationActionGroup } from './store-registration-action-group.ui'
import { getStoreRegistrationColumns } from './store-registration-columns.util'
import { StoreRegistrationFormDialog } from './store-registration-form-dialog.ui'

const TOTAL_PAGES = 1

export const StoreRegistrationTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

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
    alert(
      selectedIds.length > 0
        ? `삭제 대상: ${selectedIds.join(', ')}`
        : '선택된 스토어가 없습니다.',
    )
  }

  const handleEdit = (id: number) => {
    alert(`스토어 ${id} 수정 폼은 추후 연결 예정입니다.`)
  }

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
          />
        }
      />
      <StoreRegistrationFormDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </>
  )
}
