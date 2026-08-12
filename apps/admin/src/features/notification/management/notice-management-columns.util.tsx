import { Button, Checkbox } from '@dessert/ui'

import type { NoticeManagementTableRow } from './notice-management.type'
import type { ColumnDef } from '@tanstack/react-table'

interface NoticeManagementColumnsArgs {
  allSelected: boolean
  isActionPending: boolean
  selectedIds: string[]
  onEdit: (id: string) => void
  toggleAll: (checked: boolean | 'indeterminate') => void
  toggleRow: (rowId: string, checked: boolean | 'indeterminate') => void
}

export const getNoticeManagementColumns = ({
  allSelected,
  isActionPending,
  selectedIds,
  onEdit,
  toggleAll,
  toggleRow,
}: NoticeManagementColumnsArgs): ColumnDef<NoticeManagementTableRow>[] => [
  {
    id: 'select',
    header: () => (
      <div className="flex justify-center">
        <Checkbox
          checked={allSelected}
          onCheckedChange={toggleAll}
          disabled={isActionPending}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={selectedIds.includes(row.original.id)}
          onCheckedChange={(checked) => toggleRow(row.original.id, checked)}
          disabled={isActionPending}
        />
      </div>
    ),
    size: 40,
  },
  {
    header: '공지사항명',
    accessorKey: 'title',
    cell: ({ row }) => (
      <p className="text-center typo-title-16-r text-gray-900">
        {row.original.title}
      </p>
    ),
    size: 420,
  },
  {
    header: '등록일자',
    accessorKey: 'createdAt',
    cell: ({ row }) => (
      <p className="text-center typo-title-16-r text-gray-900">
        {row.original.createdAt}
      </p>
    ),
    size: 210,
  },
  {
    header: '수정일자',
    accessorKey: 'modifiedAt',
    cell: ({ row }) => (
      <p className="text-center typo-title-16-r text-gray-900">
        {row.original.modifiedAt}
      </p>
    ),
    size: 210,
  },
  {
    header: '수정',
    id: 'edit',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          title="수정"
          size="sm"
          variant="primary-outlined"
          onClick={() => onEdit(row.original.id)}
          disabled={isActionPending}
        />
      </div>
    ),
    size: 160,
  },
]
