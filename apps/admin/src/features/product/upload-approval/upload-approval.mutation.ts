import { toast } from '@dessert/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  DecideUploadApproval,
  decideUploadApproval,
  productQueries,
} from '@/entity/product/upload-approval'

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
    onSuccess: (_, { body }) => {
      queryClient.invalidateQueries({
        queryKey: productQueries.uploadApprovals(),
      })

      const message =
        body.decisionType === 'APPROVE'
          ? '업로드 상품을 승인했습니다.'
          : '업로드 상품을 거절했습니다.'
      toast.success(message)
    },
    onError: (_, { body }) => {
      const action = body.decisionType === 'APPROVE' ? '승인' : '거절'
      toast.error(`업로드 상품 ${action}에 실패했습니다.`, '다시 시도해주세요.')
    },
  })
}
