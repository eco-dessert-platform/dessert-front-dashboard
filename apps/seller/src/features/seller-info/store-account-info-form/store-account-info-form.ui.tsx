import { useEffect, useRef, useState } from 'react'

import { Button, Input, Label, Select } from '@dessert/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'

import {
  BANK_CODES,
  type StoreAccountInfoFormValues,
  sellerInfoQueries,
  storeAccountInfoSchema,
  useUpdateSellerAccountMutation,
} from '@/entity/seller-info'

import {
  SELLER_INFO_CANCEL_DIALOG_CONTENT,
  SELLER_INFO_SUBMIT_DIALOG_CONTENT,
  SellerInfoConfirmDialog,
} from '../seller-info-confirm-dialog'
import { sellerInfoToast } from '../seller-info-toast'

const BANK_OPTIONS = BANK_CODES.map((b) => ({ label: b.label, value: b.code }))

const EMPTY_DEFAULTS: StoreAccountInfoFormValues = {
  bankCode: '',
  accountNumber: '',
}

export function StoreAccountInfoForm() {
  const [isEditable, setIsEditable] = useState(false)
  const [dialogType, setDialogType] = useState<'cancel' | 'submit' | null>(null)

  const lastDialogTypeRef = useRef<'cancel' | 'submit'>('cancel')

  const { data: verification } = useQuery(
    sellerInfoQueries.accountVerification(),
  )

  const { mutate, isPending } = useUpdateSellerAccountMutation()

  const initialValues: StoreAccountInfoFormValues = verification
    ? {
        bankCode: verification.bankCode,
        accountNumber: verification.accountNumber,
      }
    : EMPTY_DEFAULTS

  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<StoreAccountInfoFormValues>({
    resolver: zodResolver(storeAccountInfoSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  })

  // 인증 정보 응답이 마운트 이후 도착하면 폼에 prefill — 편집 중에는 건드리지 않음.
  useEffect(() => {
    if (!verification || isEditable) return
    reset({
      bankCode: verification.bankCode,
      accountNumber: verification.accountNumber,
    })
  }, [verification, isEditable, reset])

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
      reset(initialValues)
      setIsEditable(false)
      handleDialogClose()
      return
    }

    const values = getValues()
    mutate(
      { bankCode: values.bankCode, accountNumber: values.accountNumber },
      {
        onSuccess: () => {
          sellerInfoToast.accountInfoChangeSuccess()
          setIsEditable(false)
          handleDialogClose()
        },
        onError: (err) => {
          const status = isAxiosError(err) ? err.response?.status : undefined
          if (status === 400) {
            sellerInfoToast.accountInfoChangeValidationError()
          } else {
            sellerInfoToast.accountInfoVerificationError()
          }
          handleDialogClose()
        },
      },
    )
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
            <Controller
              name="bankCode"
              control={control}
              render={({ field }) => (
                <Select
                  label="은행명"
                  placeholder="은행을 선택해주세요"
                  options={BANK_OPTIONS}
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                  disabled={!isEditable}
                  error={!!errors.bankCode}
                  errorMessage={errors.bankCode?.message}
                />
              )}
            />
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <Input
              label="예금주"
              placeholder="계좌 인증 후 자동으로 표시돼요"
              value={verification?.accountHolder ?? ''}
              disabled
              readOnly
            />
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
            disabled={!isEditable || !isValid || isPending}
            onClick={handleSubmit(() => setDialogType('submit'))}
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
