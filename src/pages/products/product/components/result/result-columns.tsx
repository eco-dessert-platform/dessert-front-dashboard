import { ColumnDef } from '@tanstack/react-table'
import Checkbox from '@/shared/components/ui/checkbox/checkbox'
import Button from '@/shared/components/ui/button/button'
import { ProductSaleStatusType } from '@/entity/products/product/product-sale-status.type'
import StatusCell from './cell/status-cell'

type Args = {
  selectedIds: string[]
  allSelected: boolean
  onToggleAll: (checked: boolean | 'indeterminate') => void
  onToggleRow: (id: string, checked: boolean | 'indeterminate') => void
  onCopyRow: (row: ProductSaleStatusType) => void
}

export const getResultColumns = ({
  selectedIds,
  allSelected,
  onToggleAll,
  onToggleRow,
  onCopyRow,
}: Args): ColumnDef<ProductSaleStatusType>[] => [
  {
    id: 'select',
    header: () => (
      <Checkbox checked={allSelected} onCheckedChange={onToggleAll} />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedIds.includes(row.original.id)}
        onCheckedChange={(checked) => onToggleRow(row.original.id, checked)}
      />
    ),
    size: 40,
  },
  {
    header: '등록상품',
    accessorKey: 'productName',
    cell: ({ row }) => (
      <div className="flex items-center gap-16">
        <img
          src="https://picsum.photos/200/300"
          alt={row.original.productName}
          className="rounded-8 h-[80px] w-[80px] shrink-0"
        />
        <div className="typo-title-14-r line-clamp-2 text-left text-gray-900">
          {row.original.productName}
        </div>
      </div>
    ),
    size: 440,
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
    size: 120,
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
        <div className="flex flex-col items-center justify-center gap-4">
          <Button
            variant="primary-outlined"
            title="수정"
            size="sm"
            onClick={onEdit}
          />
          <Button
            variant="secondary-outlined"
            title="복사"
            size="sm"
            onClick={() => onCopyRow(row.original)}
          />
        </div>
      )
    },
    size: 100,
  },
]
