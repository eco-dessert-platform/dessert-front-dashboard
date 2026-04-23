import { useMemo, useState } from 'react'

import { Button, Table } from '@dessert/ui'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'

import { UploadApproval, productQueries } from '@/entity/product'

import { UploadApprovalActionGroup } from './upload-approval-action-group.ui'

const PAGE_SIZE = 10
const HEADER_CLASS = 'border-b-[0.8px] border-b-gray-400'
const CUSTOMER_URL = import.meta.env.VITE_PUBLIC_CUSTOMER_URL

export const UploadApprovalTable = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading } = useQuery(
    productQueries.uploadApprovalList({
      page: currentPage - 1,
      size: PAGE_SIZE,
    }),
  )

  const handleApprove = (boardId: number) => {
    alert(`승인: ${boardId}`)
  }

  const handleReject = (boardId: number) => {
    alert(`거절: ${boardId}`)
  }

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
        header: '변경 전 스토어명',
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
            href={`${CUSTOMER_URL}/main/products/${row.original.boardId}/info`}
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
    [currentPage],
  )

  if (isLoading) return null

  return (
    <Table
      data={data?.content ?? []}
      columns={columns}
      tableClassName="w-full table-fixed"
      topArea={
        <UploadApprovalActionGroup
          currentPage={currentPage}
          totalPages={data?.totalPages ?? 1}
          onPageChange={setCurrentPage}
        />
      }
    />
  )
}
