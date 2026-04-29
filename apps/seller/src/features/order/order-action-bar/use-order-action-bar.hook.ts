import { toast } from '@dessert/ui'

import type { OrderItem } from '@/entity/order/order.type'

import { useCompleteExchangeMutation } from './complete-exchange.mutation'
import { useCompleteReturnMutation } from './complete-return.mutation'
import { useConfirmOrderMutation } from './confirm-order.mutation'

interface UseOrderActionBarParams {
  selectedIds: string[]
  selectedOrders: OrderItem[]
  onClearSelection: () => void
  onShowDetail: () => void
  onSelectionEmpty: () => void
  onUnhandled: (action: string) => void
}

export function useOrderActionBar({
  selectedIds,
  selectedOrders,
  onClearSelection,
  onShowDetail,
  onSelectionEmpty,
  onUnhandled,
}: UseOrderActionBarParams) {
  const confirmOrderMutation = useConfirmOrderMutation()
  const completeReturnMutation = useCompleteReturnMutation()
  const completeExchangeMutation = useCompleteExchangeMutation()

  const isPending =
    confirmOrderMutation.isPending ||
    completeReturnMutation.isPending ||
    completeExchangeMutation.isPending

  const submitConfirmOrders = async () => {
    const results = await Promise.allSettled(
      selectedOrders.map((order) =>
        confirmOrderMutation.mutateAsync({
          orderId: order.orderId,
          orderItemIds: order.products.map((p) => p.orderItemId),
        }),
      ),
    )

    let successItemCount = 0
    const failedItemIds: number[] = []
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') {
        successItemCount += r.value.summary.successCount
        failedItemIds.push(...r.value.failedOrderItemIds)
      } else {
        failedItemIds.push(
          ...selectedOrders[i].products.map((p) => p.orderItemId),
        )
      }
    })
    const failItemCount = failedItemIds.length

    if (failItemCount === 0) {
      onClearSelection()
      toast.success(`${successItemCount}건 발주 확인 완료`)
    } else if (successItemCount > 0) {
      toast.success(`${successItemCount}건 성공, ${failItemCount}건 실패`)
    } else {
      toast.error('발주 확인에 실패했습니다.')
    }
  }

  const bulkCompleteActions: Record<
    string,
    {
      mutation: typeof completeReturnMutation
      successMessage: string
      errorMessage: string
    }
  > = {
    completeReturn: {
      mutation: completeReturnMutation,
      successMessage: '반품이 완료 처리되었습니다.',
      errorMessage: '반품 완료 처리에 실패했습니다.',
    },
    completeExchange: {
      mutation: completeExchangeMutation,
      successMessage: '교환이 완료 처리되었습니다.',
      errorMessage: '교환 완료 처리에 실패했습니다.',
    },
  }

  const handleAction = (action: string) => {
    if (selectedIds.length === 0) {
      onSelectionEmpty()
      return
    }

    if (action === 'detailView') {
      onShowDetail()
      return
    }

    if (action === 'confirmOrder') {
      if (confirmOrderMutation.isPending) return
      void submitConfirmOrders()
      return
    }

    const meta = bulkCompleteActions[action]
    if (meta) {
      if (meta.mutation.isPending) return
      meta.mutation.mutate(
        { orderNumbers: selectedIds },
        {
          onSuccess: () => {
            toast.success(meta.successMessage)
            onClearSelection()
          },
          onError: () => toast.error(meta.errorMessage),
        },
      )
      return
    }

    onUnhandled(action)
  }

  return {
    handleAction,
    isPending,
  }
}
