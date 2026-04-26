import { useMutation, useQueryClient } from '@tanstack/react-query'

import { completeExchange } from '@/entity/order/order.api'
import { orderQueries } from '@/entity/order/order.query'

export const useCompleteExchangeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: completeExchange,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
    },
  })
}
