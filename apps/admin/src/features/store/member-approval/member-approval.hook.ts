import { useRef } from 'react'

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
  const { mutateAsync: approveApplications, isPending: isApproving } =
    useApproveMemberApplicationsMutation()
  const isApprovalSubmittingRef = useRef(false)

  const submitApproval = async (payload: StoreApplicationApprove[]) => {
    if (payload.length === 0) {
      toast.error('항목을 선택하세요', '승인할 스토어 신청을 선택해주세요')
      return
    }

    if (isApprovalSubmittingRef.current) return

    isApprovalSubmittingRef.current = true

    try {
      const result = await approveApplications(payload)

      onApprovalSuccess?.(result)
    } catch {
      // 에러 토스트는 mutation onError에서 처리합니다.
    } finally {
      isApprovalSubmittingRef.current = false
    }
  }

  const handleDownloadFile = () => {
    //서류다운로드 기능 추가 예정
  }

  return {
    submitApproval,
    handleDownloadFile,
    isApproving,
  }
}
