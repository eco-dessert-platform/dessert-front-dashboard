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
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { RejectBodySchema, RejectCategorySchema } from '@/entity/product'
import type { RejectCategory } from '@/entity/product'

import { useDecideUploadApprovalMutation } from './upload-approval.mutation'

import type { z } from 'zod'

const REJECT_CATEGORY_LABELS: Record<RejectCategory, string> = {
  ADMIN_JUDGMENT: '관리자 판단 부적합',
  INAPPROPRIATE_BRAND_NAME: '브랜드명 무단사용',
  OFFICIAL_MATERIAL_CONFUSION: '공식물 오인 가능',
  INAPPROPRIATE_EXPRESSION: '비속어/부적절한 표현',
  PROHIBITED_STORE_EXPRESSION: '상품명/카테고리명 포함',
  CONTAINS_ADVERTISING: '광고성 문구 포함',
  CONTAINS_CONTACT_INFO: '연락처/URL 포함',
  CONTAINS_COMPETITOR_NAME: '타 판매자명 유사',
  DIRECT_INPUT: '직접입력',
}

const rejectCategoryOptions = RejectCategorySchema.options.map((value) => ({
  value,
  label: REJECT_CATEGORY_LABELS[value],
}))

type RejectFormValues = z.infer<typeof RejectBodySchema>

interface UploadApprovalRejectDialogProps {
  boardId: number | null
  onClose: () => void
}

export const UploadApprovalRejectDialog = ({
  boardId,
  onClose,
}: UploadApprovalRejectDialogProps) => {
  const { mutate, isPending } = useDecideUploadApprovalMutation()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RejectFormValues>({
    resolver: zodResolver(RejectBodySchema),
    defaultValues: { rejectReason: '' },
    reValidateMode: 'onSubmit',
  })

  const handleClose = () => {
    if (isPending) return
    reset()
    onClose()
  }

  const onSubmit = (data: RejectFormValues) => {
    if (!boardId) return
    mutate(
      { boardId, body: { decisionType: 'REJECT', ...data } },
      { onSuccess: handleClose },
    )
  }

  return (
    <Dialog
      open={boardId !== null}
      onOpenChange={(open) => {
        if (!open) handleClose()
      }}
    >
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-16"
        >
          <div className="flex flex-col gap-2">
            <Controller
              name="rejectCategory"
              control={control}
              render={({ field }) => (
                <Dropdown
                  options={rejectCategoryOptions}
                  value={field.value ?? ''}
                  placeholder="거절 카테고리를 선택하세요"
                  listClassName="max-h-none overflow-y-visible"
                  onSelect={(value) => field.onChange(value as RejectCategory)}
                />
              )}
            />
            <p className="min-h-5 text-sm text-red-500">
              {errors.rejectCategory?.message}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Textarea
              {...register('rejectReason')}
              placeholder="사유"
              maxLength={500}
              showCount
              textareaClassName="h-72 min-h-72"
            />
            <p className="min-h-5 text-sm text-red-500">
              {errors.rejectReason?.message}
            </p>
          </div>
          <div className="flex justify-start">
            <Button title="전송" size="md" type="submit" disabled={isPending} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
