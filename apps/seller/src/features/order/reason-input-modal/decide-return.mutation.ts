import { useMutation, useQueryClient } from '@tanstack/react-query'

import { decideReturn } from '@/entity/order/order.api'
import { orderQueries } from '@/entity/order/order.query'

export const useDecideReturnMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: decideReturn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
    },
  })
}
