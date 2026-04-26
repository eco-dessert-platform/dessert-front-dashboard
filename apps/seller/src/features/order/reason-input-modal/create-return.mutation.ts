import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createReturn } from '@/entity/order/order.api'
import { orderQueries } from '@/entity/order/order.query'

export const useCreateReturnMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createReturn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
    },
  })
}
