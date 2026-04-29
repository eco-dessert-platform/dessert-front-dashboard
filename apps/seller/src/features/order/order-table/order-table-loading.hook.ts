import { useEffect, useState } from 'react'

export type OrderTableLoadingMode = 'list' | 'mutation'

interface UseOrderTableLoadingParams {
  isListLoading: boolean
  isMutationPending: boolean
}

export function useOrderTableLoading({
  isListLoading,
  isMutationPending,
}: UseOrderTableLoadingParams) {
  const [mutationLoadingDismissed, setMutationLoadingDismissed] = useState(false)

  // pending 전환(시작/종료) 시점마다 dismiss를 풀어,
  // 새 mutation이 시작되면 항상 오버레이가 다시 노출되도록 한다.
  useEffect(() => {
    setMutationLoadingDismissed(false)
  }, [isMutationPending])

  const loadingMode: OrderTableLoadingMode | undefined = isListLoading
    ? 'list'
    : isMutationPending && !mutationLoadingDismissed
      ? 'mutation'
      : undefined

  const dismissMutationLoading = () => setMutationLoadingDismissed(true)
  const resetMutationLoading = () => setMutationLoadingDismissed(false)

  return { loadingMode, dismissMutationLoading, resetMutationLoading }
}
