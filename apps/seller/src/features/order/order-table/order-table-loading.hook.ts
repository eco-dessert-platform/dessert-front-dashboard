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

  useEffect(() => {
    if (!isMutationPending) setMutationLoadingDismissed(false)
  }, [isMutationPending])

  const loadingMode: OrderTableLoadingMode | undefined = isListLoading
    ? 'list'
    : isMutationPending && !mutationLoadingDismissed
      ? 'mutation'
      : undefined

  const dismissMutationLoading = () => setMutationLoadingDismissed(true)

  return { loadingMode, dismissMutationLoading }
}
