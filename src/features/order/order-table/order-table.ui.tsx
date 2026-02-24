import {
  DELIVERY_STATUS_LABELS,
  ORDER_STATUS_BADGE_COLOR,
  ORDER_STATUS_LABELS,
} from '@/entity/order/order.constant'
import {
  OrderItem,
  OrderProduct,
  OrderStatusTab,
} from '@/entity/order/order.type'
import Badge from '@/shared/components/ui/badge/badge'
import Checkbox from '@/shared/components/ui/checkbox/checkbox'
import Table from '@/shared/components/ui/table/table'
import { ColumnDef, Row } from '@tanstack/react-table'
import { useCallback, useMemo } from 'react'
import { getRowSpanForGroup } from '@/shared/utils/tableSpan'
import Button from '@/shared/components/ui/button/button'

type FlatOrderRow = Omit<OrderItem, 'products'> &
  OrderProduct & {
    productKey: string
  }

function flattenOrders(orders: OrderItem[]): FlatOrderRow[] {
  return orders.flatMap((order) => {
    const { products, ...orderFields } = order

    return products.map((product, index) => ({
      ...orderFields,
      ...product,
      productKey: `${order.orderNumber}_${index}`,
    }))
  })
}

interface OrderTableProps {
  tab: OrderStatusTab
  orders: OrderItem[]
  selectedIds: string[]
  productSelectedIds: string[]
  allSelected: boolean
  indeterminate: boolean
  onToggleAll: () => void
  onToggleOne: (orderNumber: string) => void
  onToggleProduct: (productKey: string, orderNumber: string) => void
}

export function OrderTable({
  tab,
  orders,
  selectedIds,
  productSelectedIds,
  allSelected,
  indeterminate,
  onToggleAll,
  onToggleOne,
  onToggleProduct,
}: OrderTableProps) {
  const flatRows = useMemo(() => flattenOrders(orders), [orders])
  const getRowSpanForOrder = useCallback(
    (rowIndex: number) => {
      return getRowSpanForGroup({
        rows: flatRows,
        rowIndex,
        getKey: (row) => row.orderNumber,
      })
    },
    [flatRows],
  )

  // <tr> 전체 배경색 (주문 단위 선택)
  const getRowClassName = useCallback(
    (row: Row<FlatOrderRow>): string => {
      return selectedIds.includes(row.original.orderNumber) ? 'bg-gray-200' : ''
    },
    [selectedIds],
  )

  // 상품 단위 셀 배경색 (상품/주문 선택 모두)
  const getProductCellClassName = useCallback(
    ({ row }: { row: Row<FlatOrderRow> }) => {
      const isProductSelected = productSelectedIds.includes(
        row.original.productKey,
      )
      const isOrderSelected = selectedIds.includes(row.original.orderNumber)
      return isProductSelected || isOrderSelected ? 'bg-gray-200' : ''
    },
    [selectedIds, productSelectedIds],
  )

  const columns = useMemo<ColumnDef<FlatOrderRow>[]>(
    () => [
      {
        id: 'select',
        meta: {
          getRowSpan: ({ row }) => getRowSpanForOrder(row.index),
        },
        header: () => (
          <Checkbox
            type="multiple"
            checked={
              allSelected ? true : indeterminate ? 'indeterminate' : false
            }
            onCheckedChange={onToggleAll}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={selectedIds.includes(row.original.orderNumber)}
            onCheckedChange={() => onToggleOne(row.original.orderNumber)}
          />
        ),
        size: 40,
        enableResizing: false,
      },
      {
        id: 'recipient',
        header: () => '수취인명/주문번호',
        meta: {
          getRowSpan: ({ row }) => getRowSpanForOrder(row.index),
        },
        cell: ({ row }) => (
          <div>
            <p className="typo-title-14-sb">{row.original.recipientName}</p>
            <p className="typo-body-12-r text-gray-500">
              {row.original.orderNumber}
            </p>
          </div>
        ),
        size: 100,
        enableResizing: false,
      },
      {
        id: 'productSelect',
        meta: { getCellClassName: getProductCellClassName },
        cell: ({ row }) => (
          <Checkbox
            checked={
              productSelectedIds.includes(row.original.productKey) ||
              selectedIds.includes(row.original.orderNumber)
            }
            onCheckedChange={() =>
              onToggleProduct(row.original.productKey, row.original.orderNumber)
            }
          />
        ),

        size: 40,
        enableResizing: false,
      },
      {
        id: 'product',
        header: '상품명',
        meta: { getCellClassName: getProductCellClassName },
        enableResizing: true,
        cell: ({ row }) => (
          <div className="text-left">
            <p className="typo-title-14-r">{row.original.productName}</p>

            {row.original.optionName && (
              <>
                <span className="typo-body-12-r text-gray-500">
                  {row.original.optionName}
                </span>
                <span className="typo-body-12-r text-gray-500">{' / '}</span>
              </>
            )}

            <span className="typo-body-12-r text-gray-500">
              {row.original.quantity}개
            </span>
            <span className="pl-8 typo-body-12-b text-gray-800">{`${row.original.price.toLocaleString()}원`}</span>
          </div>
        ),
        size: 381,
        minSize: 250,
      },
      {
        accessorKey: 'orderStatus',
        header: '주문상태',
        meta: { getCellClassName: getProductCellClassName },
        cell: ({ row }) => (
          <Badge
            color={ORDER_STATUS_BADGE_COLOR[row.original.orderStatus]}
            content={ORDER_STATUS_LABELS[row.original.orderStatus]}
          />
        ),
        size: 66,
        enableResizing: false,
      },
      {
        id: 'payment',
        header: '결제수단/결제일',
        meta: {
          getRowSpan: ({ row }) => getRowSpanForOrder(row.index),
        },
        cell: ({ row }) => (
          <div>
            <p className="typo-body-10-r text-gray-600">
              {row.original.paymentMethod}
            </p>
            <p className="typo-body-12-r text-gray-800">
              {row.original.paymentDate}
            </p>
          </div>
        ),
        size: 86,
        enableResizing: false,
      },
      {
        accessorKey: 'totalOrderAmount',
        header: '총 주문금액',
        meta: {
          getRowSpan: ({ row }) => getRowSpanForOrder(row.index),
        },
        cell: ({ row }) => (
          <p className="typo-body-12-r text-gray-800">{`${row.original.totalOrderAmount.toLocaleString()}원`}</p>
        ),
        size: 80,
        enableResizing: false,
      },
      {
        accessorKey: 'deliveryStatus',
        header: '배송상태',
        meta: {
          getRowSpan: ({ row }) => getRowSpanForOrder(row.index),
        },
        cell: ({ row }) => (
          <p className="typo-body-12-r text-gray-800">
            {row.original.deliveryStatus
              ? DELIVERY_STATUS_LABELS[row.original.deliveryStatus]
              : '-'}
          </p>
        ),
        size: 64,
        enableResizing: false,
      },
      {
        accessorKey: 'courierName',
        header: '택배사',
        meta: {
          getRowSpan: ({ row }) => getRowSpanForOrder(row.index),
        },
        cell: ({ row }) => (
          <p className="typo-body-12-r text-gray-800">
            {row.original.courierName ? row.original.courierName : '-'}
          </p>
        ),
        size: 76,
        enableResizing: false,
      },
      {
        accessorKey: 'trackingNumber',
        header: '운송장 번호',
        meta: {
          getRowSpan: ({ row }) => getRowSpanForOrder(row.index),
        },
        cell: ({ row }) => {
          return <TrackingNumberCell row={row} tab={tab} />
        },
        size: 90,
        enableResizing: false,
      },
    ],
    [
      getProductCellClassName,
      getRowSpanForOrder,
      allSelected,
      indeterminate,
      onToggleAll,
      selectedIds,
      onToggleOne,
      productSelectedIds,
      onToggleProduct,
      tab,
    ],
  )

  return (
    <Table
      data={flatRows}
      columns={columns}
      scrollHeight={498}
      getRowClassName={getRowClassName}
    />
  )
}

interface TrackingNumberCellProps {
  row: Row<FlatOrderRow>
  tab: OrderStatusTab
}

function TrackingNumberCell({ row, tab }: TrackingNumberCellProps) {
  if (tab === 'orderConfirmed') {
    return <Button variant="secondary-outlined" size="sm" title="입력" />
  }

  if (tab === 'productShipped' || tab == 'deliveryCompleted') {
    return (
      <div className="flex flex-col gap-2">
        <p className="typo-body-12-r wrap-break-word text-gray-800">
          {row.original.trackingNumber ? row.original.trackingNumber : '-'}
        </p>

        <div className="flex flex-1 justify-center">
          <Button
            variant="secondary-outlined"
            size="sm"
            title="수정"
            className="w-56"
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <p className="typo-body-12-r wrap-break-word text-gray-800">
        {row.original.trackingNumber ? row.original.trackingNumber : '-'}
      </p>
    </div>
  )
}
