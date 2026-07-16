import { useState } from 'react'

import { toast } from '@dessert/ui'

import { useApproveMemberApplicationsMutation } from './member-approval.mutation'

interface BusinessOwner {
  id: string
  ownerName: string
  businessNumber: string
}

interface UseMemberApprovalArgs {
  onApprovalSuccess?: () => void
}

export const useMemberApproval = ({
  onApprovalSuccess,
}: UseMemberApprovalArgs = {}) => {
  const [businessOwners, setBusinessOwners] = useState<BusinessOwner[]>([])
  const { mutate: approveApplications } = useApproveMemberApplicationsMutation()

  const updateBusinessOwner = (
    rowId: string,
    field: keyof Omit<BusinessOwner, 'id'>,
    value: string,
  ) => {
    setBusinessOwners((prev) =>
      prev.map((owner) =>
        owner.id === rowId ? { ...owner, [field]: value } : owner,
      ),
    )
  }

  const toggleBusinessOwner = (
    rowId: string,
    checked: boolean | 'indeterminate',
  ) => {
    const isChecked = checked === true
    setBusinessOwners((prev) =>
      isChecked
        ? prev.some((owner) => owner.id === rowId)
          ? prev
          : [...prev, { id: rowId, ownerName: '', businessNumber: '' }]
        : prev.filter((owner) => owner.id !== rowId),
    )
  }

  const submitApproval = async () => {
    if (businessOwners.length === 0) {
      toast.error('항목을 선택하세요', '승인할 스토어 신청을 선택해주세요')
      return
    }

    const isInvalid = businessOwners.some(
      (owner) => !owner.ownerName || !owner.businessNumber,
    )

    if (isInvalid) {
      // toast 혹은 alert 처리
      toast.error('항목을 입력하세요', '사업자 번호, 대표자명 입력하세요')
      return
    }

    approveApplications(
      businessOwners.map((owner) => ({
        applicationId: Number(owner.id),
        sellerName: owner.ownerName,
        identifier: owner.businessNumber,
      })),
      {
        onSuccess: () => {
          setBusinessOwners([])
          onApprovalSuccess?.()
        },
      },
    )
  }

  const handleDownloadFile = () => {
    //서류다운로드 기능 추가 예정
  }

  return {
    businessOwners,
    updateBusinessOwner,
    toggleBusinessOwner,
    submitApproval,
    handleDownloadFile,
  }
}
