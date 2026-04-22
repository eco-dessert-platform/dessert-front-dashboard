import { useMutation } from '@tanstack/react-query'

import { decideReturn } from '@/entity/order/order.api'

export const useDecideReturnMutation = () => {
  return useMutation({
    mutationFn: decideReturn,
  })
}
