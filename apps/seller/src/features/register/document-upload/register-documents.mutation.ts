import { useMutation } from '@tanstack/react-query'

import { registerDocuments } from '@/entity/register'

export const useRegisterDocumentsMutation = () => {
  return useMutation({
    mutationFn: registerDocuments,
  })
}
