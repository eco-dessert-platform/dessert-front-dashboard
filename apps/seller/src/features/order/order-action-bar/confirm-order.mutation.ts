import { useMutation } from '@tanstack/react-query'

import { confirmOrder } from '@/entity/order/order.api'

// 다건 병렬 호출 사용처에서 onSuccess invalidate 폭주를 피하기 위해
// 무효화 책임은 호출부(useOrderActionBar)가 batch 종료 시 1회만 수행한다.
export const useConfirmOrderMutation = () =>
  useMutation({
    mutationFn: confirmOrder,
  })
