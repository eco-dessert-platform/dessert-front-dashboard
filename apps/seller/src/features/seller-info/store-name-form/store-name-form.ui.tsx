import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@dessert/ui'
import { useForm } from 'react-hook-form'

import { StoreNameFormValues, storeNameSchema } from '@/entity/seller-info'
import { cn } from '@/shared/libs/utils'
import { InputField } from '../../../shared/ui/input-field'

import {
  SELLER_INFO_CANCEL_DIALOG_CONTENT,
  SELLER_INFO_SUBMIT_DIALOG_CONTENT,
  SellerInfoConfirmDialog,
} from '../seller-info-confirm-dialog'

type ConfirmDialogType = 'cancel' | 'submit'

export function StoreNameForm() {
  const [confirmDialogType, setConfirmDialogType] =
    useState<ConfirmDialogType | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<StoreNameFormValues>({
    resolver: zodResolver(storeNameSchema),
    defaultValues: { storeName: '' },
    mode: 'onChange',
  })

  const hasStoreName = watch('storeName').length > 0

  const confirmDialogContent =
    confirmDialogType === null
      ? null
      : confirmDialogType === 'cancel'
        ? SELLER_INFO_CANCEL_DIALOG_CONTENT
        : SELLER_INFO_SUBMIT_DIALOG_CONTENT

  const handleCancelButtonClick = () => {
    setConfirmDialogType('cancel')
  }

  const handleDialogClose = () => {
    setConfirmDialogType(null)
  }

  const handleDialogConfirm = () => {
    if (confirmDialogType === 'cancel') {
      reset()
    }
    handleDialogClose()
  }

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      handleDialogClose()
    }
  }

  const onSubmit = () => {
    setConfirmDialogType('submit')
  }

  return (
    <section className="flex flex-col rounded-20 bg-white p-24">
      <h2 className="text-[20px] font-semibold">스토어명 변경</h2>
      <p className="mt-[3px] gap-[22px] text-[16px] font-normal text-gray-700">
        스토어명은 최초 한 번만 변경할 수 있어요.
      </p>

      <InputField
        {...register('storeName')}
        label="스토어명"
        placeholder="스토어명은 3~50자로 작성해주세요"
        required
        buttonText="중복확인"
        maxLength={50}
        onButtonClick={() => {}}
        error={!!errors.storeName}
        errorMessage={errors.storeName?.message}
        className="mt-[22px]"
      />

      <span className="mt-32 flex flex-row justify-end gap-10">
        <Button
          title="취소하기"
          size="md"
          className={cn(
            'w-[160px]',
            !hasStoreName && 'pointer-events-none invisible',
          )}
          variant="primary-outlined"
          onClick={handleCancelButtonClick}
        />
        <Button
          title="수정하기"
          size="md"
          className="w-[160px]"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        />
      </span>

      {confirmDialogContent !== null && (
        <SellerInfoConfirmDialog
          open
          title={confirmDialogContent.title}
          description={confirmDialogContent.description}
          onOpenChange={handleDialogOpenChange}
          onConfirm={handleDialogConfirm}
        />
      )}
    </section>
  )
}
