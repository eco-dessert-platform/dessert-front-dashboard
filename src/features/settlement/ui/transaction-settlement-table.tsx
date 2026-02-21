import Table from '@/shared/components/ui/table/table'
import { ColumnDef } from '@tanstack/react-table'
import { SettlementTableTopArea } from './settlement-table-top-area'
import Button from '@/shared/components/ui/button/button'

interface TransactionSettlement {
  orderNumber: string
  productOrderNumber: string
  settlementId: string
  category: string
  productName: string
  expectedSettlementAmount: number
  settlementBaseDate: string
  expectedDate: string
  completedDate: string
  status: string
}

const MOCK_DATA: TransactionSettlement[] = Array(10).fill({
  orderNumber: '250401A1F7',
  productOrderNumber: '250401A1F7',
  settlementId: '250401A1F7',
  category: '배송비',
  productName: '키토빵앗간 휘낭시에 (저단백 다이어트 빵)',
  expectedSettlementAmount: 123456,
  settlementBaseDate: '2025.09.01',
  expectedDate: '2025.09.01',
  completedDate: '2025.09.01',
  status: '정산 후 취소',
})

const columns: ColumnDef<TransactionSettlement>[] = [
  {
    header: '주문번호',
    accessorKey: 'orderNumber',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.orderNumber}
      </span>
    ),
  },
  {
    header: '상품주문번호',
    accessorKey: 'productOrderNumber',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.productOrderNumber}
      </span>
    ),
  },
  {
    header: '정산ID',
    accessorKey: 'settlementId',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.settlementId}
      </span>
    ),
  },
  {
    header: '구분',
    accessorKey: 'category',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.category}
      </span>
    ),
  },
  {
    header: '상품명',
    accessorKey: 'productName',
    cell: ({ row }) => (
      <div
        className="w-[200px] truncate typo-body-14-r text-gray-800"
        title={row.original.productName}
      >
        {row.original.productName}
      </div>
    ),
  },
  {
    header: '정산예정금액',
    accessorKey: 'expectedSettlementAmount',
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-4">
        <span className="typo-body-14-r text-gray-800">
          {row.original.expectedSettlementAmount.toLocaleString()}
        </span>
        <Button
          variant="secondary-outlined"
          size="sm"
          className="h-24 px-8 py-0 text-gray-600"
          title="상세"
        />
      </div>
    ),
  },
  {
    header: '정산기준일',
    accessorKey: 'settlementBaseDate',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.settlementBaseDate}
      </span>
    ),
  },
  {
    header: '정산예정일',
    accessorKey: 'expectedDate',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.expectedDate}
      </span>
    ),
  },
  {
    header: '정산완료일',
    accessorKey: 'completedDate',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.completedDate}
      </span>
    ),
  },
  {
    header: '정산상태',
    accessorKey: 'status',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.status}
      </span>
    ),
  },
]

export const TransactionSettlementTable = () => {
  return (
    <div className="mt-24 [&_td]:border-r [&_td]:border-gray-300 [&_td:last-child]:border-r-0 [&_th]:border-r [&_th]:border-gray-300 [&_th:last-child]:border-r-0">
      <Table
        data={MOCK_DATA}
        columns={columns}
        topArea={<SettlementTableTopArea />}
        maxHeight="calc(100vh - 400px)"
      />
    </div>
  )
}
