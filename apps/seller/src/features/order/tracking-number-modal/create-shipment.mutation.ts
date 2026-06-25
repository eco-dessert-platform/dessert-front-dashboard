import { useMutation, useQueryClient } from '@tanstack/react-query'

import { orderQueries } from '@/entity/order'
import { createShipment } from '@/entity/order/order.api'

export const useCreateShipmentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createShipment,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: orderQueries.all(),
      }),
  })
}
