import type { UpdateStoreName } from '@/entity/store/name-change-approval'

import type { ColumnDef } from '@tanstack/react-table'

export const NameChangeApprovalColumns: ColumnDef<UpdateStoreName>[] = [
  {
    header: '현재 스토어명',
    accessorKey: 'currentName',
    cell: ({ row }) => (
      <div className="text-center typo-title-14-r text-gray-900">
        {row.original.currentName}
      </div>
    ),
    size: 200,
  },
  {
    header: '변경 요청명',
    accessorKey: 'newName',
    cell: ({ row }) => (
      <div className="text-center typo-title-14-r text-gray-900">
        {row.original.newName}
      </div>
    ),
    size: 200,
  },
  {
    header: '요청일',
    accessorKey: 'createdAt',
    cell: ({ row }) => (
      <div className="text-center typo-title-14-r text-gray-900">
        {row.original.createdAt.slice(0, 10)}
      </div>
    ),
    size: 120,
  },
]
