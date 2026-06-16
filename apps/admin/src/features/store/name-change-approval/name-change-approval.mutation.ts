import { toast } from '@dessert/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  approveUpdateStoreName,
  nameChangeApprovalQueries,
  rejectUpdateStoreName,
} from '@/entity/store/name-change-approval'

export const useApproveUpdateStoreNameMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestId: number) => approveUpdateStoreName(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: nameChangeApprovalQueries.all(),
      })
      toast.success('스토어명 변경 요청을 승인했습니다.')
    },
    onError: () => {
      toast.error('승인에 실패했습니다.', '다시 시도해주세요.')
    },
  })
}

export const useRejectUpdateStoreNameMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestId: number) => rejectUpdateStoreName(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: nameChangeApprovalQueries.all(),
      })
      toast.success('스토어명 변경 요청을 거절했습니다.')
    },
    onError: () => {
      toast.error('거절에 실패했습니다.', '다시 시도해주세요.')
    },
  })
}
