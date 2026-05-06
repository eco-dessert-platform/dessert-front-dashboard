import { useCallback, useMemo, useState } from 'react'

import { Button, Table } from '@dessert/ui'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'

import {
  UploadApproval,
  productQueries,
} from '@/entity/product/upload-approval'

import { UploadApprovalActionGroup } from './upload-approval-action-group.ui'
import { UploadApprovalConfirmDialog } from './upload-approval-confirm-dialog.ui'
import { UploadApprovalRejectDialog } from './upload-approval-reject-dialog.ui'

const PAGE_SIZE = 10
const HEADER_CLASS = 'border-b-[0.8px] border-b-gray-400'
const CUSTOMER_URL = import.meta.env.VITE_PUBLIC_CUSTOMER_URL

if (!CUSTOMER_URL) {
  throw new Error('VITE_PUBLIC_CUSTOMER_URL 환경변수가 설정되지 않았습니다.')
}

export const UploadApprovalTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [approveBoardId, setApproveBoardId] = useState<number | null>(null)
  const [rejectBoardId, setRejectBoardId] = useState<number | null>(null)

  const { data } = useQuery({
    ...productQueries.uploadApprovalList({
      page: currentPage - 1,
      size: PAGE_SIZE,
    }),
    placeholderData: keepPreviousData,
  })

  const handleApprove = useCallback((boardId: number) => {
    setApproveBoardId(boardId)
  }, [])

  const handleApproveDialogClose = useCallback(() => {
    setApproveBoardId(null)
  }, [])

  const handleReject = useCallback((boardId: number) => {
    setRejectBoardId(boardId)
  }, [])

  const handleRejectDialogClose = useCallback(() => {
    setRejectBoardId(null)
  }, [])

  const columns = useMemo<ColumnDef<UploadApproval>[]>(
    () => [
      {
        id: 'no',
        header: 'NO',
        meta: { headerClassName: HEADER_CLASS },
        cell: ({ row }) => (
          <span className="typo-title-14-r text-gray-900">
            {(currentPage - 1) * PAGE_SIZE + row.index + 1}
          </span>
        ),
        size: 70,
      },
      {
        accessorKey: 'storeName',
        header: '스토어명',
        meta: { headerClassName: HEADER_CLASS, flexible: true },
        cell: ({ row }) => (
          <span className="typo-title-14-r text-gray-900 underline">
            {row.original.storeName}
          </span>
        ),
      },
      {
        accessorKey: 'boardTitle',
        header: '상품명',
        meta: { headerClassName: HEADER_CLASS, flexible: true },
        cell: ({ row }) => (
          <a
            href={`${CUSTOMER_URL}/main/products/${encodeURIComponent(row.original.boardId)}/info`}
            target="_blank"
            rel="noopener noreferrer"
            className="typo-title-14-r text-primary-500 underline"
          >
            {row.original.boardTitle}
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
              onClick={() => handleApprove(row.original.boardId)}
            />
            <Button
              title="거절"
              size="sm"
              variant="secondary-outlined"
              onClick={() => handleReject(row.original.boardId)}
            />
          </div>
        ),
        size: 130,
      },
    ],
    [currentPage, handleApprove, handleReject],
  )

  return (
    <>
      <Table
        data={data?.content ?? []}
        columns={columns}
        tableClassName="w-full table-fixed"
        topArea={
          <UploadApprovalActionGroup
            currentPage={currentPage}
            totalPages={data?.totalPages || 0}
            onPageChange={setCurrentPage}
          />
        }
      />
      <UploadApprovalConfirmDialog
        boardId={approveBoardId}
        onClose={handleApproveDialogClose}
      />
      <UploadApprovalRejectDialog
        boardId={rejectBoardId}
        onClose={handleRejectDialogClose}
      />
    </>
  )
}
