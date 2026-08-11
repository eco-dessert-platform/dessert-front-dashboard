import { useCallback, useState } from 'react'

import { toast } from '@dessert/ui'

import { useApproveSellersMutation } from './member-approval.mutation'

interface BusinessOwner {
  id: string
  ownerName: string
  businessNumber: string
}

export const useMemberApproval = () => {
  const [businessOwners, setBusinessOwners] = useState<BusinessOwner[]>([])
  const { mutate: approveSellers, isPending } = useApproveSellersMutation()

  const updateBusinessOwner = useCallback(
    (
      rowId: string,
      field: keyof Omit<BusinessOwner, 'id'>,
      value: string,
    ) => {
      setBusinessOwners((prev) =>
        prev.map((owner) =>
          owner.id === rowId ? { ...owner, [field]: value } : owner,
        ),
      )
    },
    [],
  )

  const toggleBusinessOwner = useCallback(
    (rowId: string, checked: boolean | 'indeterminate') => {
      const isChecked = checked === true
      setBusinessOwners((prev) =>
        isChecked
          ? prev.some((owner) => owner.id === rowId)
            ? prev
            : [...prev, { id: rowId, ownerName: '', businessNumber: '' }]
          : prev.filter((owner) => owner.id !== rowId),
      )
    },
    [],
  )

  const clearBusinessOwners = useCallback(() => setBusinessOwners([]), [])

  const submitApproval = useCallback(
    (onApproved?: () => void) => {
      if (businessOwners.length === 0) {
        toast.error('승인할 셀러를 선택하세요')
        return
      }

      const isInvalid = businessOwners.some(
        (owner) => !owner.ownerName.trim() || !owner.businessNumber.trim(),
      )

      if (isInvalid) {
        toast.error('항목을 입력하세요', '사업자 번호, 대표자명 입력하세요')
        return
      }

      approveSellers(
        businessOwners.map((owner) => ({
          applicationId: Number(owner.id),
          sellerName: owner.ownerName.trim(),
          identifier: owner.businessNumber.trim(),
        })),
        {
          onSuccess: (result) => {
            if (result.successDetails.length > 0) {
              clearBusinessOwners()
              onApproved?.()
            }
          },
        },
      )
    },
    [approveSellers, businessOwners, clearBusinessOwners],
  )

  const handleDownloadFile = useCallback(() => {
    toast.error('서류 다운로드는 아직 지원하지 않습니다.')
  }, [])

  return {
    businessOwners,
    updateBusinessOwner,
    toggleBusinessOwner,
    clearBusinessOwners,
    submitApproval,
    handleDownloadFile,
    isApproving: isPending,
  }
}
