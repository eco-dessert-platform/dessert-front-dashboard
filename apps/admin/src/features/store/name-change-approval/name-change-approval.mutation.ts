import { toast } from '@dessert/ui'
import { useQueryClient } from '@tanstack/react-query'
import { createMutation } from 'react-query-kit'

import {
  approveUpdateStoreNameRequest,
  rejectUpdateStoreNameRequest,
  storeNameChangeQueries,
} from '@/entity/store/name-change-approval'
import type {
  UpdateStoreNameApproveResult,
  UpdateStoreNameRejectRequest,
  UpdateStoreNameRejectResult,
} from '@/entity/store/name-change-approval'

interface RejectStoreNameChangeVariables {
  requestId: number
  body: UpdateStoreNameRejectRequest
}

const useApproveStoreNameChangeMutationBase = createMutation<
  UpdateStoreNameApproveResult,
  number
>({
  mutationKey: [...storeNameChangeQueries._def, 'approve-name-change'],
  mutationFn: approveUpdateStoreNameRequest,
})

const useRejectStoreNameChangeMutationBase = createMutation<
  UpdateStoreNameRejectResult,
  RejectStoreNameChangeVariables
>({
  mutationKey: [...storeNameChangeQueries._def, 'reject-name-change'],
  mutationFn: ({ requestId, body }) =>
    rejectUpdateStoreNameRequest(requestId, body),
})

export const useApproveStoreNameChangeMutation = () => {
  const queryClient = useQueryClient()

  return useApproveStoreNameChangeMutationBase({
    onSuccess: ({ updateName }) => {
      queryClient.invalidateQueries({
        queryKey: storeNameChangeQueries.nameChangeRequestList.queryKey,
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

  return useRejectStoreNameChangeMutationBase({
    onSuccess: ({ newName }) => {
      queryClient.invalidateQueries({
        queryKey: storeNameChangeQueries.nameChangeRequestList.queryKey,
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
