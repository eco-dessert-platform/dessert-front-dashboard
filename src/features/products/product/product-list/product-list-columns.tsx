import { ColumnDef } from '@tanstack/react-table'

import { ProductType } from '@/entity/products/product/product.type'
import Button from '@/shared/ui/button/button'
import Checkbox from '@/shared/ui/checkbox/checkbox'

import ProductListCellStatus from './product-list-cell/product-list-cell-status'

type Args = {
  selectedIds: string[]
  allSelected: boolean | 'indeterminate'
  selectedIdSet: Set<string>
  onToggleAll: (checked: boolean | 'indeterminate') => void
  onToggleRow: (id: string, checked: boolean | 'indeterminate') => void
  onCopyRow: (row: ProductType) => void
}

export const getResultColumns = ({
  allSelected,
  selectedIdSet,
  onToggleAll,
  onToggleRow,
  onCopyRow,
}: Args): ColumnDef<ProductType>[] => [
  {
    id: 'select',
    header: () => (
      <Checkbox checked={allSelected} onCheckedChange={onToggleAll} />
    ),
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={selectedIdSet.has(row.original.id)}
          onCheckedChange={(checked) => onToggleRow(row.original.id, checked)}
        />
      )
    },
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
          className="h-header w-[80px] shrink-0 rounded-8"
        />
        <div className="line-clamp-2 text-left typo-title-14-r text-gray-900">
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
      <div className="text-center typo-title-14-r text-gray-900">
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
        <div className="text-center typo-body-12-r text-gray-500 line-through">
          {`${row.original.originPrice.toLocaleString()}원`}
        </div>
        <div className="text-center typo-title-14-sb text-gray-900">
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
          <div className="text-center typo-title-14-sb text-gray-900">
            {`${row.original.shipping.price.toLocaleString()}원`}
          </div>
          <div className="text-center typo-body-12-r text-primary-500">
            {row.original.shipping.type}
          </div>
        </div>
        {row.original.shipping.minimumPrice != null && (
          <div className="text-center typo-body-12-r text-gray-500">
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
    cell: ({ row }) => <ProductListCellStatus status={row.original.status} />,
    size: 100,
  },
  {
    header: '',
    id: 'actions',
    cell: ({ row }) => {
      const onEdit = () => console.log('edit', row.original)

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
