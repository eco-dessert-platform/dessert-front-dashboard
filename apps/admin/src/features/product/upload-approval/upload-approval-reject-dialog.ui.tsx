import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dropdown,
  Textarea,
} from '@dessert/ui'

import { RejectCategorySchema } from '@/entity/product'
import type { RejectCategory } from '@/entity/product'

import { useDecideUploadApprovalMutation } from './upload-approval.mutation'

const REJECT_CATEGORY_LABELS: Record<RejectCategory, string> = {
  ADMIN_JUDGMENT: '관리자 판단',
  INAPPROPRIATE_BRAND_NAME: '부적절한 브랜드명',
  INVALID_PRICE_CONDITION: '유효하지 않은 가격 조건',
  INAPPROPRIATE_VEGAN_EXPRESSION: '부적절한 비건 표현',
  PROHIBITED_STORE_EXPRESSION: '금지된 스토어 표현',
  PROHIBITED_LOGO_TEXT: '금지된 로고/텍스트',
  CONTAINS_CONTACT_INFO: '연락처 정보 포함',
  CONTAINS_COMPETITOR_NAME: '경쟁사명 포함',
  DIRECT_INPUT: '직접 입력',
}

const rejectCategoryOptions = RejectCategorySchema.options.map((value) => ({
  value,
  label: REJECT_CATEGORY_LABELS[value],
}))

interface UploadApprovalRejectDialogProps {
  boardId: number | null
  onClose: () => void
}

export const UploadApprovalRejectDialog = ({
  boardId,
  onClose,
}: UploadApprovalRejectDialogProps) => {
  const [rejectCategory, setRejectCategory] = useState<RejectCategory | ''>('')
  const [rejectReason, setRejectReason] = useState('')
  const { mutate } = useDecideUploadApprovalMutation()

  const handleClose = () => {
    setRejectCategory('')
    setRejectReason('')
    onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!boardId || !rejectCategory) return

    mutate(
      {
        boardId,
        body: { decisionType: 'REJECT', rejectCategory, rejectReason },
      },
      { onSuccess: handleClose },
    )
  }

  return (
    <Dialog open={boardId !== null} onOpenChange={handleClose}>
      <DialogContent className="w-225 gap-5.5 sm:max-w-225">
        <DialogHeader className="gap-0">
          <DialogTitle
            showCloseButton
            className="typo-heading-24-m text-gray-800"
          >
            거절 사유
          </DialogTitle>
          <DialogDescription>
            스토어명 변경 거절에 대한 사유를 입력하세요
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-16">
          <Dropdown
            options={rejectCategoryOptions}
            value={rejectCategory}
            placeholder="거절 카테고리를 선택하세요"
            listClassName="max-h-none overflow-y-visible"
            onSelect={(value) => setRejectCategory(value as RejectCategory)}
          />
          <Textarea
            placeholder="사유"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            maxLength={500}
            showCount
            textareaClassName="h-72 min-h-72"
          />
          <div className="flex justify-start">
            <Button
              title="전송"
              size="md"
              type="submit"
              disabled={!rejectCategory}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
