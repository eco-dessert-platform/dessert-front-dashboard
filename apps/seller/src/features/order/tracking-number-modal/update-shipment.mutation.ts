import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateShipment } from '@/entity/order/order.api'
import { orderQueries } from '@/entity/order/order.query'

export const useUpdateShipmentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
    },
  })
}
