import { useMutation } from '@tanstack/react-query'

import { createExchange } from '@/entity/order/order.api'

export const useCreateExchangeMutation = () => {
  return useMutation({
    mutationFn: createExchange,
  })
}
