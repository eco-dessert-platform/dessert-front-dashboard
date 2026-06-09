import type { ColumnDef } from '@tanstack/react-table'

import {
  IChargePageResponse,
  IChargeRow,
} from '@/entity/settlement/charge/entities'

import ChargeTableTop from './charge-table-top'
import {
  CATEGORY_LABELS,
  STATUS_LABELS,
} from '@/entity/settlement/charge/constants'
import Table from '@/shared/components/ui/table/table'
import TableEmpty from '@/shared/components/ui/table/table-empty'

const chargeColumns: ColumnDef<IChargeRow>[] = [
  {
    header: '일자',
    accessorKey: 'baseDate',
    size: 160,
    enableResizing: false,
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.baseDate}
      </span>
    ),
  },
  {
    header: '정산ID',
    accessorKey: 'settlementId',
    size: 180,
    enableResizing: false,
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.settlementId}
      </span>
    ),
  },
  {
    header: '구분',
    accessorKey: 'category',
    size: 130,
    enableResizing: false,
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {CATEGORY_LABELS[row.original.category]}
      </span>
    ),
  },
  {
    header: '상태',
    accessorKey: 'status',
    size: 130,
    enableResizing: false,
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {STATUS_LABELS[row.original.status]}
      </span>
    ),
  },
  {
    header: '금액',
    accessorKey: 'amount',
    enableResizing: true,
    size: 130,
    meta: {
      flexible: true,
    },
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.amount.toLocaleString()}
      </span>
    ),
  },
]

interface IChargeTableProps {
  pageResponse: IChargePageResponse
  onPageChange: (page: number) => void
}

const ChargeTable = ({ pageResponse, onPageChange }: IChargeTableProps) => {
  return (
    <div className="relative [&_td]:border-r [&_td]:border-gray-300 [&_td:last-child]:border-r-0 [&_th]:border-r [&_th]:border-gray-300 [&_th:last-child]:border-r-0">
      <Table
        data={pageResponse.content}
        columns={chargeColumns}
        fillWidth={true}
        topArea={
          <ChargeTableTop
            currentPage={pageResponse.page + 1}
            totalPages={pageResponse.totalPages}
            onPageChange={onPageChange}
          />
        }
        scrollHeight={498}
      />
      {pageResponse.content.length === 0 && (
        <TableEmpty description="조회된 충전금 현황이 없어요" />
      )}
    </div>
  )
}

export default ChargeTable
