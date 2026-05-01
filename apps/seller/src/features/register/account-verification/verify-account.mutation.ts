import { useMutation } from '@tanstack/react-query'

import { verifyAccount } from '@/entity/register'

export const useVerifyAccountMutation = () => {
  return useMutation({
    mutationFn: verifyAccount,
  })
}
