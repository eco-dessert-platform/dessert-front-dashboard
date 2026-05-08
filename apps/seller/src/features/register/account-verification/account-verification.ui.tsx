import { useEffect } from 'react'

import { Select, toast } from '@dessert/ui'
import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Controller, useFormContext } from 'react-hook-form'

import {
  type RegisterForm,
  registerQueries,
} from '@/entity/register'
import {
  REGISTER_TOAST_MESSAGES,
  useVerifyAccountMutation,
} from '@/features/register'
import { FileUploadInput } from '@/widgets/file-upload-input'
import { InputField } from '@/widgets/input-field'

import { handleRegisterFileUpload } from '../lib'


// 토스페이먼츠 기관코드 기준 (https://docs.tosspayments.com/codes/org-codes)
const BANK_OPTIONS = [
  { label: '경남은행', value: '39' },
  { label: '광주은행', value: '34' },
  { label: '단위농협(지역농축협)', value: '12' },
  { label: '부산은행', value: '32' },
  { label: '새마을금고', value: '45' },
  { label: '산림조합', value: '64' },
  { label: '신한은행', value: '88' },
  { label: '신협', value: '48' },
  { label: '씨티은행', value: '27' },
  { label: '우리은행', value: '20' },
  { label: '우체국예금보험', value: '71' },
  { label: '저축은행중앙회', value: '50' },
  { label: '전북은행', value: '37' },
  { label: '제주은행', value: '35' },
  { label: '카카오뱅크', value: '90' },
  { label: '케이뱅크', value: '89' },
  { label: '토스뱅크', value: '92' },
  { label: '하나은행', value: '81' },
  { label: '홍콩상하이은행', value: '54' },
  { label: 'IBK기업은행', value: '03' },
  { label: 'KB국민은행', value: '06' },
  { label: 'iM뱅크(대구)', value: '31' },
  { label: '한국산업은행', value: '02' },
  { label: 'NH농협은행', value: '11' },
  { label: 'SC제일은행', value: '23' },
  { label: 'Sh수협은행', value: '07' },
  { label: '수협중앙회', value: '30' },
]

export function AccountVerification() {
  const { control, getValues, setValue } = useFormContext<RegisterForm>()
  const { mutate: verify, isPending } = useVerifyAccountMutation()
  const { data: existing } = useQuery(registerQueries.accountVerification())
  const isVerified = !!existing?.verified

  useEffect(() => {
    if (!existing?.verified) return
    setValue('bank', existing.bankCode)
    setValue('accountNumber', existing.accountNumber)
    setValue('accountVerificationId', existing.id, { shouldValidate: true })
  }, [existing, setValue])

  const handleVerifyAccount = () => {
    const { bankbook, bank, accountNumber } = getValues()

    if (!bankbook || !bank || !accountNumber) {
      const msg = REGISTER_TOAST_MESSAGES.ACCOUNT_VERIFY_ERROR
      toast.error(msg.title, msg.description)
      return
    }

    verify(
      { bankCode: bank, accountNumber },
      {
        onSuccess: (result) => {
          if (result.verified) {
            setValue('accountVerificationId', result.id, {
              shouldValidate: true,
            })
            toast.success(REGISTER_TOAST_MESSAGES.ACCOUNT_VERIFY_SUCCESS.title)
          } else {
            setValue('accountVerificationId', null, { shouldValidate: true })
            const msg = REGISTER_TOAST_MESSAGES.ACCOUNT_VERIFY_MISMATCH
            toast.error(msg.title, msg.description)
          }
        },
        onError: (err) => {
          setValue('accountVerificationId', null, { shouldValidate: true })
          const serverMessage = extractServerMessage(err)
          if (serverMessage) {
            toast.error(serverMessage)
          } else {
            const msg = REGISTER_TOAST_MESSAGES.ACCOUNT_VERIFY_ERROR
            toast.error(msg.title, msg.description)
          }
        },
      },
    )
  }

  return (
    <section className="flex w-full flex-col overflow-clip rounded-16 bg-white">
      <header className="flex flex-col gap-1 px-24 pt-16 pb-12">
        <h2 className="typo-heading-20-sb text-gray-900">사업자 명의 계좌인증</h2>
        <p className="typo-title-16-r text-gray-700">
          사업자 명의의 통장 사본과 일치하는 계좌번호로 인증해주세요
        </p>
      </header>

      <div className="flex flex-col gap-16 px-24 pt-10 pb-16">
        <Controller
          control={control}
          name="bankbook"
          render={({ field }) => (
            <FileUploadInput
              label="사업자 명의 통장사본"
              required
              placeholder="대표자명 혹은 사업자명의 통장 사본을 업로드해주세요(10MB 이하의 jpg, jpeg, png, pdf)"
              helperText="예금주는 대표자명 혹은 사업자명과 일치하는 계좌번호만 인증이 가능해요"
              value={field.value?.name ?? ''}
              onChange={(file) => handleRegisterFileUpload(file, field.onChange)}
            />
          )}
        />

        <div className="flex w-full items-end gap-16">
          <Controller
            control={control}
            name="bank"
            render={({ field }) => (
              <Select
                label="은행명"
                placeholder="은행명"
                options={BANK_OPTIONS}
                value={field.value}
                onValueChange={field.onChange}
                disabled={isVerified}
                className="flex-1"
              />
            )}
          />
          <Controller
            control={control}
            name="accountNumber"
            render={({ field }) => (
              <InputField
                label="계좌번호"
                placeholder="계좌번호"
                buttonText={isVerified ? '인증완료' : '계좌인증'}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onButtonClick={isVerified ? () => {} : handleVerifyAccount}
                disabled={isPending || isVerified}
                readOnly={isVerified}
                className="flex-1"
              />
            )}
          />
        </div>
      </div>
    </section>
  )
}

function extractServerMessage(err: unknown): string | undefined {
  if (isAxiosError(err)) {
    const message = err.response?.data?.message
    if (typeof message === 'string' && message.length > 0) return message
  }
  return undefined
}
