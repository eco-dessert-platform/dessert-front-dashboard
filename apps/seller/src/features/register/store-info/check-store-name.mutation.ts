import { useMutation } from '@tanstack/react-query'

import { checkStoreName } from '@/entity/store'

export const useCheckStoreNameMutation = () => {
  return useMutation({
    mutationFn: checkStoreName,
  })
}
