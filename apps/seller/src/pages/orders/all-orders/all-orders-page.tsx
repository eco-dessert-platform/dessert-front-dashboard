import { useMemo, useState } from 'react'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { toast } from '@dessert/ui'

import { orderQueries } from '@/entity/order/order.query'
import { OrderStatusCount, OrderStatusTab } from '@/entity/order/order.type'
import {
  OrderActionBar,
  useOrderActionBar,
} from '@/features/order/order-action-bar'
import { OrderDetailModal } from '@/features/order/order-detail-modal'
import { OrderFilters, useOrderFilter } from '@/features/order/order-filters'
import { OrderSelectAlertModal } from '@/features/order/order-select-alert-modal'
import { OrderStatusTabs } from '@/features/order/order-status-tabs'
import {
  OrderTable,
  useOrderSelection,
  useOrderTableLoading,
} from '@/features/order/order-table'
import {
  isReasonAction,
  ReasonInputModal,
  useReasonAction,
} from '@/features/order/reason-input-modal'
import {
  TrackingNumberModal,
  useTrackingFlow,
} from '@/features/order/tracking-number-modal'

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

  const { data, isFetching } = useQuery({
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

  const selectedOrders = orders.filter((o) =>
    selectedIds.includes(o.orderNumber),
  )

  const {
    isOpen: isReasonOpen,
    setIsOpen: setReasonOpen,
    action: reasonAction,
    open: openReason,
    handleConfirm: handleReasonConfirm,
    isPending: isReasonPending,
  } = useReasonAction({
    selectedIds,
    selectedOrders,
    onClearSelection: selectionReset,
  })

  const tracking = useTrackingFlow()

  const detailOrderItemIds = useMemo(
    () =>
      selectedOrders.flatMap((o) =>
        o.products.map((p) => String(p.orderItemId)),
      ),
    [selectedOrders],
  )

  const { handleAction: handleActionBar, isPending: isActionBarPending } =
    useOrderActionBar({
      selectedIds,
      selectedOrders,
      onClearSelection: selectionReset,
      onShowDetail: () => setDetailOpen(true),
      onSelectionEmpty: () => setAlertOpen(true),
      onUnhandled: (action) => {
        if (isReasonAction(action)) {
          openReason(action)
        }
      },
    })

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

  const currentPage = appliedFilters.page ? Number(appliedFilters.page) + 1 : 1
  const currentTab = appliedFilters.tab ?? 'all'
  const totalPages = data?.totalPages ?? 1
  const totalCount = data?.totalElements ?? 0

  const isMutationPending =
    isActionBarPending || isReasonPending || tracking.isPending

  const { loadingMode, dismissMutationLoading } = useOrderTableLoading({
    isListLoading: isFetching,
    isMutationPending,
  })

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
          onAction={handleActionBar}
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
          onTrackingOpen={(mode, args) => {
            // 운송장은 주문 단위로 등록 — 같은 orderId의 모든 product를 묶어 보낸다.
            const order = orders.find((o) => o.orderId === args.orderId)
            if (!order) {
              toast.error('주문 정보를 찾을 수 없습니다.')
              return
            }
            tracking.open(mode, {
              orderNumber: args.orderNumber,
              orderId: args.orderId,
              orderItemIds: order.products.map((p) => p.orderItemId),
              courier: args.courier,
              trackingNumber: args.trackingNumber,
            })
          }}
          loadingMode={loadingMode}
          onCancelLoading={dismissMutationLoading}
        />
      </section>

      <OrderDetailModal
        open={detailOpen}
        onOpenChange={setDetailOpen}
        orderItemIds={detailOrderItemIds}
      />
      <OrderSelectAlertModal open={alertOpen} onOpenChange={setAlertOpen} />
      <ReasonInputModal
        open={isReasonOpen}
        onOpenChange={setReasonOpen}
        action={reasonAction}
        onConfirm={handleReasonConfirm}
      />
      <TrackingNumberModal
        key={tracking.target?.orderNumber ?? ''}
        open={tracking.isOpen}
        onOpenChange={tracking.setIsOpen}
        mode={tracking.mode}
        defaultCourier={tracking.target?.courier}
        defaultTrackingNumber={tracking.target?.trackingNumber}
        onConfirm={tracking.handleConfirm}
      />
    </div>
  )
}

export default AllOrdersPage
