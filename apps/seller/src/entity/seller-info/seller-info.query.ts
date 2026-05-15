import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { getAccountVerification, updateSellerAccount } from './seller-info.api'

export const sellerInfoQueries = {
  all: () => ['sellerInfo'],
  accountVerification: () =>
    queryOptions({
      queryKey: [...sellerInfoQueries.all(), 'accountVerification'],
      queryFn: getAccountVerification,
      staleTime: 0,
    }),
}

export function useUpdateSellerAccountMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateSellerAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sellerInfoQueries.accountVerification().queryKey,
      })
    },
  })
}
