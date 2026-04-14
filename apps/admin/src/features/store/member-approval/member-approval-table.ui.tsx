import { useCallback, useState } from 'react'

import { Checkbox, Input, Table, getRowSpanForGroup } from '@dessert/ui'

import { TableRow, tableData } from '@/entity/store/member-approval'

import { TableTopArea } from './table-top-area.ui'

import type { ColumnDef } from '@tanstack/react-table'

import { useMemberApproval } from './member-approval.hook'

type MemberApprovalTableArgs = {
  allSelected: boolean
  selectedIds: string[]
  getRowSpanForAdmin: (rowIndex: number) => number
  toggleAll: (checked: boolean | 'indeterminate') => void
  toggleRow: (rowId: string, checked: boolean | 'indeterminate') => void
}

const MemberApprovalTableColumns = ({
  allSelected,
  selectedIds,
  getRowSpanForAdmin,
  toggleAll,
  toggleRow,
}: MemberApprovalTableArgs): ColumnDef<TableRow>[] => [
  {
    id: 'select',
    header: () => (
      <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedIds.includes(row.original.id)}
        onCheckedChange={(checked) => toggleRow(row.original.id, checked)}
      />
    ),
    size: 40,
  },
  {
    header: '스토어명',
    accessorKey: 'storeName',
    meta: {
      getRowSpan: (cell) => getRowSpanForAdmin(cell.row.index),
    },
    cell: ({ row }) => (
      <div className="text-center typo-title-14-r text-gray-900">
        {row.original.storeName}
      </div>
    ),
    size: 120,
  },
  {
    header: '연락처/추가연락처',
    accessorKey: 'phoneNumber',
    cell: ({ row }) => (
      <div>
        <p className="text-center typo-title-14-r text-gray-900">
          {row.original.phoneNumber}
        </p>
        <p className="text-center typo-title-14-r text-gray-900">
          {row.original.additionalPhoneNumber}
        </p>
      </div>
    ),
    size: 150,
  },
  {
    header: '이메일',
    accessorKey: 'emailAddress',
    cell: ({ row }) => (
      <div>
        <p className="text-center typo-title-14-r text-gray-900">
          {row.original.emailAddress}
        </p>
      </div>
    ),
    size: 150,
  },
  {
    header: '출고지주소',
    accessorKey: 'address',
    cell: ({ row }) => (
      <p className="text-center typo-title-14-r text-gray-900">
        {row.original.address}
      </p>
    ),
    size: 250,
  },
  {
    header: '예금주/은행명',
    accessorKey: 'depositor',
    cell: ({ row }) => (
      <div>
        <p className="text-center typo-body-12-r text-gray-900">
          {row.original.depositor}
        </p>
        <div className="text-center typo-body-12-r text-gray-900">
          {row.original.bankName}
        </div>
      </div>
    ),
    size: 80,
  },
  {
    header: '계좌번호',
    accessorKey: 'accountNumber',
    cell: ({ row }) => (
      <p className="text-center typo-body-12-r text-gray-900">
        {row.original.accountNumber}
      </p>
    ),
    size: 130,
  },
  {
    header: '가입일',
    accessorKey: 'joinDate',
    cell: ({ row }) => (
      <p className="text-center typo-body-12-r text-gray-900">
        {row.original.joinDate}
      </p>
    ),
    size: 100,
  },
]

export const MemberApprovalTable = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const { toggleBusinessOwner, updateBusinessOwner, submitApproval } =
    useMemberApproval()

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

  const columns = MemberApprovalTableColumns({
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
          onSubmitApproval={submitApproval}
          totlaCount={totalCount}
          selectedCount={selectedCount}
        />
      }
      getRowClassName={getRowClassName}
      renderSubRow={renderSubRow}
    />
  )
}
