import { useMutation } from '@tanstack/react-query'

import { createReturn } from '@/entity/order/order.api'

export const useCreateReturnMutation = () => {
  return useMutation({
    mutationFn: createReturn,
  })
}
