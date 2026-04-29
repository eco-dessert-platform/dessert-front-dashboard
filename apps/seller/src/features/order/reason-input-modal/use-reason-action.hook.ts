import { useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { toast } from '@dessert/ui'

import { MUTATION_BATCH_SIZE } from '@/entity/order'
import { useCreateExchangeMutation } from './create-exchange.mutation'
import { useCreateReturnMutation } from './create-return.mutation'
import {
  REASON_TOAST_MESSAGE,
  type ReasonAction,
} from './reason-input-modal.constant'
import { useUpdateOrderStatusMutation } from './update-status.mutation'
import { orderQueries } from '@/entity/order/order.query'
import { settledInBatches } from '@/shared/utils/promise'

interface ReasonInputData {
  reasonType: string
  reasonDetail: string
  images: File[]
}

interface UseReasonActionParams {
  selectedIds: string[]
  onClearSelection: () => void
}

export function useReasonAction({
  selectedIds,
  onClearSelection,
}: UseReasonActionParams) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [action, setAction] = useState<ReasonAction>('cancelOrder')

  const createReturnMutation = useCreateReturnMutation()
  const createExchangeMutation = useCreateExchangeMutation()
  const updateStatusMutation = useUpdateOrderStatusMutation()

  const isPending =
    createReturnMutation.isPending ||
    createExchangeMutation.isPending ||
    updateStatusMutation.isPending

  const open = (next: ReasonAction) => {
    setAction(next)
    setIsOpen(true)
  }

  const finishWithCleanup = () => {
    onClearSelection()
    setIsOpen(false)
  }

  // 반품/교환 요청 생성: 스펙 API는 1주문 당 1콜, 선택된 주문 수만큼 병렬 호출
  const submitCreateRequest = async (
    mutation: typeof createReturnMutation,
    label: string,
    reason: string | null,
    sellerComment: string | null,
  ) => {
    const targetOrderIds = selectedIds
      .map((orderNumber) => Number(orderNumber))
      .filter((id) => Number.isFinite(id))
    const invalidCount = selectedIds.length - targetOrderIds.length

    if (targetOrderIds.length === 0) {
      toast.error('유효한 주문이 없습니다.')
      return
    }

    const results = await settledInBatches(
      targetOrderIds,
      MUTATION_BATCH_SIZE,
      (id) =>
        mutation.mutateAsync({
          orderId: id,
          orderItemIds: [id],
          reason,
          sellerComment,
        }),
    )

    const successCount = results.filter(
      (r) => r.status === 'fulfilled' && r.value.summary.successCount > 0,
    ).length
    const failCount = results.length - successCount + invalidCount

    if (successCount > 0) {
      finishWithCleanup()
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
    }

    if (failCount === 0) {
      toast.success(`${successCount}건 ${label} 요청 완료`)
    } else if (successCount > 0) {
      toast.success(`${successCount}건 성공, ${failCount}건 실패`)
    } else {
      toast.error(`${label} 요청에 실패했습니다.`)
    }
  }

  // 백엔드가 목록 응답에 returnId/cancelId를 노출하기 전까지 호출 차단.
  // orderNumber를 ID로 캐스팅해 보내면 다른 건이 처리될 위험이 있어 안내 토스트만 노출.
  const notifyDecisionPending = () => {
    toast.error('아직 준비 중인 기능입니다.')
    finishWithCleanup()
  }

  const submitUpdateStatus = (data: ReasonInputData) => {
    updateStatusMutation.mutate(
      {
        orderNumbers: selectedIds,
        reasonType: data.reasonType,
        reasonDetail: data.reasonDetail,
        images: data.images,
      },
      {
        onSuccess: () => {
          toast.success(REASON_TOAST_MESSAGE[action])
          finishWithCleanup()
        },
        onError: () => toast.error('주문 상태 변경에 실패했습니다.'),
      },
    )
  }

  const handleConfirm = (data: ReasonInputData) => {
    switch (action) {
      case 'requestReturn':
        return void submitCreateRequest(
          createReturnMutation,
          '반품',
          data.reasonType || null,
          data.reasonDetail || null,
        )
      case 'requestExchange':
        return void submitCreateRequest(
          createExchangeMutation,
          '교환',
          data.reasonType || null,
          data.reasonDetail || null,
        )
      case 'approveReturn':
      case 'rejectReturn':
      case 'approveCancellation':
      case 'rejectCancellation':
        return notifyDecisionPending()
      default:
        return submitUpdateStatus(data)
    }
  }

  return {
    isOpen,
    setIsOpen,
    action,
    open,
    handleConfirm,
    isPending,
  }
}
