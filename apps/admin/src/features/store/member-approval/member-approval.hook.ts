import { toast } from '@dessert/ui'

import {
  AdminSellerApplicationApproveListResult,
  StoreApplicationApprove,
} from '@/entity/store/member-approval'

import { useApproveMemberApplicationsMutation } from './member-approval.mutation'

interface UseMemberApprovalArgs {
  onApprovalSuccess?: (result: AdminSellerApplicationApproveListResult) => void
}

export const useMemberApproval = ({
  onApprovalSuccess,
}: UseMemberApprovalArgs = {}) => {
  const { mutate: approveApplications } = useApproveMemberApplicationsMutation()

  const submitApproval = async (payload: StoreApplicationApprove[]) => {
    if (payload.length === 0) {
      toast.error('항목을 선택하세요', '승인할 스토어 신청을 선택해주세요')
      return
    }

    approveApplications(payload, {
      onSuccess: (result) => {
        onApprovalSuccess?.(result)
      },
    })
  }

  const handleDownloadFile = () => {
    //서류다운로드 기능 추가 예정
  }

  return {
    submitApproval,
    handleDownloadFile,
  }
}
