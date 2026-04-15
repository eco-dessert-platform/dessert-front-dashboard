import { useState } from 'react'

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import {
  completeExchange,
  completeReturn,
  confirmOrder,
  updateOrderStatus,
  updateTracking,
} from '@/entity/order/order.api'
import { orderQueries } from '@/entity/order/order.query'
import {
  CourierName,
  OrderStatusCount,
  OrderStatusTab,
} from '@/entity/order/order.type'
import { toast } from '@dessert/ui'
import { OrderActionBar } from '@/features/order/order-action-bar/order-action-bar.ui'
import { OrderDetailModal } from '@/features/order/order-detail-modal/order-detail-modal.ui'
import { useOrderFilter } from '@/features/order/order-filters/order-filters.hook'
import { OrderFilters } from '@/features/order/order-filters/order-filters.ui'
import {
  REASON_REQUIRED_ACTIONS,
  ReasonAction,
} from '@/features/order/reason-input-modal/reason-input-modal.constant'
import { ReasonInputModal } from '@/features/order/reason-input-modal/reason-input-modal.ui'
import { OrderSelectAlertModal } from '@/features/order/order-select-alert-modal/order-select-alert-modal.ui'
import { OrderStatusTabs } from '@/features/order/order-status-tabs/order-status-tabs.ui'
import { useOrderSelection } from '@/features/order/order-table/order-selection.hook'
import { OrderTable } from '@/features/order/order-table/order-table.ui'
import { TrackingNumberModal } from '@/features/order/tracking-number-modal/tracking-number-modal.ui'

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
  const queryClient = useQueryClient()
  const [detailOpen, setDetailOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [reasonModalOpen, setReasonModalOpen] = useState(false)
  const [reasonAction, setReasonAction] = useState<ReasonAction>('cancelOrder')
  const [trackingModalOpen, setTrackingModalOpen] = useState(false)
  const [trackingMode, setTrackingMode] = useState<'create' | 'edit'>('create')
  const [trackingTarget, setTrackingTarget] = useState<{
    orderNumber: string
    courier?: CourierName | null
    trackingNumber?: string | null
  } | null>(null)
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

  const { data } = useQuery({
    ...orderQueries.list(appliedFilters),
    placeholderData: keepPreviousData,
  })
  const orders = data?.content ?? []

  const updateStatusMutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
      selectionReset()
    },
    onError: () => {
      toast.error('주문 상태 변경에 실패했습니다.')
    },
  })

  const updateTrackingMutation = useMutation({
    mutationFn: updateTracking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
      toast.success('운송장 정보가 저장되었습니다.')
      setTrackingModalOpen(false)
    },
    onError: () => {
      toast.error('운송장 저장에 실패했습니다.')
    },
  })

  const completeReturnMutation = useMutation({
    mutationFn: completeReturn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
      toast.success('반품이 완료 처리되었습니다.')
      selectionReset()
    },
    onError: () => {
      toast.error('반품 완료 처리에 실패했습니다.')
    },
  })

  const completeExchangeMutation = useMutation({
    mutationFn: completeExchange,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
      toast.success('교환이 완료 처리되었습니다.')
      selectionReset()
    },
    onError: () => {
      toast.error('교환 완료 처리에 실패했습니다.')
    },
  })

  const confirmOrderMutation = useMutation({
    mutationFn: confirmOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
      toast.success('발주가 확인되었습니다.')
      selectionReset()
    },
    onError: () => {
      toast.error('발주 확인에 실패했습니다.')
    },
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
      return
    }

    if (action === 'confirmOrder') {
      if (selectedIds.length === 0) {
        setAlertOpen(true)
        return
      }
      if (confirmOrderMutation.isPending) return
      confirmOrderMutation.mutate({ orderNumbers: selectedIds })
      return
    }

    if (action === 'completeReturn') {
      if (selectedIds.length === 0) {
        setAlertOpen(true)
        return
      }
      if (completeReturnMutation.isPending) return
      completeReturnMutation.mutate({ orderNumbers: selectedIds })
      return
    }

    if (action === 'completeExchange') {
      if (selectedIds.length === 0) {
        setAlertOpen(true)
        return
      }
      if (completeExchangeMutation.isPending) return
      completeExchangeMutation.mutate({ orderNumbers: selectedIds })
      return
    }

    if (REASON_REQUIRED_ACTIONS.has(action)) {
      if (selectedIds.length === 0) {
        setAlertOpen(true)
        return
      }
      setReasonAction(action as ReasonAction)
      setReasonModalOpen(true)
    }
  }

  const handleReasonConfirm = (data: {
    reasonType: string
    reasonDetail: string
    images: File[]
  }) => {
    updateStatusMutation.mutate({
      orderNumbers: selectedIds,
      reasonType: data.reasonType,
      reasonDetail: data.reasonDetail,
      images: data.images,
    })
  }

  const handleTrackingOpen = (
    mode: 'create' | 'edit',
    orderNumber: string,
    courier?: CourierName | null,
    trackingNumber?: string | null,
  ) => {
    setTrackingMode(mode)
    setTrackingTarget({ orderNumber, courier, trackingNumber })
    setTrackingModalOpen(true)
  }

  const handleTrackingConfirm = (
    courier: CourierName,
    trackingNumber: string,
  ) => {
    if (!trackingTarget?.orderNumber) return
    updateTrackingMutation.mutate({
      orderNumber: trackingTarget.orderNumber,
      courierName: courier,
      trackingNumber,
    })
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
          onTrackingOpen={handleTrackingOpen}
        />
      </section>

      <OrderDetailModal
        open={detailOpen}
        onOpenChange={setDetailOpen}
        orderNumbers={selectedIds}
      />
      <OrderSelectAlertModal open={alertOpen} onOpenChange={setAlertOpen} />
      <ReasonInputModal
        open={reasonModalOpen}
        onOpenChange={setReasonModalOpen}
        action={reasonAction}
        onConfirm={handleReasonConfirm}
      />
      <TrackingNumberModal
        key={trackingTarget?.orderNumber ?? ''}
        open={trackingModalOpen}
        onOpenChange={setTrackingModalOpen}
        mode={trackingMode}
        defaultCourier={trackingTarget?.courier}
        defaultTrackingNumber={trackingTarget?.trackingNumber}
        onConfirm={handleTrackingConfirm}
      />
    </div>
  )
}

export default AllOrdersPage
