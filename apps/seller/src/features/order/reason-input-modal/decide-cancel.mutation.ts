import { useMutation, useQueryClient } from '@tanstack/react-query'

import { orderQueries } from '@/entity/order'
import { decideCancel } from '@/entity/order/order.api'

export const useDecideCancelMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: decideCancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
    },
  })
}
