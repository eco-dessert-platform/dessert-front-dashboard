import { useMutation } from '@tanstack/react-query'

import { decideCancel } from '@/entity/order/order.api'

export const useDecideCancelMutation = () => {
  return useMutation({
    mutationFn: decideCancel,
  })
}
