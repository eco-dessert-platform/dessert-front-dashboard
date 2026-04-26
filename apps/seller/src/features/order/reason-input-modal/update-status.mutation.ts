import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateOrderStatus } from '@/entity/order/order.api'
import { orderQueries } from '@/entity/order/order.query'

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
    },
  })
}
