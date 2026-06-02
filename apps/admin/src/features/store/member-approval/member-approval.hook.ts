import { useState } from 'react'

import { toast } from '@dessert/ui'

import type { ApproveSellersRequest } from '@/entity/store/member-approval'

import { useApproveSellersMutation } from './member-approval.mutation'

type ApplicantInput = {
  sellerName: string
  identifier: string
}

export const useMemberApproval = () => {
  const [inputs, setInputs] = useState<Record<number, ApplicantInput>>({})
  const { mutate, isPending } = useApproveSellersMutation()

  const updateInput = (
    applicationId: number,
    field: keyof ApplicantInput,
    value: string,
  ) => {
    setInputs((prev) => {
      const current = prev[applicationId] ?? { sellerName: '', identifier: '' }
      return {
        ...prev,
        [applicationId]: { ...current, [field]: value },
      }
    })
  }

  const submitApproval = (selectedIds: number[], onSuccess?: () => void) => {
    if (selectedIds.length === 0) {
      toast.error('선택된 항목이 없습니다.', '승인할 신청을 선택해주세요.')
      return
    }

    const body: ApproveSellersRequest = selectedIds.map((applicationId) => ({
      applicationId,
      sellerName: inputs[applicationId]?.sellerName.trim() ?? '',
      identifier: inputs[applicationId]?.identifier.trim() ?? '',
    }))

    const hasEmpty = body.some((item) => !item.sellerName || !item.identifier)
    if (hasEmpty) {
      toast.error(
        '항목을 입력하세요',
        '대표자명, 사업자등록번호를 입력해주세요.',
      )
      return
    }

    mutate(body, { onSuccess })
  }

  const handleDownloadFile = () => {
    // 서류 다운로드 API(GET /api/v1/admin/sellers/documents) 연동 예정
  }

  return {
    inputs,
    updateInput,
    submitApproval,
    isApproving: isPending,
    handleDownloadFile,
  }
}
