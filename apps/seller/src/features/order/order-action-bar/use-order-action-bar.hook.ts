import { toast } from '@dessert/ui'

import { useCompleteExchangeMutation } from './complete-exchange.mutation'
import { useCompleteReturnMutation } from './complete-return.mutation'
import { useConfirmOrderMutation } from './confirm-order.mutation'

interface UseOrderActionBarParams {
  selectedIds: string[]
  onClearSelection: () => void
  onShowDetail: () => void
  onSelectionEmpty: () => void
  onUnhandled: (action: string) => void
}

export function useOrderActionBar({
  selectedIds,
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
    const targetOrderIds = selectedIds
      .map((orderNumber) => Number(orderNumber))
      .filter((id) => Number.isFinite(id))

    const results = await Promise.allSettled(
      targetOrderIds.map((id) =>
        confirmOrderMutation.mutateAsync({ orderId: id, orderItemIds: [id] }),
      ),
    )

    const successCount = results.filter(
      (r) => r.status === 'fulfilled' && r.value.summary.successCount > 0,
    ).length
    const failCount = results.length - successCount

    if (successCount > 0) onClearSelection()

    if (failCount === 0) {
      toast.success(`${successCount}건 발주 확인 완료`)
    } else if (successCount > 0) {
      toast.success(`${successCount}건 성공, ${failCount}건 실패`)
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
