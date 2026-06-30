import { Button } from '@dessert/ui'

import type { UpdateStoreName } from '@/entity/store/name-change-approval'

import type { ColumnDef } from '@tanstack/react-table'

type NameChangeApprovalColumnsArgs = {
  onApprove: (requestId: number) => void
  onReject: (requestId: number) => void
  isMutating: boolean
}

export const NameChangeApprovalColumns = ({
  onApprove,
  onReject,
  isMutating,
}: NameChangeApprovalColumnsArgs): ColumnDef<UpdateStoreName>[] => [
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
  {
    id: 'actions',
    header: '처리',
    cell: ({ row }) => (
      <div className="flex justify-center gap-8">
        <Button
          title="승인"
          variant="primary-outlined"
          size="sm"
          onClick={() => onApprove(row.original.requestId)}
          disabled={isMutating}
        />
        <Button
          title="거절"
          variant="secondary-outlined"
          size="sm"
          onClick={() => onReject(row.original.requestId)}
          disabled={isMutating}
        />
      </div>
    ),
    size: 160,
  },
]
