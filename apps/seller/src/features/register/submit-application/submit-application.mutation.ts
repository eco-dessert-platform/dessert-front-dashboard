import { useMutation } from '@tanstack/react-query'

import { submitStoreApplication } from '@/entity/register'

export const useSubmitStoreApplicationMutation = () => {
  return useMutation({
    mutationFn: submitStoreApplication,
  })
}
