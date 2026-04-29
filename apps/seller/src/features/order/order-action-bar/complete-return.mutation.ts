import { useMutation, useQueryClient } from '@tanstack/react-query'

import { completeReturn } from '@/entity/order/order.api'
import { orderQueries } from '@/entity/order/order.query'

export const useCompleteReturnMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: completeReturn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
    },
  })
}
