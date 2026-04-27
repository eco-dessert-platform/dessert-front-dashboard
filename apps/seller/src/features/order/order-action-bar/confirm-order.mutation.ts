import { useMutation, useQueryClient } from '@tanstack/react-query'

import { confirmOrder } from '@/entity/order/order.api'
import { orderQueries } from '@/entity/order/order.query'

export const useConfirmOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: confirmOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
    },
  })
}
