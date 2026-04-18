import { useCallback, useState } from 'react'

import { Input, Table, getRowSpanForGroup } from '@dessert/ui'

import { TableRow, tableData } from '@/entity/store/member-approval'

import { MemberApprovalColumns } from './member-approval-columns.util'
import { useMemberApproval } from './member-approval.hook'
import { TableTopArea } from './table-top-area.ui'

export const MemberApprovalTable = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const {
    toggleBusinessOwner,
    updateBusinessOwner,
    submitApproval,
    handleDownloadFile,
  } = useMemberApproval()

  const allSelected =
    tableData.length > 0 && selectedIds.length === tableData.length

  const toggleAll = (checked: boolean | 'indeterminate') => {
    const isChecked = checked === true
    setSelectedIds(isChecked ? tableData.map((row) => row.id) : [])
  }

  const totalCount = tableData.length
  const selectedCount = selectedIds.length

  const toggleRow = (rowId: string, checked: boolean | 'indeterminate') => {
    const isChecked = checked === true
    setSelectedIds((prev) =>
      isChecked
        ? prev.includes(rowId)
          ? prev
          : [...prev, rowId]
        : prev.filter((id) => id !== rowId),
    )
    toggleBusinessOwner(rowId, checked)
  }

  const getRowSpanForAdmin = useCallback((rowIndex: number) => {
    return getRowSpanForGroup({
      rows: tableData,
      rowIndex,
      getKey: (row) => row.storeName,
    })
  }, [])

  const getRowClassName = (row: TableRow) => {
    return row.isNewMember ? '' : 'bg-[#FFE8E3]'
  }

  const renderSubRow = (row: TableRow) => {
    if (!selectedIds.includes(row.id)) return null

    const labelClassName = 'typo-title-14-b text-center'

    return (
      <tr className="bg-gray-50" key={`${row.id}-additional`}>
        <td colSpan={2} className="border-r border-r-gray-300">
          <Input
            label="대표자명"
            labelClassName={labelClassName}
            className="items-center gap-2 border-r border-r-gray-300 p-10"
            onChange={(e) =>
              updateBusinessOwner(row.id, 'ownerName', e.currentTarget.value)
            }
          />
        </td>
        <td colSpan={6}>
          <Input
            label="사업자 번호"
            labelClassName={labelClassName}
            className="w-[274px] items-center gap-2 border-r border-r-gray-300 p-10"
            onChange={(e) =>
              updateBusinessOwner(
                row.id,
                'businessNumber',
                e.currentTarget.value,
              )
            }
          />
        </td>
      </tr>
    )
  }

  const columns = MemberApprovalColumns({
    allSelected,
    selectedIds,
    getRowSpanForAdmin,
    toggleAll,
    toggleRow,
  })

  return (
    <Table
      data={tableData}
      columns={columns}
      topArea={
        <TableTopArea
          totlaCount={totalCount}
          selectedCount={selectedCount}
          onSubmitApproval={submitApproval}
          handleDownloadFile={handleDownloadFile}
        />
      }
      getRowClassName={getRowClassName}
      renderSubRow={renderSubRow}
    />
  )
}
