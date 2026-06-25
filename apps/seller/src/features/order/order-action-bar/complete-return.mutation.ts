import { useMutation, useQueryClient } from '@tanstack/react-query'

import { orderQueries } from '@/entity/order'
import { completeReturn } from '@/entity/order/order.api'

export const useCompleteReturnMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: completeReturn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orderQueries.all(),
      })
    },
  })
}
