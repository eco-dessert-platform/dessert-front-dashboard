import type { Meta, StoryObj } from '@storybook/react'
import type { ColumnDef } from '@tanstack/react-table'
import { useCallback, useState } from 'react'
import { getRowSpanForGroup } from '../../utils/tableSpan'
import BgrButton from '../button/BgrButton'

import BgrBadge from '../badge/BgrBadge'
import BgrCheckbox from '../checkbox/BBgrCheckbox'
import BgrTable from './BgrTable'

// TODO: type은 api responese 타입으로 수정
type TableRow = {
  id: string
  sellerName: string
  productName: string
  stockStatus: string
  salePrice: number
  originPrice: number
  shipping: {
    type: '무료' | '조건부 무료' | '유료'
    price: number
    minimumPrice?: number
  }
  status: 'onSale' | 'stopSale' | 'soldOut' | 'pending' | 'banned'
}

type StatusCellProps = {
  status: TableRow['status']
}

const StatusCell = ({ status }: StatusCellProps) => {
  const [checked, setChecked] = useState(status === 'onSale')
  const toggleSale = (nextChecked: boolean) => {
    setChecked(nextChecked)
  }

  switch (status) {
    case 'onSale':
      return (
        <div className="flex flex-col items-center gap-1">
          <BgrBadge color="green" variant="outline" content="판매중" />
          <ToggleSale checked={checked} onCheckedChange={toggleSale} />
        </div>
      )
    case 'stopSale':
      return (
        <div className="flex flex-col items-center gap-1">
          <BgrBadge color="grayDark" variant="outline" content="판매중지" />
          <ToggleSale checked={checked} onCheckedChange={toggleSale} />
        </div>
      )
    case 'soldOut':
      return (
        <div className="flex flex-col items-center gap-1">
          <BgrBadge color="red" variant="outline" content="품절" />
          <ToggleSale checked={checked} onCheckedChange={toggleSale} />
        </div>
      )
    case 'pending':
      return (
        <div className="flex flex-col items-center gap-1">
          <BgrBadge color="yellow" variant="outline" content="판매대기" />
          <ToggleSale checked={checked} onCheckedChange={toggleSale} />
        </div>
      )
    case 'banned':
      return (
        <div className="flex flex-col items-center gap-1">
          <BgrBadge color="gray" variant="outline" content="판매금지" />
          <ToggleSale checked={checked} onCheckedChange={toggleSale} />
        </div>
      )
    default:
      return null
  }
}

type ExampleColumnArgs = {
  allSelected: boolean
  selectedIds: string[]
  getRowSpanForSeller: (rowIndex: number) => number
  toggleAll: (checked: boolean | 'indeterminate') => void
  toggleRow: (rowId: string, checked: boolean | 'indeterminate') => void
}

const exampleColumns = ({
  allSelected,
  selectedIds,
  getRowSpanForSeller,
  toggleAll,
  toggleRow,
}: ExampleColumnArgs): ColumnDef<TableRow>[] => [
  {
    id: 'select',
    header: () => (
      <BgrCheckbox checked={allSelected} onCheckedChange={toggleAll} />
    ),
    cell: ({ row }) => (
      <BgrCheckbox
        checked={selectedIds.includes(row.original.id)}
        onCheckedChange={(checked) => toggleRow(row.original.id, checked)}
      />
    ),
    size: 40,
  },
  {
    header: '셀러',
    accessorKey: 'sellerName',
    meta: {
      getRowSpan: (cell) => getRowSpanForSeller(cell.row.index),
    },
    cell: ({ row }) => (
      <div className="typo-title-14-r text-center text-gray-900">
        {row.original.sellerName}
      </div>
    ),
    size: 120,
  },
  {
    header: '등록상품',
    accessorKey: 'productName',
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <img
          src="https://picsum.photos/200/300"
          alt={row.original.productName}
          className="h-20 w-20 shrink-0 rounded-[8px]"
        />
        <div className="typo-title-14-r line-clamp-2 text-left text-gray-900">
          {row.original.productName}
        </div>
      </div>
    ),
    size: 400,
  },
  {
    header: '재고상태',
    accessorKey: 'stockStatus',
    cell: ({ row }) => (
      <div className="typo-title-14-r text-center text-gray-900">
        {row.original.stockStatus}
      </div>
    ),
    size: 100,
  },
  {
    header: '판매가',
    accessorKey: 'salePrice',
    cell: ({ row }) => (
      <div className="flex flex-col items-end">
        <div className="typo-body-12-r text-center text-gray-500 line-through">
          {`${row.original.originPrice.toLocaleString()}원`}
        </div>
        <div className="typo-title-14-sb text-center text-gray-900">
          {`${row.original.salePrice.toLocaleString()}원`}
        </div>
      </div>
    ),
    size: 100,
  },
  {
    header: '배송비',
    accessorKey: 'shipping',
    cell: ({ row }) => (
      <div className="flex flex-col items-end">
        <div className="flex flex-col items-end">
          <div className="typo-title-14-sb text-center text-gray-900">
            {`${row.original.shipping.price.toLocaleString()}원`}
          </div>
          <div className="typo-body-12-r text-primary-500 text-center">
            {row.original.shipping.type}
          </div>
        </div>
        {row.original.shipping.minimumPrice && (
          <div className="typo-body-12-r text-center text-gray-500">
            {`${row.original.shipping.minimumPrice.toLocaleString()}원`}
          </div>
        )}
      </div>
    ),
    size: 160,
  },
  {
    header: '판매상태',
    accessorKey: 'status',
    cell: ({ row }) => <StatusCell status={row.original.status} />,
    size: 100,
  },
  {
    header: '',
    id: 'actions',
    cell: ({ row }) => {
      const onEdit = () => console.log('edit', row.original)
      const onCopy = () => console.log('copy', row.original)
      return (
        <div className="flex flex-col items-center justify-center gap-1">
          <BgrButton
            variant="primary-outlined"
            title="수정"
            size="sm"
            onClick={onEdit}
          />
          <BgrButton
            variant="secondary-outlined"
            title="복사"
            size="sm"
            onClick={onCopy}
          />
        </div>
      )
    },
    size: 100,
    // meta is intentionally omitted; ColumnMeta only supports table span data.
  },
]

const meta = {
  title: 'Components/BgrTable',
  component: BgrTable,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BgrTable>

export default meta
type Story = StoryObj<typeof meta>

const tableData: TableRow[] = [
  {
    id: '1',
    sellerName: '셀러 A',
    productName:
      '제품명은 2줄까지 노출됩니다. 그리고 제품명은  2줄 이후 말줄임 처리가 됩니다. 3줄 넘지 않게 적어주세요',
    stockStatus: '재고있음',
    originPrice: 2000,
    salePrice: 1000,
    shipping: { type: '무료', price: 0 },
    status: 'onSale',
  },
  {
    id: '2',
    sellerName: '셀러 A',
    productName:
      '제품명은 2줄까지 노출됩니다. 그리고 제품명은  2줄 이후 말줄임 처리가 됩니다. 3줄 넘지 않게 적어주세요',
    stockStatus: '재고없음',
    originPrice: 2000,
    salePrice: 1000,
    shipping: { type: '조건부 무료', price: 0, minimumPrice: 2500 },
    status: 'stopSale',
  },
  {
    id: '3',
    sellerName: '셀러 B',
    productName:
      '제품명은 2줄까지 노출됩니다. 그리고 제품명은  2줄 이후 말줄임 처리가 됩니다. 3줄 넘지 않게 적어주세요',
    stockStatus: '재고있음',
    originPrice: 2000,
    salePrice: 1000,
    shipping: { type: '유료', price: 1000 },
    status: 'soldOut',
  },
  {
    id: '4',
    sellerName: '셀러 B',
    productName:
      '제품명은 2줄까지 노출됩니다. 그리고 제품명은  2줄 이후 말줄임 처리가 됩니다. 3줄 넘지 않게 적어주세요',
    stockStatus: '재고있음',
    originPrice: 2000,
    salePrice: 1000,
    shipping: { type: '유료', price: 1000 },
    status: 'pending',
  },
]

const DefaultTable = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const allSelected =
    tableData.length > 0 && selectedIds.length === tableData.length

  const toggleAll = (checked: boolean | 'indeterminate') => {
    const isChecked = checked === true
    setSelectedIds(isChecked ? tableData.map((row) => row.id) : [])
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
  }

  const getRowSpanForSeller = useCallback((rowIndex: number) => {
    return getRowSpanForGroup({
      rows: tableData,
      rowIndex,
      getKey: (row) => row.sellerName,
    })
  }, [])

  const columns = exampleColumns({
    allSelected,
    selectedIds,
    getRowSpanForSeller,
    toggleAll,
    toggleRow,
  })

  return <BgrTable data={tableData} columns={columns} topArea={<TopArea />} />
}

export const Default: Story = {
  args: {
    data: tableData,
    columns: [],
  },
  render: () => <DefaultTable />,
}

function ToggleSale({
  checked,
  onCheckedChange,
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center gap-1">
      <BgrCheckbox checked={checked} onCheckedChange={(checked) => onCheckedChange(checked === true)} />
      <span className="typo-body-12-r text-gray-700">판매중지</span>
    </div>
  )
}

function TopArea() {
  return <BgrButton title="top area button" />
}
