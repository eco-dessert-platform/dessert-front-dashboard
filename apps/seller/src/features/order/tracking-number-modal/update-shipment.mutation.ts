import { useMutation, useQueryClient } from '@tanstack/react-query'

import { orderQueries } from '@/entity/order'
import { updateShipment } from '@/entity/order/order.api'

export const useUpdateShipmentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orderQueries.all(),
      })
    },
  })
}
