import Button from '@/shared/components/ui/button/button'
import Table from '@/shared/components/ui/table/table'
import { ColumnDef } from '@tanstack/react-table'
import { SettlementTableTopArea } from './settlement-table-top-area'

interface Settlement {
  id: string
  expectedDate: string
  completedDate: string
  totalAmount: number
  paymentAmount: number
  commission: number
  deduction: number
  withheld: number
  method: string
}

const MOCK_DATA: Settlement[] = Array(10).fill({
  id: '250401A1F7',
  expectedDate: '2025.09.01',
  completedDate: '2025.09.01',
  totalAmount: 123456,
  paymentAmount: 123456,
  commission: 123456,
  deduction: 123456,
  withheld: 123456,
  method: '계좌이체',
})

const columns: ColumnDef<Settlement>[] = [
  {
    header: '정산ID',
    accessorKey: 'id',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">{row.original.id}</span>
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
    header: () => (
      <div className="flex flex-col items-center justify-center">
        <span>정산금액</span>
        <span className="typo-body-11-r text-gray-500">(a+b+c+d)</span>
      </div>
    ),
    accessorKey: 'totalAmount',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.totalAmount.toLocaleString()}
      </span>
    ),
  },
  {
    header: '정산금액 상세내역',
    columns: [
      {
        header: '결제금액(a)',
        accessorKey: 'paymentAmount',
        cell: ({ row }) => (
          <span className="typo-body-14-r text-gray-800">
            {row.original.paymentAmount.toLocaleString()}
          </span>
        ),
      },
      {
        header: '수수료(b)',
        accessorKey: 'commission',
        cell: ({ row }) => (
          <span className="typo-body-14-r text-gray-800">
            {row.original.commission.toLocaleString()}
          </span>
        ),
      },
      {
        header: '공제/환급(c)',
        accessorKey: 'deduction',
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-4">
            <span className="typo-body-14-r text-gray-800">
              {row.original.deduction.toLocaleString()}
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
        header: '지급보류(d)',
        accessorKey: 'withheld',
        cell: ({ row }) => (
          <span className="typo-body-14-r text-gray-800">
            {row.original.withheld.toLocaleString()}
          </span>
        ),
      },
    ],
  },
  {
    header: '정산방식',
    accessorKey: 'method',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.method}
      </span>
    ),
  },
]

export const DailySettlementTable = () => {
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
