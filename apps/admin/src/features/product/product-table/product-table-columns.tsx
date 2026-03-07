import { Checkbox } from '@dessert/ui'
import { ColumnDef } from '@tanstack/react-table'

import { Product, ProductOption } from '@/entity/product/product.type'

export interface FlatAdminProduct extends Product {
  option: ProductOption
  optionIndex: number
  totalOptions: number
}

export const getProductTableColumns = (
  selectedProductIds: number[],
  selectedOptionIds: number[],
  onProductToggle: (productId: number) => void,
  onOptionToggle: (optionId: number, productId: number) => void,
): ColumnDef<FlatAdminProduct>[] => [
  {
    id: 'select',
    header: ' ',
    cell: ({ row }) => (
      <div className="flex h-full items-center justify-center">
        <Checkbox
          checked={selectedProductIds.includes(row.original.productId)}
          onCheckedChange={() => onProductToggle(row.original.productId)}
          size="md"
        />
      </div>
    ),
    size: 40,
    meta: {
      getRowSpan: (cell) =>
        cell.row.original.optionIndex === 0
          ? cell.row.original.totalOptions
          : 0,
      className: 'border-r border-gray-200',
      headerClassName: 'border-r border-gray-200',
    },
  },
  {
    accessorKey: 'storeName',
    header: '스토어명',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-[#f04c28] underline underline-offset-2">
        {row.original.storeName}
      </span>
    ),
    size: 180,
    meta: {
      getRowSpan: (cell) =>
        cell.row.original.optionIndex === 0
          ? cell.row.original.totalOptions
          : 0,
      className: 'border-r border-gray-200 px-10 text-center',
      headerClassName: 'border-r border-gray-200',
    },
  },
  {
    accessorKey: 'productName',
    header: '상품아이디/상품명',
    cell: ({ row }) => (
      <div className="text-center">
        <p className="typo-body-14-r text-[#f04c28]">
          [{row.original.productId}]
        </p>
        <p className="typo-body-14-r text-gray-900 underline underline-offset-2">
          {row.original.productName}
        </p>
      </div>
    ),
    size: 200,
    meta: {
      getRowSpan: (cell) =>
        cell.row.original.optionIndex === 0
          ? cell.row.original.totalOptions
          : 0,
      className: 'border-r border-gray-200 px-10',
      headerClassName: 'border-r border-gray-200',
    },
  },
  {
    id: 'optionName',
    header: '상품옵션명',
    cell: ({ row }) => {
      const { option } = row.original
      return (
        <div className="flex h-[63px] items-center gap-10 text-left">
          <Checkbox
            checked={selectedOptionIds.includes(option.optionId)}
            onCheckedChange={() =>
              onOptionToggle(option.optionId, row.original.productId)
            }
            size="md"
          />
          <div className="flex flex-col">
            <p className="typo-body-14-r leading-[1.6] text-gray-900">
              {option.optionName}
            </p>
            <div className="flex items-center gap-8">
              <span className="typo-body-12-r leading-[1.6] text-gray-500">
                {option.tags.join(', ')}
              </span>
              <span className="typo-body-12-b leading-[1.6] text-gray-800">
                {(option.price > 0
                  ? option.price
                  : row.original.productPrice
                ).toLocaleString()}
                원
              </span>
            </div>
          </div>
        </div>
      )
    },
    size: 325,
    meta: {
      className: 'border-r border-gray-200 px-10',
      headerClassName: 'border-r border-gray-200',
    },
  },
  {
    id: 'stock',
    header: '재고',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-900">
        {row.original.option.stock}
      </span>
    ),
    size: 80,
    meta: {
      className: 'border-r border-gray-200 text-center',
      headerClassName: 'border-r border-gray-200',
    },
  },
  {
    accessorKey: 'productPrice',
    header: '상품가',
    cell: ({ row }) => (
      <span className="typo-body-12-r text-gray-800">
        {row.original.productPrice.toLocaleString()}원
      </span>
    ),
    size: 100,
    meta: {
      getRowSpan: (cell) =>
        cell.row.original.optionIndex === 0
          ? cell.row.original.totalOptions
          : 0,
      className: 'border-r border-gray-200 px-10 text-center',
      headerClassName: 'border-r border-gray-200',
    },
  },
  {
    id: 'link',
    header: '링크',
    cell: () => (
      <button className="h-30 min-w-56 rounded-8 bg-[#d9d9d9] px-10 py-6 typo-body-12-m text-gray-800">
        이동
      </button>
    ),
    size: 95,
    meta: {
      getRowSpan: (cell) =>
        cell.row.original.optionIndex === 0
          ? cell.row.original.totalOptions
          : 0,
      className: 'text-center',
    },
  },
]
