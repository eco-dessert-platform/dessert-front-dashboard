import { useMutation } from '@tanstack/react-query'

import { checkStoreName } from '@/entity/register'

export const useCheckStoreNameMutation = () => {
  return useMutation({
    mutationFn: checkStoreName,
  })
}
