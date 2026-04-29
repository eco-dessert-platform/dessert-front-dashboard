import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createShipment } from '@/entity/order/order.api'
import { orderQueries } from '@/entity/order/order.query'

export const useCreateShipmentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
    },
  })
}
