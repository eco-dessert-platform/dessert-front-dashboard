import { useRef } from 'react'

import { toast } from '@dessert/ui'

import {
  AdminSellerApplicationApproveListResult,
  StoreApplicationApprove,
} from '@/entity/store/member-approval'

import {
  useApproveMemberApplicationsMutation,
  useDownloadMemberApplicationDocumentsMutation,
} from './member-approval.mutation'

interface UseMemberApprovalArgs {
  onApprovalSuccess?: (result: AdminSellerApplicationApproveListResult) => void
}

export const useMemberApproval = ({
  onApprovalSuccess,
}: UseMemberApprovalArgs = {}) => {
  const { mutateAsync: approveApplications, isPending: isApproving } =
    useApproveMemberApplicationsMutation()
  const { mutate: downloadDocuments, isPending: isDownloadingDocuments } =
    useDownloadMemberApplicationDocumentsMutation()
  const isApprovalSubmittingRef = useRef(false)
  const isDocumentDownloadSubmittingRef = useRef(false)

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

  const handleDownloadFile = (sellerIds: number[]) => {
    if (sellerIds.length === 0) {
      toast.error('항목을 선택하세요', '다운로드할 셀러를 선택해주세요')
      return
    }

    if (sellerIds.length > 50) {
      toast.error('최대 50개까지 다운로드할 수 있습니다.')
      return
    }

    if (isDocumentDownloadSubmittingRef.current) return

    isDocumentDownloadSubmittingRef.current = true

    downloadDocuments(
      { sellerIds },
      {
        onSettled: () => {
          isDocumentDownloadSubmittingRef.current = false
        },
      },
    )
  }

  return {
    submitApproval,
    handleDownloadFile,
    isApproving,
    isDownloadingDocuments,
  }
}
