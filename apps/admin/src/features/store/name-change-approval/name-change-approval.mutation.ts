import { toast } from '@dessert/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  approveUpdateStoreNameRequest,
  rejectUpdateStoreNameRequest,
  storeNameChangeQueries,
} from '@/entity/store/name-change-approval'
import type { UpdateStoreNameRejectRequest } from '@/entity/store/name-change-approval'

export const useApproveStoreNameChangeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: approveUpdateStoreNameRequest,
    onSuccess: ({ updateName }) => {
      queryClient.invalidateQueries({
        queryKey: storeNameChangeQueries.nameChangeRequests(),
      })
      toast.success('스토어명 변경 요청을 승인했습니다.', updateName)
    },
    onError: () => {
      toast.error(
        '스토어명 변경 요청 승인에 실패했습니다.',
        '다시 시도해주세요.',
      )
    },
  })
}

export const useRejectStoreNameChangeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      requestId,
      body,
    }: {
      requestId: number
      body: UpdateStoreNameRejectRequest
    }) => rejectUpdateStoreNameRequest(requestId, body),
    onSuccess: ({ newName }) => {
      queryClient.invalidateQueries({
        queryKey: storeNameChangeQueries.nameChangeRequests(),
      })
      toast.success('스토어명 변경 요청을 거절했습니다.', newName)
    },
    onError: () => {
      toast.error(
        '스토어명 변경 요청 거절에 실패했습니다.',
        '다시 시도해주세요.',
      )
    },
  })
}
