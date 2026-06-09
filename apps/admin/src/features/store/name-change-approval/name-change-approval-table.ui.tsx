import { useState } from 'react'

import { Pagination, Table } from '@dessert/ui'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { nameChangeApprovalQueries } from '@/entity/store/name-change-approval'

import { NameChangeApprovalColumns } from './name-change-approval-columns.util'

export const NameChangeApprovalTable = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data } = useQuery({
    ...nameChangeApprovalQueries.list({ page: currentPage }),
    placeholderData: keepPreviousData,
  })

  const requests = data?.updateStoreNames ?? []

  return (
    <Table
      data={requests}
      columns={NameChangeApprovalColumns}
      topArea={
        <div className="flex w-full items-center justify-between">
          <p className="typo-title-14-r text-gray-700">
            전체{' '}
            <span className="typo-title-14-m text-gray-700">
              {data?.totalElements ?? 0}개
            </span>
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages ?? 0}
            onPageChange={setCurrentPage}
          />
        </div>
      }
    />
  )
}
