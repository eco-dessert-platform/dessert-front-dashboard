import { useState } from 'react'

import { toast } from '@dessert/ui'

import { useCreateExchangeMutation } from './create-exchange.mutation'
import { useCreateReturnMutation } from './create-return.mutation'
import { useDecideCancelMutation } from './decide-cancel.mutation'
import { useDecideReturnMutation } from './decide-return.mutation'
import {
  REASON_TOAST_MESSAGE,
  type ReasonAction,
} from './reason-input-modal.constant'
import { useUpdateOrderStatusMutation } from './update-status.mutation'

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
  const [isOpen, setIsOpen] = useState(false)
  const [action, setAction] = useState<ReasonAction>('cancelOrder')

  const createReturnMutation = useCreateReturnMutation()
  const createExchangeMutation = useCreateExchangeMutation()
  const decideReturnMutation = useDecideReturnMutation()
  const decideCancelMutation = useDecideCancelMutation()
  const updateStatusMutation = useUpdateOrderStatusMutation()

  const isPending =
    createReturnMutation.isPending ||
    createExchangeMutation.isPending ||
    decideReturnMutation.isPending ||
    decideCancelMutation.isPending ||
    updateStatusMutation.isPending

  const open = (next: ReasonAction) => {
    setAction(next)
    setIsOpen(true)
  }

  const finishWithCleanup = () => {
    onClearSelection()
    setIsOpen(false)
  }

  // 반품 요청 생성: 스펙 API는 1주문 당 1콜, 선택된 주문 수만큼 병렬 호출
  const submitCreateReturns = async (
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

    if (successCount > 0) finishWithCleanup()

    if (failCount === 0) {
      toast.success(`${successCount}건 반품 요청 완료`)
    } else if (successCount > 0) {
      toast.success(`${successCount}건 성공, ${failCount}건 실패`)
    } else {
      toast.error('반품 요청에 실패했습니다.')
    }
  }

  // 교환 요청 생성: 스펙 API는 1주문 당 1콜, 선택된 주문 수만큼 병렬 호출
  const submitCreateExchanges = async (
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

    if (successCount > 0) finishWithCleanup()

    if (failCount === 0) {
      toast.success(`${successCount}건 교환 요청 완료`)
    } else if (successCount > 0) {
      toast.success(`${successCount}건 성공, ${failCount}건 실패`)
    } else {
      toast.error('교환 요청에 실패했습니다.')
    }
  }

  const submitDecideReturn = (
    decisionType: 'APPROVE' | 'REJECT',
    data: ReasonInputData,
  ) => {
    // TODO: 백엔드가 목록 응답에 returnId를 노출하면 selection에서 수집
    // 임시: orderNumber 숫자 캐스팅을 returnId로 사용
    const returnIds = selectedIds
      .map((id) => Number(id))
      .filter((n) => !Number.isNaN(n))
    const reason = [data.reasonType, data.reasonDetail]
      .filter(Boolean)
      .join(' - ')

    decideReturnMutation.mutate(
      { returnIds, decisionType, reason: reason || null },
      {
        onSuccess: () => {
          toast.success(REASON_TOAST_MESSAGE[action])
          finishWithCleanup()
        },
        onError: () => toast.error('반품 처리에 실패했습니다.'),
      },
    )
  }

  const submitDecideCancel = (
    decisionType: 'APPROVE' | 'REJECT',
    data: ReasonInputData,
  ) => {
    // TODO: 백엔드가 목록 응답에 cancelId를 노출하면 selection에서 수집
    // 임시: orderNumber 숫자 캐스팅을 cancelId로 사용
    const cancelIds = selectedIds
      .map((id) => Number(id))
      .filter((n) => !Number.isNaN(n))
    const reason = [data.reasonType, data.reasonDetail]
      .filter(Boolean)
      .join(' - ')

    decideCancelMutation.mutate(
      { cancelIds, decisionType, reason: reason || null },
      {
        onSuccess: () => {
          toast.success(REASON_TOAST_MESSAGE[action])
          finishWithCleanup()
        },
        onError: () => toast.error('주문 취소 처리에 실패했습니다.'),
      },
    )
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
        onSuccess: onClearSelection,
        onError: () => toast.error('주문 상태 변경에 실패했습니다.'),
      },
    )
  }

  const handleConfirm = (data: ReasonInputData) => {
    switch (action) {
      case 'requestReturn':
        return void submitCreateReturns(
          data.reasonType || null,
          data.reasonDetail || null,
        )
      case 'requestExchange':
        return void submitCreateExchanges(
          data.reasonType || null,
          data.reasonDetail || null,
        )
      case 'approveReturn':
        return submitDecideReturn('APPROVE', data)
      case 'rejectReturn':
        return submitDecideReturn('REJECT', data)
      case 'approveCancellation':
        return submitDecideCancel('APPROVE', data)
      case 'rejectCancellation':
        return submitDecideCancel('REJECT', data)
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
