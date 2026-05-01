import { useMutation, useQueryClient } from '@tanstack/react-query'

import { orderQueries } from '@/entity/order'
import { decideReturn } from '@/entity/order/order.api'

export const useDecideReturnMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: decideReturn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
    },
  })
}
