import { toast } from '@dessert/ui'
import { useMutation } from '@tanstack/react-query'

import { registerDocuments } from '@/entity/register'
import { REGISTER_TOAST_MESSAGES } from '@/features/register'
import { extractServerMessage } from '@/shared/utils/extract-server-message'

export const useRegisterDocumentsMutation = () => {
  return useMutation({
    mutationFn: registerDocuments,
    onError: (err) => {
      const serverMessage = extractServerMessage(err)
      if (serverMessage) {
        toast.error(serverMessage)
        return
      }
      const msg = REGISTER_TOAST_MESSAGES.DOCUMENT_REGISTER_ERROR
      toast.error(msg.title, msg.description)
    },
  })
}
