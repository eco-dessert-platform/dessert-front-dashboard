import {
  type MutationFunction,
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { orderQueries } from './order.query'

type OrderMutationOptions<TData, TVars> = Omit<
  UseMutationOptions<TData, Error, TVars>,
  'mutationFn'
>

// 주문 도메인 mutation 공통 훅.
// 성공 시 orderQueries.all()을 무효화한 뒤 호출부 onSuccess를 이어서 실행한다.
// 다건 병렬 호출처럼 호출부에서 invalidate를 1회만 수행하려면 이 훅 대신 useMutation을 직접 사용한다.
export function useOrderMutation<TData, TVars>(
  mutationFn: MutationFunction<TData, TVars>,
  options: OrderMutationOptions<TData, TVars> = {},
) {
  const queryClient = useQueryClient()
  const { onSuccess, ...rest } = options

  return useMutation<TData, Error, TVars>({
    mutationFn,
    ...rest,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all() })
      return onSuccess?.(...args)
    },
  })
}
