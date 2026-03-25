import { useState } from 'react'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { orderQueries } from '@/entity/order/order.query'
import { OrderStatusCount, OrderStatusTab } from '@/entity/order/order.type'
import { OrderActionBar } from '@/features/order/order-action-bar/order-action-bar.ui'
import { OrderDetailModal } from '@/features/order/order-detail-modal/order-detail-modal.ui'
import { useOrderFilter } from '@/features/order/order-filters/order-filters.hook'
import { OrderFilters } from '@/features/order/order-filters/order-filters.ui'
import { OrderSelectAlertModal } from '@/features/order/order-select-alert-modal/order-select-alert-modal.ui'
import { OrderStatusTabs } from '@/features/order/order-status-tabs/order-status-tabs.ui'
import { useOrderSelection } from '@/features/order/order-table/order-selection.hook'
import { OrderTable } from '@/features/order/order-table/order-table.ui'

const VALID_TABS: OrderStatusTab[] = [
  'all',
  'paymentCompleted',
  'orderConfirmed',
  'productShipped',
  'deliveryCompleted',
  'canceled',
  'returned',
  'exchanged',
]

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

function AllOrdersPage() {
  const [detailOpen, setDetailOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const statusParam = searchParams.get('status')
  const selectedTab: OrderStatusTab = VALID_TABS.includes(
    statusParam as OrderStatusTab,
  )
    ? (statusParam as OrderStatusTab)
    : 'all'

  const {
    draftFilters,
    appliedFilters,
    setDraftFilters,
    setAppliedFilters,
    apply,
    reset: filtersReset,
  } = useOrderFilter(selectedTab)

  // todos: Table 공통 컴포넌트에 loading 관련 props를 추가하고 OrderTable 컴포넌트로 props drilling 예정
  const { data } = useQuery({
    ...orderQueries.list(appliedFilters),
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
    filtersReset(tab)
    selectionReset()
    setSearchParams({ status: tab })
  }

  const handleSearch = () => {
    selectionReset()
    apply()
  }

  const handleReset = () => {
    selectionReset()
    filtersReset()
  }

  const handlePageChange = (page: number) => {
    selectionReset()
    setAppliedFilters((prev) => ({ ...prev, page: String(page - 1) }))
  }

  const handleAction = (action: string) => {
    if (action === 'detailView') {
      if (selectedIds.length === 0) {
        setAlertOpen(true)
        return
      }
      setDetailOpen(true)
    }
  }

  const currentPage = appliedFilters.page ? Number(appliedFilters.page) + 1 : 1
  const currentTab = appliedFilters.tab ?? 'all'
  const totalPages = data?.totalPages ?? 1
  const totalCount = data?.totalElements ?? 0

  return (
    <div className="flex flex-col gap-6 p-4">
      <OrderStatusTabs
        selectedTab={currentTab}
        statusCount={data?.statusCount ?? DEFAULT_STATUS_COUNT}
        onChange={handleTabChange}
      />

      <OrderFilters
        filters={draftFilters}
        onFiltersChange={setDraftFilters}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <section className="mt-10 rounded-10 border bg-white">
        <OrderActionBar
          tab={currentTab}
          onAction={handleAction}
          selectedCount={selectedIds.length}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <OrderTable
          tab={currentTab}
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

      <OrderDetailModal
        open={detailOpen}
        onOpenChange={setDetailOpen}
        orderNumbers={selectedIds}
      />
      <OrderSelectAlertModal open={alertOpen} onOpenChange={setAlertOpen} />
    </div>
  )
}

export default AllOrdersPage
