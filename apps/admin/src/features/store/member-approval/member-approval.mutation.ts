import { toast } from '@dessert/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  ApproveSellersRequest,
  approveSellers,
  memberApprovalQueries,
} from '@/entity/store/member-approval'

export const useApproveSellersMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: ApproveSellersRequest) => approveSellers(body),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: memberApprovalQueries.lists(),
      })

      const successCount = result.successDetails.length
      const failCount = result.failDetails.length

      if (successCount > 0 && failCount === 0) {
        toast.success(`${successCount}건의 셀러를 승인했습니다.`)
        return
      }

      if (successCount > 0 && failCount > 0) {
        toast.success(
          `${successCount}건 승인, ${failCount}건 실패`,
          result.failDetails.map((item) => item.reason).join('\n'),
        )
        return
      }

      toast.error(
        '승인에 실패했습니다.',
        result.failDetails[0]?.reason ?? '다시 시도해주세요.',
      )
    },
    onError: () => {
      toast.error('승인에 실패했습니다.', '다시 시도해주세요.')
    },
  })
}
