import { useState } from 'react'

import { Input, Table } from '@dessert/ui'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import {
  AdminSellerApplication,
  memberApprovalQueries,
} from '@/entity/store/member-approval'

import { MemberApprovalColumns } from './member-approval-columns.util'
import { useMemberApproval } from './member-approval.hook'
import { TableTopArea } from './table-top-area.ui'

export const MemberApprovalTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const { data } = useQuery({
    ...memberApprovalQueries.list({ page: currentPage }),
    placeholderData: keepPreviousData,
  })

  const {
    inputs,
    updateInput,
    submitApproval,
    isApproving,
    submitReject,
    isRejecting,
    handleDownloadFile,
  } = useMemberApproval()

  const applications = data?.adminSellerApplicationList ?? []

  const allSelected =
    applications.length > 0 && selectedIds.length === applications.length

  const toggleAll = (checked: boolean | 'indeterminate') => {
    const isChecked = checked === true
    setSelectedIds(
      isChecked ? applications.map((row) => row.storeApplicationId) : [],
    )
  }

  const toggleRow = (id: number, checked: boolean | 'indeterminate') => {
    const isChecked = checked === true
    setSelectedIds((prev) =>
      isChecked
        ? prev.includes(id)
          ? prev
          : [...prev, id]
        : prev.filter((selectedId) => selectedId !== id),
    )
  }

  const handleSubmitApproval = () => {
    submitApproval(selectedIds, () => setSelectedIds([]))
  }

  const handleSubmitReject = () => {
    submitReject(selectedIds, () => setSelectedIds([]))
  }

  const renderSubRow = (row: AdminSellerApplication) => {
    if (!selectedIds.includes(row.storeApplicationId)) return null

    const labelClassName = 'typo-title-14-b text-center'
    const input = inputs[row.storeApplicationId]

    return (
      <tr className="bg-gray-50" key={`${row.storeApplicationId}-additional`}>
        <td colSpan={3} className="border-r border-r-gray-300">
          <Input
            label="대표자명"
            labelClassName={labelClassName}
            className="items-center gap-2 border-r border-r-gray-300 p-10"
            value={input?.sellerName ?? ''}
            onChange={(e) =>
              updateInput(
                row.storeApplicationId,
                'sellerName',
                e.currentTarget.value,
              )
            }
          />
        </td>
        <td colSpan={4}>
          <Input
            label="사업자등록번호"
            labelClassName={labelClassName}
            className="items-center gap-2 border-r border-r-gray-300 p-10"
            value={input?.identifier ?? ''}
            onChange={(e) =>
              updateInput(
                row.storeApplicationId,
                'identifier',
                e.currentTarget.value,
              )
            }
          />
        </td>
      </tr>
    )
  }

  const columns = MemberApprovalColumns({
    allSelected,
    selectedIds,
    toggleAll,
    toggleRow,
  })

  return (
    <Table
      data={applications}
      columns={columns}
      renderSubRow={renderSubRow}
      topArea={
        <TableTopArea
          totalCount={data?.totalElements ?? 0}
          selectedCount={selectedIds.length}
          currentPage={currentPage}
          totalPages={data?.totalPages ?? 0}
          isApproving={isApproving}
          isRejecting={isRejecting}
          onPageChange={setCurrentPage}
          onSubmitApproval={handleSubmitApproval}
          onSubmitReject={handleSubmitReject}
          handleDownloadFile={handleDownloadFile}
        />
      }
    />
  )
}
