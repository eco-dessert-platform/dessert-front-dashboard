import {
  type MutationFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { orderQueries } from './order.query'

type InvalidateScope = 'all' | 'lists'

interface UseOrderMutationOptions {
  invalidate?: InvalidateScope
}

// 주문 도메인 mutation 공통 훅.
// 성공 시 지정 범위(기본 all)로 캐시를 무효화한다.
// 다건 병렬 호출처럼 호출부에서 1회만 무효화하려면 이 훅 대신 useMutation을 직접 사용한다.
export function useOrderMutation<TData, TVars>(
  mutationFn: MutationFunction<TData, TVars>,
  { invalidate = 'all' }: UseOrderMutationOptions = {},
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: () => {
      const queryKey =
        invalidate === 'lists' ? orderQueries.lists() : orderQueries.all()
      queryClient.invalidateQueries({ queryKey })
    },
  })
}
