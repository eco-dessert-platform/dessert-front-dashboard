import { useMutation } from '@tanstack/react-query'

import { updateShipment } from '@/entity/order/order.api'

export const useUpdateShipmentMutation = () => {
  return useMutation({
    mutationFn: updateShipment,
  })
}
