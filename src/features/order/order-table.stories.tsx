import {
  OrderFilters as OrderFiltersType,
  OrderStatusCount,
  OrderStatusTab,
} from '@/entity/order/order.type'
import { Meta, StoryObj } from '@storybook/react'
import { OrderTable } from './order-table/order-table.ui'
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { useOrderFilter } from './order-filters/order-filters.hook'
import { orderQueries } from '@/entity/order/order.query'
import { useOrderSelection } from './order-table/order-selection.hook'
import { OrderStatusTabs } from './order-status-tabs/order-status-tabs.ui'
import { OrderFilters } from './order-filters/order-filters.ui'
import { OrderActionBar } from './order-action-bar/order-action-bar.ui'
import { useCallback } from 'react'

const DEFAULT_STATUS_COUNT: OrderStatusCount = {
  total: 0,
  paymentCompleted: 0,
  orderConfirmed: 0,
  productShipped: 0,
  deliveryCompleted: 0,
  canceled: 0,
  returned: 0,
  exchanged: 0,
}

const meta = {
  title: 'Feature/Order/OrderTable',
  component: OrderTable,
  decorators: [
    (Story) => (
      <QueryClientProvider client={new QueryClient()}>
        <div className="h-screen w-screen bg-gray-50 p-22.5">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof OrderTable>

export default meta

function OrderControlPanel() {
  const { filters, setFilters, reset: filterReset } = useOrderFilter('all')

  const { data } = useQuery({
    ...orderQueries.list(filters),
    placeholderData: keepPreviousData,
  })

  const orders = data?.content ?? []

  const {
    selectedIds,
    productSelectedIds,
    allSelected,
    indeterminate,
    toggleAll,
    toggleOne,
    toggleProduct,
    reset: selectionReset,
  } = useOrderSelection(orders)

  const handleTabChange = (tab: OrderStatusTab) => {
    selectionReset()
    filterReset()
    setFilters((prev) => ({ ...prev, tab }))
  }

  const handleFiltersChange = (nextFilters: OrderFiltersType) => {
    selectionReset()
    setFilters(nextFilters)
  }

  const handleReset = () => {
    selectionReset()
    filterReset()
  }

  const handlePageChange = (page: number) => {
    selectionReset()
    setFilters((prev) => ({ ...prev, page: String(page - 1) }))
  }

  const handleAction = useCallback((action: string) => {
    switch (action) {
      case 'detailView':
        console.log('상세보기')
        break
      case 'confirmOrder':
        console.log('발주확인')
        break
      case 'cancelOrder':
        console.log('주문취소')
        break
      case 'requestReturn':
        console.log('반품 신청')
        break
      case 'requestExchange':
        console.log('교환 신청')
        break
      case 'approveCancellation':
        console.log('취소 승인')
        break
      case 'rejectCancellation':
        console.log('취소 거절')
        break
      case 'approveReturn':
        console.log('반품 승인')
        break
      case 'rejectReturn':
        console.log('반품 거절')
        break
      case 'completeReturn':
        console.log('반품 완료')
        break
      case 'turnDownReturn':
        console.log('반품 반려')
        break
      case 'holdReturn':
        console.log('반품 보류')
        break
      // exchanged 액션들은 디자이너 확인 후 추가
    }
  }, [])

  const currentPage = filters.page ? Number(filters.page) + 1 : 1
  const totalPages = data?.totalPages ?? 1
  const totalCount = data?.totalElements ?? 0

  return (
    <div className="flex flex-col gap-6 p-4">
      <OrderStatusTabs
        selectedTab={filters.tab ?? 'all'}
        statusCount={data?.statusCount ?? DEFAULT_STATUS_COUNT}
        onChange={handleTabChange}
      />

      <OrderFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleReset}
      />

      <section className="mt-10 rounded-10 border bg-white">
        <OrderActionBar
          tab={filters.tab ?? 'all'}
          onAction={handleAction}
          selectedCount={selectedIds.length}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <OrderTable
          orders={orders}
          selectedIds={selectedIds}
          productSelectedIds={productSelectedIds}
          allSelected={allSelected}
          indeterminate={indeterminate}
          onToggleAll={toggleAll}
          onToggleOne={toggleOne}
          onToggleProduct={toggleProduct}
        />
      </section>
    </div>
  )
}

export const WithFullControls: StoryObj = {
  render: () => <OrderControlPanel />,
}

export const EmptyOrders: StoryObj<typeof meta> = {
  args: {
    orders: [],
    selectedIds: [],
    productSelectedIds: [],
    allSelected: false,
    indeterminate: false,
    onToggleAll: () => {},
    onToggleOne: () => {},
    onToggleProduct: () => {},
  },
}
