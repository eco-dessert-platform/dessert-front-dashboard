import { useMutation, useQueryClient } from '@tanstack/react-query'

import { decideCancel } from '@/entity/order/order.api'
import { orderQueries } from '@/entity/order/order.query'

export const useDecideCancelMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: decideCancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
    },
  })
}
