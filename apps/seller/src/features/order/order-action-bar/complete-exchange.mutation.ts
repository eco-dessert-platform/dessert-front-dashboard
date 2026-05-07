import { useMutation, useQueryClient } from '@tanstack/react-query'

import { orderQueries } from '@/entity/order'
import { completeExchange } from '@/entity/order/order.api'

export const useCompleteExchangeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: completeExchange,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: orderQueries.all(),
      }),
  })
}
