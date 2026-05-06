import { useMutation, useQueryClient } from '@tanstack/react-query'

import { orderQueries } from '@/entity/order'
import { updateOrderStatus } from '@/entity/order/order.api'

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orderQueries.all(),
      })
    }
  })
}
