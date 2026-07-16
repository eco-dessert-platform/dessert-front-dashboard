import { toast } from '@dessert/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  StoreApplicationApprove,
  approveAdminSellerApplications,
  memberApprovalQueries,
} from '@/entity/store/member-approval'

export const useApproveMemberApplicationsMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: StoreApplicationApprove[]) =>
      approveAdminSellerApplications(body),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: memberApprovalQueries.sellerApplications(),
      })

      const successCount = result.successDetails.length
      const failCount = result.failDetails.length

      if (failCount > 0) {
        toast.error(
          '일부 회원가입 승인이 실패했습니다.',
          `성공 ${successCount}건, 실패 ${failCount}건`,
        )
        return
      }

      toast.success(`${successCount}건의 회원가입을 승인했습니다.`)
    },
    onError: () => {
      toast.error('회원가입 승인에 실패했습니다.', '다시 시도해주세요.')
    },
  })
}
