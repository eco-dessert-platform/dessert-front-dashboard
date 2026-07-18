import { useEffect } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
} from '@dessert/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type {
  StoreRegistration,
  UpdateAdminStoreRequest,
} from '@/entity/store/registration'

import { useUpdateAdminStoreMutation } from './store-registration.mutation'

const BUSINESS_NUMBER_PATTERN = /^(?:\d{10}|\d{3}-\d{2}-\d{5})$/

const normalizeDigits = (value: string) => value.replace(/\D/g, '')

const isValidBusinessNumber = (value: string) => {
  const businessNumber = normalizeDigits(value)

  if (!/^\d{10}$/.test(businessNumber)) return false

  const digits = businessNumber.split('').map(Number)
  const weights = [1, 3, 7, 1, 3, 7, 1, 3]
  const weightedSum = weights.reduce(
    (sum, weight, index) => sum + digits[index] * weight,
    0,
  )
  const ninthDigitCalculation = digits[8] * 5
  const checksum =
    weightedSum +
    Math.floor(ninthDigitCalculation / 10) +
    (ninthDigitCalculation % 10)
  const expectedCheckDigit = (10 - (checksum % 10)) % 10

  return expectedCheckDigit === digits[9]
}

const storeRegistrationEditFormSchema = z.object({
  storeName: z
    .string()
    .trim()
    .min(3, '스토어명은 3자 이상 입력해주세요')
    .max(50, '스토어명은 50자 이하로 입력해주세요'),
  identifier: z
    .string()
    .trim()
    .min(1, '사업자등록번호를 입력해주세요')
    .regex(
      BUSINESS_NUMBER_PATTERN,
      '사업자등록번호는 10자리 숫자로 입력해주세요',
    )
    .refine(isValidBusinessNumber, '유효하지 않은 사업자등록번호입니다')
    .transform(normalizeDigits),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^[0-9]{9,11}$/, '숫자만 9~11자리로 입력해주세요'),
  subPhoneNumber: z
    .string()
    .trim()
    .refine(
      (value) => value === '' || /^[0-9]{9,11}$/.test(value),
      '숫자만 9~11자리로 입력해주세요',
    ),
  introduce: z.string().trim().min(1, '한줄소개를 입력해주세요'),
  email: z.email('유효한 이메일 주소를 입력해주세요'),
  originAddress: z.string().trim().min(1, '기본주소를 입력해주세요'),
  originAddressDetail: z
    .string()
    .trim()
    .min(1, '상세주소를 입력해주세요')
    .max(50, '상세주소는 50자 이하로 입력해주세요'),
})

type StoreRegistrationEditFormValues = z.infer<
  typeof storeRegistrationEditFormSchema
>

const DEFAULT_VALUES: StoreRegistrationEditFormValues = {
  storeName: '',
  identifier: '',
  phoneNumber: '',
  subPhoneNumber: '',
  introduce: '',
  email: '',
  originAddress: '',
  originAddressDetail: '',
}

const toDefaultValues = (
  store: StoreRegistration | null,
): StoreRegistrationEditFormValues => {
  if (!store) return DEFAULT_VALUES

  return {
    storeName: store.storeName,
    identifier: normalizeDigits(store.businessNumber),
    phoneNumber: normalizeDigits(store.phone),
    subPhoneNumber: normalizeDigits(store.subPhoneNumber),
    introduce: store.introduction,
    email: store.email,
    originAddress: store.baseAddress,
    originAddressDetail: store.detailAddress,
  }
}

const toUpdateAdminStoreRequest = (
  values: StoreRegistrationEditFormValues,
): UpdateAdminStoreRequest => ({
  storeName: values.storeName.trim(),
  identifier: values.identifier.trim(),
  introduce: values.introduce.trim(),
  phoneNumber: values.phoneNumber.trim(),
  subPhoneNumber: values.subPhoneNumber.trim() || null,
  email: values.email.trim(),
  originAddress: values.originAddress.trim(),
  originAddressDetail: values.originAddressDetail.trim(),
})

interface StoreRegistrationEditDialogProps {
  store: StoreRegistration | null
  onClose: () => void
}

export const StoreRegistrationEditDialog = ({
  store,
  onClose,
}: StoreRegistrationEditDialogProps) => {
  const { mutate, isPending } = useUpdateAdminStoreMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<StoreRegistrationEditFormValues>({
    resolver: zodResolver(storeRegistrationEditFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  })

  useEffect(() => {
    reset(toDefaultValues(store))
  }, [reset, store])

  const handleClose = () => {
    if (isPending) return
    reset(DEFAULT_VALUES)
    onClose()
  }

  const onSubmit = (values: StoreRegistrationEditFormValues) => {
    if (!store) return

    mutate(
      {
        storeId: store.id,
        body: toUpdateAdminStoreRequest(values),
      },
      { onSuccess: handleClose },
    )
  }

  return (
    <Dialog
      open={store !== null}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) handleClose()
      }}
    >
      <DialogContent className="w-[1240px] gap-40 px-40 py-24 sm:max-w-[1240px]">
        <DialogHeader className="gap-6">
          <DialogTitle
            showCloseButton
            className="typo-heading-24-m text-gray-800"
          >
            스토어 수정
          </DialogTitle>
          <DialogDescription>스토어 정보를 입력하세요</DialogDescription>
        </DialogHeader>

        <form
          className="grid grid-cols-2 gap-x-[114px] gap-y-20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-start gap-8">
            <Input
              label="스토어명"
              required
              placeholder="스토어명을 입력하세요"
              disabled={isPending}
              className="flex-1"
              error={Boolean(errors.storeName)}
              errorMessage={errors.storeName?.message}
              helperText=" "
              {...register('storeName')}
            />
            <Button
              title="확인완료"
              type="button"
              disabled={isPending}
              className="mt-[26px] shrink-0 bg-gray-900 text-white hover:bg-gray-800"
            />
          </div>

          <Input
            label="사업자번호"
            placeholder="사업자번호를 입력하세요"
            disabled={isPending}
            error={Boolean(errors.identifier)}
            errorMessage={errors.identifier?.message}
            helperText=" "
            {...register('identifier')}
          />

          <Input
            label="대표전화번호"
            required
            placeholder="'-' 없이 입력해주세요"
            disabled={isPending}
            error={Boolean(errors.phoneNumber)}
            errorMessage={errors.phoneNumber?.message}
            helperText="특수문자 - 없이 입력해주세요"
            {...register('phoneNumber')}
          />

          <Input
            label="보조전화번호"
            placeholder="'-' 없이 입력해주세요"
            disabled={isPending}
            error={Boolean(errors.subPhoneNumber)}
            errorMessage={errors.subPhoneNumber?.message}
            helperText="특수문자 - 없이 입력해주세요"
            {...register('subPhoneNumber')}
          />

          <Input
            label="한줄소개"
            placeholder="한줄소개를 입력하세요"
            disabled={isPending}
            error={Boolean(errors.introduce)}
            errorMessage={errors.introduce?.message}
            helperText=" "
            {...register('introduce')}
          />

          <Input
            label="이메일"
            placeholder="user@example.com"
            disabled={isPending}
            error={Boolean(errors.email)}
            errorMessage={errors.email?.message}
            helperText=" "
            {...register('email')}
          />

          <Input
            label="기본주소"
            placeholder="기본주소를 입력하세요"
            disabled={isPending}
            error={Boolean(errors.originAddress)}
            errorMessage={errors.originAddress?.message}
            helperText=" "
            {...register('originAddress')}
          />

          <Input
            label="상세주소"
            placeholder="상세주소를 입력하세요"
            disabled={isPending}
            error={Boolean(errors.originAddressDetail)}
            errorMessage={errors.originAddressDetail?.message}
            helperText=" "
            {...register('originAddressDetail')}
          />

          <div className="col-span-2 flex justify-start">
            <Button
              title="수정"
              type="submit"
              disabled={!isValid || isPending}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
