import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  DecideUploadApproval,
  decideUploadApproval,
  productQueries,
} from '@/entity/product'

export const useDecideUploadApprovalMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      boardId,
      body,
    }: {
      boardId: number
      body: DecideUploadApproval
    }) => decideUploadApproval(boardId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productQueries.uploadApprovals(),
      })
    },
    onError: () => {},
  })
}
