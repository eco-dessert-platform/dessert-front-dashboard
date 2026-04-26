import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createExchange } from '@/entity/order/order.api'
import { orderQueries } from '@/entity/order/order.query'

export const useCreateExchangeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createExchange,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
    },
  })
}
