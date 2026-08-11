import { useCallback, useEffect, useMemo, useState } from 'react'

import { Input, Table, getRowSpanForGroup } from '@dessert/ui'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import {
  TableRow,
  mapApplicationToTableRow,
  memberApprovalQueries,
} from '@/entity/store/member-approval'

import { MemberApprovalColumns } from './member-approval-columns.util'
import { useMemberApproval } from './member-approval.hook'
import { TableTopArea } from './table-top-area.ui'

export const MemberApprovalTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const {
    toggleBusinessOwner,
    updateBusinessOwner,
    clearBusinessOwners,
    submitApproval,
    handleDownloadFile,
    isApproving,
  } = useMemberApproval()

  const { data, isLoading, isError } = useQuery({
    ...memberApprovalQueries.list({ page: currentPage }),
    placeholderData: keepPreviousData,
  })

  const tableData = useMemo(
    () => (data?.adminSellerApplicationList ?? []).map(mapApplicationToTableRow),
    [data],
  )

  const totalCount = data?.totalElements ?? 0
  const totalPages = data?.totalPages ?? 1

  useEffect(() => {
    setSelectedIds([])
    clearBusinessOwners()
  }, [currentPage, clearBusinessOwners])

  const allSelected =
    tableData.length > 0 && selectedIds.length === tableData.length

  const toggleAll = (checked: boolean | 'indeterminate') => {
    const isChecked = checked === true
    if (isChecked) {
      setSelectedIds(tableData.map((row) => row.id))
      tableData.forEach((row) => toggleBusinessOwner(row.id, true))
      return
    }

    setSelectedIds([])
    tableData.forEach((row) => toggleBusinessOwner(row.id, false))
  }

  const toggleRow = (rowId: string, checked: boolean | 'indeterminate') => {
    const isChecked = checked === true
    setSelectedIds((prev) =>
      isChecked
        ? prev.includes(rowId)
          ? prev
          : [...prev, rowId]
        : prev.filter((id) => id !== rowId),
    )
    toggleBusinessOwner(rowId, checked)
  }

  const getRowSpanForAdmin = useCallback(
    (rowIndex: number) => {
      return getRowSpanForGroup({
        rows: tableData,
        rowIndex,
        getKey: (row) => row.storeName,
      })
    },
    [tableData],
  )

  const renderSubRow = (row: TableRow) => {
    if (!selectedIds.includes(row.id)) return null

    const labelClassName = 'typo-title-14-b text-center'

    return (
      <tr className="bg-gray-50" key={`${row.id}-additional`}>
        <td colSpan={2} className="border-r border-r-gray-300">
          <Input
            label="대표자명"
            labelClassName={labelClassName}
            className="items-center gap-2 border-r border-r-gray-300 p-10"
            onChange={(e) =>
              updateBusinessOwner(row.id, 'ownerName', e.currentTarget.value)
            }
          />
        </td>
        <td colSpan={6}>
          <Input
            label="사업자 번호"
            labelClassName={labelClassName}
            className="w-[274px] items-center gap-2 border-r border-r-gray-300 p-10"
            onChange={(e) =>
              updateBusinessOwner(
                row.id,
                'businessNumber',
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
    getRowSpanForAdmin,
    toggleAll,
    toggleRow,
  })

  if (isError) {
    return (
      <p className="typo-title-14-r text-gray-700">
        승인 대기 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
      </p>
    )
  }

  return (
    <Table
      data={tableData}
      columns={columns}
      topArea={
        <TableTopArea
          totalCount={totalCount}
          selectedCount={selectedIds.length}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onSubmitApproval={() => submitApproval(() => setSelectedIds([]))}
          handleDownloadFile={handleDownloadFile}
          isApproving={isApproving || isLoading}
        />
      }
      renderSubRow={renderSubRow}
    />
  )
}
