import { useState } from 'react'
import Table from '@/shared/components/ui/table/table'
import { Pagination } from '@/shared/components/ui/pagination/pagination'

import ResultSort from './toa-area/result-sort'
import ResultCounter from './toa-area/result-counter'
import BulkDeleteButton from './toa-area/bulk-delete-button'

import { resultTableData } from './result-table.data'
import { getResultColumns } from './result-columns'

const ResultTable = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const allSelected =
    resultTableData.length > 0 && selectedIds.length === resultTableData.length

  const toggleAll = (checked: boolean | 'indeterminate') => {
    setSelectedIds(checked === true ? resultTableData.map((v) => v.id) : [])
  }

  const toggleRow = (id: string, checked: boolean | 'indeterminate') => {
    setSelectedIds((prev) =>
      checked === true
        ? [...new Set([...prev, id])]
        : prev.filter((v) => v !== id),
    )
  }

  const columns = getResultColumns({
    selectedIds,
    allSelected,
    onToggleAll: toggleAll,
    onToggleRow: toggleRow,
  })

  return (
    <Table
      data={resultTableData}
      columns={columns}
      topArea={
        <div className="flex w-full justify-between px-[19px] py-16 pb-12">
          <div className="flex items-center gap-10">
            <ResultSort />
            <ResultCounter
              selectedIds={selectedIds}
              tableData={resultTableData.length}
            />
            <BulkDeleteButton />
          </div>
          <Pagination currentPage={1} totalPages={2} />
        </div>
      }
    />
  )
}

export default ResultTable
