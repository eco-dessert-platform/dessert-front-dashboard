import { Checkbox } from '@dessert/ui'

import type { AdminSellerApplication } from '@/entity/store/member-approval'

import type { ColumnDef } from '@tanstack/react-table'

type MemberApprovalArgs = {
  allSelected: boolean
  selectedIds: number[]
  toggleAll: (checked: boolean | 'indeterminate') => void
  toggleRow: (id: number, checked: boolean | 'indeterminate') => void
}

export const MemberApprovalColumns = ({
  allSelected,
  selectedIds,
  toggleAll,
  toggleRow,
}: MemberApprovalArgs): ColumnDef<AdminSellerApplication>[] => [
  {
    id: 'select',
    header: () => (
      <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedIds.includes(row.original.storeApplicationId)}
        onCheckedChange={(checked) =>
          toggleRow(row.original.storeApplicationId, checked)
        }
      />
    ),
    size: 40,
  },
  {
    header: '스토어명',
    accessorKey: 'sellerStoreDTO.storeName',
    cell: ({ row }) => (
      <div className="text-center typo-title-14-r text-gray-900">
        {row.original.sellerStoreDTO.storeName}
      </div>
    ),
    size: 120,
  },
  {
    header: '판매자명',
    accessorKey: 'sellerDTO.sellerName',
    cell: ({ row }) => (
      <div className="text-center typo-title-14-r text-gray-900">
        {row.original.sellerDTO.sellerName}
      </div>
    ),
    size: 100,
  },
  {
    header: '연락처/추가연락처',
    accessorKey: 'sellerStoreDTO.phone',
    cell: ({ row }) => (
      <div>
        <p className="text-center typo-title-14-r text-gray-900">
          {row.original.sellerStoreDTO.phone}
        </p>
        <p className="text-center typo-title-14-r text-gray-900">
          {row.original.sellerStoreDTO.subPhone}
        </p>
      </div>
    ),
    size: 150,
  },
  {
    header: '이메일',
    accessorKey: 'sellerStoreDTO.email',
    cell: ({ row }) => (
      <p className="text-center typo-title-14-r text-gray-900">
        {row.original.sellerStoreDTO.email}
      </p>
    ),
    size: 150,
  },
  {
    header: '출고지주소',
    accessorKey: 'sellerStoreDTO.originAddressLine',
    cell: ({ row }) => (
      <div>
        <p className="text-center typo-title-14-r text-gray-900">
          {row.original.sellerStoreDTO.originAddressLine}
        </p>
        <p className="text-center typo-title-14-r text-gray-900">
          {row.original.sellerStoreDTO.originAddressDetail}
        </p>
      </div>
    ),
    size: 250,
  },
  {
    header: '상태',
    accessorKey: 'sellerDTO.sellerStatus',
    cell: ({ row }) => (
      <p className="text-center typo-body-12-r text-gray-900">
        {row.original.sellerDTO.sellerStatus}
      </p>
    ),
    size: 100,
  },
]
