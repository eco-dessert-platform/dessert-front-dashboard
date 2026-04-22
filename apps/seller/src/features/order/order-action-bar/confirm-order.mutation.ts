import { useMutation } from '@tanstack/react-query'

import { confirmOrder } from '@/entity/order/order.api'

export const useConfirmOrderMutation = () => {
  return useMutation({
    mutationFn: confirmOrder,
  })
}
