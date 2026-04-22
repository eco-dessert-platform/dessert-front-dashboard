import { useMutation } from '@tanstack/react-query'

import { createShipment } from '@/entity/order/order.api'

export const useCreateShipmentMutation = () => {
  return useMutation({
    mutationFn: createShipment,
  })
}
