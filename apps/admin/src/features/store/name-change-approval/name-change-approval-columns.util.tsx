import { Button } from '@dessert/ui'

import type { UpdateStoreName } from '@/entity/store/name-change-approval'

import type { ColumnDef } from '@tanstack/react-table'

const HEADER_CLASS = 'border-b-[0.8px] border-b-gray-400'
const CUSTOMER_URL = import.meta.env.VITE_PUBLIC_CUSTOMER_URL

if (!CUSTOMER_URL) {
  throw new Error('VITE_PUBLIC_CUSTOMER_URL 환경변수가 설정되지 않았습니다.')
}

interface NameChangeApprovalColumnsArgs {
  onApprove: (requestId: number) => void
  onReject: (requestId: number) => void
  isApproving: boolean
}

export const getNameChangeApprovalColumns = ({
  onApprove,
  onReject,
  isApproving,
}: NameChangeApprovalColumnsArgs): ColumnDef<UpdateStoreName>[] => [
  {
    accessorKey: 'requestId',
    header: '아이디',
    meta: { headerClassName: HEADER_CLASS },
    cell: ({ row }) => (
      <span className="typo-title-14-r text-gray-900">
        {row.original.requestId}
      </span>
    ),
    size: 100,
  },
  {
    accessorKey: 'currentName',
    header: '변경 전 스토어명',
    meta: { headerClassName: HEADER_CLASS, flexible: true },
    cell: ({ row }) => (
      <span className="typo-title-14-r text-gray-900">
        {row.original.currentName}
      </span>
    ),
  },
  {
    accessorKey: 'newName',
    header: '변경 후 스토어명',
    meta: { headerClassName: HEADER_CLASS, flexible: true },
    cell: ({ row }) => (
      <a
        href={`${CUSTOMER_URL}/main/stores/${row.original.storeId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="typo-title-14-r text-primary-500 underline"
      >
        {row.original.newName}
      </a>
    ),
  },
  {
    id: 'actions',
    header: '승인/거절',
    meta: { headerClassName: HEADER_CLASS },
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-8">
        <Button
          title="승인"
          size="sm"
          variant="primary-outlined"
          disabled={isApproving}
          onClick={() => onApprove(row.original.requestId)}
        />
        <Button
          title="거절"
          size="sm"
          variant="secondary-outlined"
          onClick={() => onReject(row.original.requestId)}
        />
      </div>
    ),
    size: 140,
  },
]
