import { Button, Checkbox } from '@dessert/ui'

import type { NoticeManagementTableRow } from './notice-management.type'
import type { ColumnDef } from '@tanstack/react-table'

interface NoticeManagementColumnsArgs {
  allSelected: boolean
  customerUrl: string
  isActionPending: boolean
  selectedIds: string[]
  onEdit: (row: NoticeManagementTableRow) => void
  toggleAll: (checked: boolean | 'indeterminate') => void
  toggleRow: (rowId: string, checked: boolean | 'indeterminate') => void
}

export const getNoticeManagementColumns = ({
  allSelected,
  customerUrl,
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
    cell: ({ row }) => {
      if (row.original.noticeId === null) {
        return (
          <p
            className="text-center typo-title-16-r text-gray-900"
            title="목록 응답에 공지사항 ID가 없어 이동할 수 없습니다."
          >
            {row.original.title}
          </p>
        )
      }

      return (
        <a
          href={`${customerUrl}/mypage/notifications/${encodeURIComponent(row.original.noticeId)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="typo-title-16-r text-primary-500 underline"
        >
          {row.original.title}
        </a>
      )
    },
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
          onClick={() => onEdit(row.original)}
          disabled={isActionPending || row.original.noticeId === null}
        />
      </div>
    ),
    size: 160,
  },
]
