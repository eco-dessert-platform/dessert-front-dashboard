import { useState } from 'react'

import { Pagination, Table } from '@dessert/ui'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { nameChangeApprovalQueries } from '@/entity/store/name-change-approval'

import { NameChangeApprovalColumns } from './name-change-approval-columns.util'
import {
  useApproveUpdateStoreNameMutation,
  useRejectUpdateStoreNameMutation,
} from './name-change-approval.mutation'

export const NameChangeApprovalTable = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data } = useQuery({
    ...nameChangeApprovalQueries.list({ page: currentPage }),
    placeholderData: keepPreviousData,
  })

  const { mutate: approve, isPending: isApproving } =
    useApproveUpdateStoreNameMutation()
  const { mutate: reject, isPending: isRejecting } =
    useRejectUpdateStoreNameMutation()

  const requests = data?.updateStoreNames ?? []

  const columns = NameChangeApprovalColumns({
    onApprove: approve,
    onReject: reject,
    isMutating: isApproving || isRejecting,
  })

  return (
    <Table
      data={requests}
      columns={columns}
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
