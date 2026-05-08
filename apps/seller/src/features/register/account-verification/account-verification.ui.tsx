import { useEffect, useState } from 'react'

import { Select, toast } from '@dessert/ui'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import {
  BANK_OPTIONS,
  type RegisterForm,
  editAccountRequest,
  registerQueries,
  verifyAccount,
} from '@/entity/register'
import { REGISTER_TOAST_MESSAGES } from '@/features/register'
import { FileUploadInput } from '@/widgets/file-upload-input'
import { InputField } from '@/widgets/input-field'

import { handleRegisterFileUpload, sanitizeAccountPayload } from '../lib'

export function AccountVerification() {
  const { control, getValues, setValue } = useFormContext<RegisterForm>()

  const { mutate: verify, isPending: isVerifying } = useMutation({
    mutationFn: verifyAccount,
  })

  const { mutate: editAccount, isPending: isSaving } = useMutation({
    mutationFn: editAccountRequest,
  })

  const isPending = isVerifying || isSaving

  const { data: existing } = useQuery(registerQueries.accountVerification())

  const accountVerificationId = useWatch({
    control,
    name: 'accountVerificationId',
  })

  const isVerified = accountVerificationId != null
  const [isEditing, setIsEditing] = useState(false)
  const isReadOnly = isVerified && !isEditing

  useEffect(() => {
    if (!existing?.verified) return
    setValue('bank', existing.bankCode)
    setValue('accountNumber', existing.accountNumber)
    setValue('accountVerificationId', existing.id, { shouldValidate: true })
  }, [existing, setValue])

  const isAccountInputFilled = (
    values: Pick<RegisterForm, 'bank' | 'accountNumber'>,
  ) => {
    const { bank, accountNumber } = values

    if (!bank || !accountNumber) {
      const msg = REGISTER_TOAST_MESSAGES.ACCOUNT_VERIFY_ERROR
      toast.error(msg.title, msg.description)
      return false
    }

    return true
  }

  const handleStartEdit = () => {
    setIsEditing(true)
  }

  const handleSubmitEdit = () => {
    const values = getValues()
    if (!isAccountInputFilled(values)) return

    editAccount(
      sanitizeAccountPayload({
        bankCode: values.bank,
        accountNumber: values.accountNumber,
      }),
      {
        onSuccess: () => {
          setIsEditing(false)
          toast.success(REGISTER_TOAST_MESSAGES.ACCOUNT_EDIT_SUCCESS.title)
        },
        onError: (err) => {
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

  const handleVerifyAccount = () => {
    const values = getValues()
    if (!isAccountInputFilled(values)) return

    verify(
      sanitizeAccountPayload({
        bankCode: values.bank,
        accountNumber: values.accountNumber,
      }),
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
        <h2 className="typo-heading-20-sb text-gray-900">
          사업자 명의 계좌인증
        </h2>
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
              onChange={(file) =>
                handleRegisterFileUpload(file, field.onChange)
              }
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
                disabled={isReadOnly}
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
                buttonText={
                  isEditing ? '변경' : isVerified ? '변경하기' : '계좌인증'
                }
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onButtonClick={
                  isEditing
                    ? handleSubmitEdit
                    : isVerified
                      ? handleStartEdit
                      : handleVerifyAccount
                }
                disabled={isPending}
                readOnly={isReadOnly}
                allowEmptyButtonClick={isReadOnly}
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
