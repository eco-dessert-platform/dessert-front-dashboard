import { useState } from 'react'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { completedOrderQueries } from '@/entity/order/completed-order.query'
import {
  CompletedOrderStatusCount,
  CompletedOrderTab,
} from '@/entity/order/order.type'
import { CompletedOrderActionBar } from '@/features/order/completed-order-action-bar'
import {
  CompletedOrderFilters,
  useCompletedOrderFilter,
} from '@/features/order/completed-order-filters'
import { CompletedOrderTabs } from '@/features/order/completed-order-tabs'
import { OrderDetailModal } from '@/features/order/order-detail-modal'
import { OrderSelectAlertModal } from '@/features/order/order-select-alert-modal'
import {
  OrderTable,
  useOrderSelection,
  useOrderTableLoading,
} from '@/features/order/order-table'

const VALID_TABS: CompletedOrderTab[] = [
  'completed',
  'canceled',
  'returned',
  'exchanged',
]

const DEFAULT_STATUS_COUNT: CompletedOrderStatusCount = {
  completed: 0,
  canceled: 0,
  returned: 0,
  exchanged: 0,
}

function CompletedOrdersPage() {
  const [detailOpen, setDetailOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const statusParam = searchParams.get('status')
  const selectedTab: CompletedOrderTab = VALID_TABS.includes(
    statusParam as CompletedOrderTab,
  )
    ? (statusParam as CompletedOrderTab)
    : 'completed'

  const {
    draftFilters,
    appliedFilters,
    setDraftFilters,
    setAppliedFilters,
    apply,
    reset: filtersReset,
  } = useCompletedOrderFilter(selectedTab)

  const { data, isFetching } = useQuery({
    ...completedOrderQueries.list(appliedFilters),
    placeholderData: keepPreviousData,
  })
  const orders = data?.content ?? []

  const { loadingMode, dismissMutationLoading } = useOrderTableLoading({
    isListLoading: isFetching,
    isMutationPending: false,
  })

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

  const handleTabChange = (tab: CompletedOrderTab) => {
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
    if (selectedIds.length === 0) {
      setAlertOpen(true)
      return
    }

    if (action === 'detailView') {
      setDetailOpen(true)
    }
  }

  const currentPage = appliedFilters.page ? Number(appliedFilters.page) + 1 : 1
  const currentTab = appliedFilters.tab ?? 'completed'
  const totalPages = data?.totalPages ?? 1
  const totalCount = data?.totalElements ?? 0

  return (
    <div className="flex flex-col gap-6 p-4">
      <CompletedOrderTabs
        selectedTab={currentTab}
        statusCount={data?.statusCount ?? DEFAULT_STATUS_COUNT}
        onChange={handleTabChange}
      />

      <CompletedOrderFilters
        filters={draftFilters}
        onFiltersChange={setDraftFilters}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <section className="mt-10 rounded-10 border bg-white">
        <CompletedOrderActionBar
          tab={currentTab}
          onAction={handleAction}
          selectedCount={selectedIds.length}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <OrderTable
          tab="deliveryCompleted"
          orders={orders}
          selectedIds={selectedIds}
          productSelectedIds={productSelectedIds}
          allSelected={allSelected}
          indeterminate={indeterminate}
          onToggleAll={toggleAll}
          onToggleOne={toggleOne}
          onToggleProduct={toggleProduct}
          loadingMode={loadingMode}
          onCancelLoading={dismissMutationLoading}
        />
      </section>

      <OrderDetailModal
        open={detailOpen}
        onOpenChange={setDetailOpen}
        orderItemIds={orders
          .filter((o) => selectedIds.includes(o.orderNumber))
          .flatMap((o) => o.products.map((p) => String(p.orderItemId)))}
      />
      <OrderSelectAlertModal open={alertOpen} onOpenChange={setAlertOpen} />
    </div>
  )
}

export default CompletedOrdersPage
