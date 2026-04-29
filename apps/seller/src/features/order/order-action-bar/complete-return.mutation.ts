import { completeReturn } from '@/entity/order/order.api'
import { useOrderMutation } from '@/entity/order/use-order-mutation'

export const useCompleteReturnMutation = () => useOrderMutation(completeReturn)
