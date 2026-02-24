import { useState, useEffect } from 'react'
import Table from '@/shared/components/ui/table/table'
import { Pagination } from '@/shared/components/ui/pagination/pagination'

import ResultSort from './toa-area/result-sort'
import ResultCounter from './toa-area/result-counter'
import BulkDeleteButton from './toa-area/bulk-delete-button'

import { resultTableData } from './result-table.data'
import { getResultColumns } from './result-columns'

import { TableRow } from './type'

const ResultTable = () => {
  const [tableData, setTableData] = useState<TableRow[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  useEffect(() => {
    setTableData(resultTableData)
  }, [])

  const allSelected =
    tableData.length > 0 && selectedIds.length === tableData.length

  const toggleAll = (checked: boolean | 'indeterminate') => {
    setSelectedIds(checked === true ? tableData.map((v) => v.id) : [])
  }

  const toggleRow = (id: string, checked: boolean | 'indeterminate') => {
    setSelectedIds((prev) =>
      checked === true
        ? [...new Set([...prev, id])]
        : prev.filter((v) => v !== id),
    )
  }

  const handleCopyRow = (row: TableRow) => {
    setTableData((prev) => [
      {
        ...row,
        id: crypto.randomUUID(),
      },
      ...prev,
    ])
  }
  const columns = getResultColumns({
    selectedIds,
    allSelected,
    onToggleAll: toggleAll,
    onToggleRow: toggleRow,
    onCopyRow: handleCopyRow,
  })

  const handleDelete = () => {
    setTableData((prev) => prev.filter((row) => !selectedIds.includes(row.id)))
    setSelectedIds([])
  }

  return (
    <Table
      data={tableData}
      columns={columns}
      topArea={
        <div className="flex w-full justify-between px-[19px] py-16 pb-12">
          <div className="flex items-center gap-10">
            <ResultSort />
            <ResultCounter
              selectedIds={selectedIds}
              tableData={tableData.length}
            />
            <BulkDeleteButton
              onDelete={handleDelete}
              disabled={selectedIds.length === 0}
            />
          </div>
          <Pagination currentPage={1} totalPages={2} />
        </div>
      }
    />
  )
}

export default ResultTable
