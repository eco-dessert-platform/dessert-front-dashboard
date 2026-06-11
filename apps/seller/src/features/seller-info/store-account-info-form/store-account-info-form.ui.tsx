import { useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Label } from '@dessert/ui'
import { useForm } from 'react-hook-form'

import {
  StoreAccountInfoFormValues,
  storeAccountInfoSchema,
} from '@/entity/seller-info'

import {
  SELLER_INFO_CANCEL_DIALOG_CONTENT,
  SELLER_INFO_SUBMIT_DIALOG_CONTENT,
  SellerInfoConfirmDialog,
} from '../seller-info-confirm-dialog'

export function StoreAccountInfoForm() {
  const [isEditable, setIsEditable] = useState(false)
  const [dialogType, setDialogType] = useState<'cancel' | 'submit' | null>(null)

  const lastDialogTypeRef = useRef<'cancel' | 'submit'>('cancel')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<StoreAccountInfoFormValues>({
    resolver: zodResolver(storeAccountInfoSchema),
    defaultValues: { bankCode: '', accountHolder: '', accountNumber: '' },
    mode: 'onChange',
  })

  const currentDialogType = dialogType ?? lastDialogTypeRef.current

  const dialogCopy =
    currentDialogType === 'cancel'
      ? SELLER_INFO_CANCEL_DIALOG_CONTENT
      : SELLER_INFO_SUBMIT_DIALOG_CONTENT

  if (dialogType !== null) {
    lastDialogTypeRef.current = dialogType
  }

  const handleDialogClose = () => {
    setDialogType(null)
  }

  const handleDialogConfirm = () => {
    if (dialogType === 'cancel') {
      reset()
      setIsEditable(false)
    }
    handleDialogClose()
  }

  const onSubmit = () => {
    setDialogType('submit')
  }

  return (
    <section className="w-full overflow-hidden rounded-20 bg-white p-24">
      <h2 className="text-[20px] font-semibold text-gray-900">
        계좌 정보 변경
      </h2>
      <p className="mt-8 text-[16px] font-normal text-gray-500">
        예금주는 대표자명 혹은 사업자명과 일치하는 계좌번호만 인증이 가능해요
      </p>

      <div className="mt-32 flex flex-col gap-24">
        <div className="flex w-full flex-col gap-16 xl:flex-row">
          <div className="flex flex-1 flex-col gap-6">
            <Input
              {...register('bankCode')}
              label="은행명"
              placeholder="신한은행"
              disabled={!isEditable}
            />
            {errors.bankCode && (
              <span className="typo-body-12-r text-error-500">
                {errors.bankCode.message}
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <Input
              {...register('accountHolder')}
              label="예금주"
              placeholder="이빵글"
              disabled={!isEditable}
            />
            {errors.accountHolder && (
              <span className="typo-body-12-r text-error-500">
                {errors.accountHolder.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Label label="계좌번호" />
          <div className="flex w-full flex-col gap-16 md:items-end xl:flex-row">
            <div className="flex flex-1 flex-col gap-6">
              <Input
                {...register('accountNumber')}
                placeholder="111-2222-3333-44"
                disabled={!isEditable}
              />
              {errors.accountNumber && (
                <span className="typo-body-12-r text-error-500">
                  {errors.accountNumber.message}
                </span>
              )}
            </div>
            <Button
              title={isEditable ? '취소하기' : '변경하기'}
              className="shrink-0"
              onClick={() => {
                if (isEditable) {
                  setDialogType('cancel')
                  return
                }
                setIsEditable(true)
              }}
            />
          </div>
        </div>

        <div className="flex w-full justify-end">
          <Button
            title="수정하기"
            className="min-w-[160px]"
            disabled={!isEditable || !isValid}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>

      <SellerInfoConfirmDialog
        open={dialogType !== null}
        title={dialogCopy.title}
        description={dialogCopy.description}
        onOpenChange={(open) => {
          if (!open) handleDialogClose()
        }}
        onConfirm={handleDialogConfirm}
      />
    </section>
  )
}
