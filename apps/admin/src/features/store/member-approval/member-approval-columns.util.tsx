import { Checkbox } from '@dessert/ui'

import type { TableRow } from './member-approval-table.type'
import type { ColumnDef } from '@tanstack/react-table'

type MemberApprovalArgs = {
  allSelected: boolean
  selectedIds: string[]
  isTableActionDisabled?: boolean
  getRowSpanForAdmin: (rowIndex: number) => number
  toggleAll: (checked: boolean | 'indeterminate') => void
  toggleRow: (rowId: string, checked: boolean | 'indeterminate') => void
}

export const MemberApprovalColumns = ({
  allSelected,
  selectedIds,
  isTableActionDisabled = false,
  getRowSpanForAdmin,
  toggleAll,
  toggleRow,
}: MemberApprovalArgs): ColumnDef<TableRow>[] => [
  {
    id: 'select',
    header: () => (
      <Checkbox
        checked={allSelected}
        disabled={isTableActionDisabled}
        onCheckedChange={toggleAll}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedIds.includes(row.original.id)}
        disabled={isTableActionDisabled}
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
