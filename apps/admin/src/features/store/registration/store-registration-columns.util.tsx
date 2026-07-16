import { Button, Checkbox } from '@dessert/ui'

import type { StoreRegistration } from '@/entity/store/registration'

import type { ColumnDef } from '@tanstack/react-table'

const HEADER_CLASS = 'border-b-[0.8px] border-b-gray-400'
const CELL_CLASS = 'border-r border-gray-200 px-10 text-center'

interface StoreRegistrationColumnsArgs {
  allSelected: boolean
  selectedIds: number[]
  onToggleAll: (checked: boolean | 'indeterminate') => void
  onToggleRow: (id: number, checked: boolean | 'indeterminate') => void
  onEdit: (id: number) => void
}

const renderEllipsisText = (text: string) => (
  <span className="block truncate typo-body-14-r text-gray-900">{text}</span>
)

const renderWrapText = (text: string) => (
  <span className="block whitespace-normal break-keep text-left typo-body-14-r text-gray-900">
    {text}
  </span>
)

export const getStoreRegistrationColumns = ({
  allSelected,
  selectedIds,
  onToggleAll,
  onToggleRow,
  onEdit,
}: StoreRegistrationColumnsArgs): ColumnDef<StoreRegistration>[] => [
  {
    id: 'select',
    header: () => (
      <Checkbox checked={allSelected} onCheckedChange={onToggleAll} />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedIds.includes(row.original.id)}
        onCheckedChange={(checked) => onToggleRow(row.original.id, checked)}
      />
    ),
    size: 40,
  },
  {
    accessorKey: 'storeName',
    header: '스토어명',
    cell: ({ row }) => renderEllipsisText(row.original.storeName),
    size: 120,
    meta: {
      headerClassName: HEADER_CLASS,
      className: CELL_CLASS,
    },
  },
  {
    accessorKey: 'businessNumber',
    header: '사업자번호',
    cell: ({ row }) => renderEllipsisText(row.original.businessNumber),
    size: 125,
    meta: {
      headerClassName: HEADER_CLASS,
      className: CELL_CLASS,
    },
  },
  {
    accessorKey: 'introduction',
    header: '한줄소개',
    cell: ({ row }) => renderWrapText(row.original.introduction),
    size: 180,
    meta: {
      headerClassName: HEADER_CLASS,
      className: CELL_CLASS,
    },
  },
  {
    accessorKey: 'phone',
    header: '대표전화번호',
    cell: ({ row }) => renderEllipsisText(row.original.phone),
    size: 135,
    meta: {
      headerClassName: HEADER_CLASS,
      className: CELL_CLASS,
    },
  },
  {
    accessorKey: 'email',
    header: '이메일',
    cell: ({ row }) => renderEllipsisText(row.original.email),
    size: 135,
    meta: {
      headerClassName: HEADER_CLASS,
      className: CELL_CLASS,
    },
  },
  {
    accessorKey: 'baseAddress',
    header: '기본주소',
    cell: ({ row }) => renderEllipsisText(row.original.baseAddress),
    size: 145,
    meta: {
      headerClassName: HEADER_CLASS,
      className: CELL_CLASS,
    },
  },
  {
    accessorKey: 'detailAddress',
    header: '상세주소',
    cell: ({ row }) => renderEllipsisText(row.original.detailAddress),
    size: 135,
    meta: {
      headerClassName: HEADER_CLASS,
      className: CELL_CLASS,
    },
  },
  {
    id: 'edit',
    header: '수정',
    cell: ({ row }) => (
      <Button
        title="수정"
        size="sm"
        variant="primary-outlined"
        onClick={() => onEdit(row.original.id)}
      />
    ),
    size: 95,
    meta: {
      headerClassName: HEADER_CLASS,
      className: 'px-10 text-center',
    },
  },
]
