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
  updateOrderStatus,
} from '@/entity/order/order.api'
import { orderQueries } from '@/entity/order/order.query'
import {
  CourierName,
  OrderStatusCount,
  OrderStatusTab,
} from '@/entity/order/order.type'
import { toast } from '@dessert/ui'
import {
  OrderActionBar,
  useConfirmOrderMutation,
  useDecideCancelMutation,
  useDecideReturnMutation,
} from '@/features/order/order-action-bar'
import { OrderDetailModal } from '@/features/order/order-detail-modal/order-detail-modal.ui'
import { useOrderFilter } from '@/features/order/order-filters/order-filters.hook'
import { OrderFilters } from '@/features/order/order-filters/order-filters.ui'
import {
  REASON_REQUIRED_ACTIONS,
  ReasonAction,
  ReasonInputModal,
  useCreateExchangeMutation,
  useCreateReturnMutation,
} from '@/features/order/reason-input-modal'
import { OrderSelectAlertModal } from '@/features/order/order-select-alert-modal/order-select-alert-modal.ui'
import { OrderStatusTabs } from '@/features/order/order-status-tabs/order-status-tabs.ui'
import { useOrderSelection } from '@/features/order/order-table/order-selection.hook'
import { OrderTable } from '@/features/order/order-table/order-table.ui'
import {
  TrackingNumberModal,
  useCreateShipmentMutation,
  useUpdateShipmentMutation,
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

  const createShipmentMutation = useCreateShipmentMutation()
  const updateShipmentMutation = useUpdateShipmentMutation()
  const confirmOrderMutation = useConfirmOrderMutation()
  const createReturnMutation = useCreateReturnMutation()
  const createExchangeMutation = useCreateExchangeMutation()
  const decideCancelMutation = useDecideCancelMutation()
  const decideReturnMutation = useDecideReturnMutation()

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

  // 발주확인: 스펙 API는 1주문 당 1콜이라 선택된 주문 수만큼 병렬 호출 후 결과 집계
  // TODO: 백엔드가 목록 응답에 orderId/orderItemId 노출 시 selection에서 정확한 ID 수집
  // 임시: orderNumber 숫자 캐스팅을 orderId/orderItemId 양쪽에 사용
  const handleConfirmOrders = async () => {
    const results = await Promise.allSettled(
      selectedIds.map((orderNumber) => {
        const id = Number(orderNumber)
        return confirmOrderMutation.mutateAsync({
          orderId: id,
          orderItemIds: [id],
        })
      }),
    )

    const successCount = results.filter(
      (r) => r.status === 'fulfilled' && r.value.summary.successCount > 0,
    ).length
    const failCount = results.length - successCount

    if (successCount > 0) {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
      selectionReset()
    }

    if (failCount === 0) {
      toast.success(`${successCount}건 발주 확인 완료`)
    } else if (successCount > 0) {
      toast.success(`${successCount}건 성공, ${failCount}건 실패`)
    } else {
      toast.error('발주 확인에 실패했습니다.')
    }
  }

  // 반품 요청 생성: 스펙 API는 1주문 당 1콜, 선택된 주문 수만큼 병렬 호출
  const handleCreateReturns = async (
    reason: string | null,
    sellerComment: string | null,
  ) => {
    const results = await Promise.allSettled(
      selectedIds.map((orderNumber) => {
        const id = Number(orderNumber)
        return createReturnMutation.mutateAsync({
          orderId: id,
          orderItemIds: [id],
          reason,
          sellerComment,
        })
      }),
    )

    const successCount = results.filter(
      (r) => r.status === 'fulfilled' && r.value.summary.successCount > 0,
    ).length
    const failCount = results.length - successCount

    if (successCount > 0) {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
      selectionReset()
      setReasonModalOpen(false)
    }

    if (failCount === 0) {
      toast.success(`${successCount}건 반품 요청 완료`)
    } else if (successCount > 0) {
      toast.success(`${successCount}건 성공, ${failCount}건 실패`)
    } else {
      toast.error('반품 요청에 실패했습니다.')
    }
  }

  // 교환 요청 생성: 스펙 API는 1주문 당 1콜, 선택된 주문 수만큼 병렬 호출
  const handleCreateExchanges = async (
    reason: string | null,
    sellerComment: string | null,
  ) => {
    const results = await Promise.allSettled(
      selectedIds.map((orderNumber) => {
        const id = Number(orderNumber)
        return createExchangeMutation.mutateAsync({
          orderId: id,
          orderItemIds: [id],
          reason,
          sellerComment,
        })
      }),
    )

    const successCount = results.filter(
      (r) => r.status === 'fulfilled' && r.value.summary.successCount > 0,
    ).length
    const failCount = results.length - successCount

    if (successCount > 0) {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
      selectionReset()
      setReasonModalOpen(false)
    }

    if (failCount === 0) {
      toast.success(`${successCount}건 교환 요청 완료`)
    } else if (successCount > 0) {
      toast.success(`${successCount}건 성공, ${failCount}건 실패`)
    } else {
      toast.error('교환 요청에 실패했습니다.')
    }
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
      void handleConfirmOrders()
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
    // 반품 요청 생성은 별도 엔드포인트로 분기
    if (reasonAction === 'requestReturn') {
      void handleCreateReturns(
        data.reasonType || null,
        data.reasonDetail || null,
      )
      return
    }

    // 교환 요청 생성은 별도 엔드포인트로 분기
    if (reasonAction === 'requestExchange') {
      void handleCreateExchanges(
        data.reasonType || null,
        data.reasonDetail || null,
      )
      return
    }

    // 반품 승인/거절은 별도 decision 엔드포인트로 분기
    if (
      reasonAction === 'approveReturn' ||
      reasonAction === 'rejectReturn'
    ) {
      // TODO: 백엔드가 목록 응답에 returnId를 노출하면 selection에서 수집
      // 임시: orderNumber 숫자 캐스팅을 returnId로 사용
      const returnIds = selectedIds
        .map((id) => Number(id))
        .filter((n) => !Number.isNaN(n))
      const reason = [data.reasonType, data.reasonDetail]
        .filter(Boolean)
        .join(' - ')
      decideReturnMutation.mutate(
        {
          returnIds,
          decisionType: reasonAction === 'approveReturn' ? 'APPROVE' : 'REJECT',
          reason: reason || null,
        },
        {
          onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: orderQueries.all() })
            toast.success(
              variables.decisionType === 'APPROVE'
                ? '반품을 완료했어요.'
                : '반품 거절을 완료했어요.',
            )
            selectionReset()
            setReasonModalOpen(false)
          },
          onError: () => {
            toast.error('반품 처리에 실패했습니다.')
          },
        },
      )
      return
    }

    // 취소 승인/거절은 별도 decision 엔드포인트로 분기
    if (
      reasonAction === 'approveCancellation' ||
      reasonAction === 'rejectCancellation'
    ) {
      // TODO: 백엔드가 목록 응답에 cancelId를 노출하면 selection에서 수집
      // 임시: orderNumber 숫자 캐스팅을 cancelId로 사용
      const cancelIds = selectedIds
        .map((id) => Number(id))
        .filter((n) => !Number.isNaN(n))
      const reason = [data.reasonType, data.reasonDetail]
        .filter(Boolean)
        .join(' - ')
      decideCancelMutation.mutate(
        {
          cancelIds,
          decisionType:
            reasonAction === 'approveCancellation' ? 'APPROVE' : 'REJECT',
          reason: reason || null,
        },
        {
          onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: orderQueries.all() })
            toast.success(
              variables.decisionType === 'APPROVE'
                ? '주문취소를 완료했어요.'
                : '주문취소 거절을 완료했어요.',
            )
            selectionReset()
            setReasonModalOpen(false)
          },
          onError: () => {
            toast.error('주문 취소 처리에 실패했습니다.')
          },
        },
      )
      return
    }

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
    // TODO: 백엔드가 목록 응답에 orderId/orderItemId 노출 시 selection에서 정확한 ID 수집
    // 임시: orderNumber 숫자 캐스팅을 orderId/orderItemId 양쪽에 사용
    const id = Number(trackingTarget.orderNumber)
    const payload = {
      orderId: id,
      orderItemIds: [id],
      courierName: courier,
      trackingNumber,
    }
    if (trackingMode === 'edit') {
      updateShipmentMutation.mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: orderQueries.all() })
          toast.success('운송장 정보가 수정되었습니다.')
          setTrackingModalOpen(false)
        },
        onError: () => {
          toast.error('운송장 수정에 실패했습니다.')
        },
      })
    } else {
      createShipmentMutation.mutate(payload, {
        onSuccess: (result) => {
          const { successCount, failCount } = result.summary
          if (failCount === 0) {
            queryClient.invalidateQueries({ queryKey: orderQueries.all() })
            toast.success('운송장 정보가 저장되었습니다.')
            setTrackingModalOpen(false)
          } else if (successCount > 0) {
            queryClient.invalidateQueries({ queryKey: orderQueries.all() })
            toast.success(`${successCount}건 등록 성공, ${failCount}건 실패`)
          } else {
            toast.error('운송장 저장에 실패했습니다.')
          }
        },
        onError: () => {
          toast.error('운송장 저장에 실패했습니다.')
        },
      })
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
          onTrackingOpen={handleTrackingOpen}
        />
      </section>

      <OrderDetailModal
        open={detailOpen}
        onOpenChange={setDetailOpen}
        // TODO: 백엔드가 목록 응답에 orderItemId를 노출하면 selection에서 직접 수집
        // 임시: 선택된 orderNumber를 숫자 캐스팅 (mock 매칭용, 실서버는 ID 매칭 안 됨)
        orderItemIds={selectedIds
          .map((id) => Number(id))
          .filter((n) => !Number.isNaN(n))}
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
