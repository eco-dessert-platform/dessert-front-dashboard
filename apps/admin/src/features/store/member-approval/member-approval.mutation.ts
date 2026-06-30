import { toast } from '@dessert/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  ApproveSellersRequest,
  RejectSellersRequest,
  approveSellers,
  memberApprovalQueries,
  rejectSellers,
} from '@/entity/store/member-approval'

export const useApproveSellersMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: ApproveSellersRequest) => approveSellers(body),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: memberApprovalQueries.all() })

      const successCount = result.successDetails.length
      const failCount = result.failDetails.length

      if (failCount === 0) {
        toast.success(`${successCount}건을 승인했습니다.`)
        return
      }

      toast.error(
        `${successCount}건 승인, ${failCount}건 실패`,
        result.failDetails[0]?.reason,
      )
    },
    onError: () => {
      toast.error('승인에 실패했습니다.', '다시 시도해주세요.')
    },
  })
}

export const useRejectSellersMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: RejectSellersRequest) => rejectSellers(body),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: memberApprovalQueries.all() })

      const successCount = result.successIds.length
      const failCount = result.failDetails.length

      if (failCount === 0) {
        toast.success(`${successCount}건을 거절했습니다.`)
        return
      }

      toast.error(
        `${successCount}건 거절, ${failCount}건 실패`,
        result.failDetails[0]?.reason,
      )
    },
    onError: () => {
      toast.error('거절에 실패했습니다.', '다시 시도해주세요.')
    },
  })
}
