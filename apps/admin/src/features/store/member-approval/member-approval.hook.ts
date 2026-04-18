import { useState } from 'react'

import { toast } from '@dessert/ui'

interface BusinessOwner {
  id: string
  ownerName: string
  businessNumber: string
}

export const useMemberApproval = () => {
  const [businessOwners, setBusinessOwners] = useState<BusinessOwner[]>([])

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
    const isInvalid = businessOwners.some(
      (owner) => !owner.ownerName || !owner.businessNumber,
    )

    if (isInvalid) {
      // toast 혹은 alert 처리
      toast.error('항목을 입력하세요', '사업자 번호, 대표자명 입력하세요')
      return
    }

    // API 호출로직 추가 예정
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
