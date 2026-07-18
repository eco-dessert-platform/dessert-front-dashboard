import { useEffect, useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
  toast,
} from '@dessert/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

import type { CreateAdminStoreRequest } from '@/entity/store/registration'

import { useCreateAdminStoreMutation } from './store-registration.mutation'

const CUSTOM_EMAIL_DOMAIN = 'custom'

const EMAIL_DOMAIN_OPTIONS = [
  { label: '직접 입력', value: CUSTOM_EMAIL_DOMAIN },
  { label: 'naver.com', value: 'naver.com' },
  { label: 'gmail.com', value: 'gmail.com' },
  { label: 'daum.net', value: 'daum.net' },
  { label: 'hanmail.net', value: 'hanmail.net' },
]

const PRESET_EMAIL_DOMAINS = EMAIL_DOMAIN_OPTIONS.filter(
  (option) => option.value !== CUSTOM_EMAIL_DOMAIN,
).map((option) => option.value)

const PROFILE_IMAGE_MAX_SIZE = 10 * 1024 * 1024
const PROFILE_IMAGE_TYPES = ['image/jpeg', 'image/png']

const storeRegistrationFormSchema = z.object({
  profileImage: z.custom<File | null>(
    (value) =>
      typeof File !== 'undefined' &&
      value instanceof File &&
      PROFILE_IMAGE_TYPES.includes(value.type) &&
      value.size <= PROFILE_IMAGE_MAX_SIZE,
    'jpg, jpeg, png 형식의 10MB 이하 이미지를 등록해주세요',
  ),
  storeName: z
    .string()
    .trim()
    .min(3, '스토어명은 3자 이상 입력해주세요')
    .max(50, '스토어명은 50자 이하로 입력해주세요'),
  identifier: z
    .string()
    .trim()
    .min(1, '사업자번호를 입력해주세요')
    .max(16, '사업자번호는 16자 이하로 입력해주세요'),
  introduce: z.string().trim().min(1, '한줄소개를 입력해주세요'),
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
  emailLocal: z.string().trim().min(1, '이메일을 입력해주세요'),
  emailDomain: z.string().trim().min(1, '이메일 도메인을 선택해주세요'),
  postalCode: z.string().trim(),
  originAddress: z.string().trim().min(1, '출고지 주소를 입력해주세요'),
  originAddressDetail: z
    .string()
    .trim()
    .min(1, '출고지 상세주소를 입력해주세요')
    .max(50, '출고지 상세주소는 50자 이하로 입력해주세요'),
})

type StoreRegistrationFormValues = z.infer<typeof storeRegistrationFormSchema>

const DEFAULT_VALUES: StoreRegistrationFormValues = {
  profileImage: null,
  storeName: '',
  identifier: '',
  introduce: '',
  phoneNumber: '',
  subPhoneNumber: '',
  emailLocal: '',
  emailDomain: '',
  postalCode: '',
  originAddress: '',
  originAddressDetail: '',
}

interface StoreRegistrationFormDialogProps {
  open: boolean
  onClose: () => void
}

const getOriginAddress = ({
  postalCode,
  originAddress,
}: Pick<StoreRegistrationFormValues, 'postalCode' | 'originAddress'>) => {
  if (!postalCode) return originAddress.trim()

  return `(${postalCode.trim()}) ${originAddress.trim()}`
}

const toCreateAdminStoreRequest = (
  values: StoreRegistrationFormValues,
): CreateAdminStoreRequest => {
  return {
    storeName: values.storeName.trim(),
    identifier: values.identifier.trim(),
    introduce: values.introduce.trim(),
    phoneNumber: values.phoneNumber.trim(),
    subPhoneNumber: values.subPhoneNumber.trim() || null,
    email: `${values.emailLocal.trim()}@${values.emailDomain.trim()}`,
    originAddress: getOriginAddress(values),
    originAddressDetail: values.originAddressDetail.trim(),
  }
}

export const StoreRegistrationFormDialog = ({
  open,
  onClose,
}: StoreRegistrationFormDialogProps) => {
  const { mutate, isPending } = useCreateAdminStoreMutation()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<StoreRegistrationFormValues>({
    resolver: zodResolver(storeRegistrationFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  })

  const [domainSelectValue, setDomainSelectValue] = useState(() => {
    const domain = getValues('emailDomain')
    if (!domain) return ''
    return PRESET_EMAIL_DOMAINS.includes(domain) ? domain : CUSTOM_EMAIL_DOMAIN
  })
  const profileImage = useWatch({ control, name: 'profileImage' })
  const emailDomain = useWatch({ control, name: 'emailDomain' }) ?? ''
  const isCustomEmailDomain = domainSelectValue === CUSTOM_EMAIL_DOMAIN

  useEffect(() => {
    if (!profileImage) {
      setPreviewUrl(null)
      return
    }

    const nextPreviewUrl = URL.createObjectURL(profileImage)
    setPreviewUrl(nextPreviewUrl)

    return () => {
      URL.revokeObjectURL(nextPreviewUrl)
    }
  }, [profileImage])

  const handleClose = () => {
    if (isPending) return
    reset(DEFAULT_VALUES)
    setDomainSelectValue('')
    onClose()
  }

  const handleEmailDomainSelect = (value: string) => {
    setDomainSelectValue(value)

    setValue('emailDomain', value === CUSTOM_EMAIL_DOMAIN ? '' : value, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const handleCheckStoreName = () => {
    toast.info('스토어명 중복 확인은 추후 연결 예정입니다.')
  }

  const onSubmit = (values: StoreRegistrationFormValues) => {
    if (!values.profileImage) return

    mutate(
      {
        request: toCreateAdminStoreRequest(values),
        profileImage: values.profileImage,
      },
      { onSuccess: handleClose },
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) handleClose()
      }}
    >
      <DialogContent className="h-[722px] w-[1060px] gap-20 py-10 pr-20 pl-24 sm:max-w-[1060px]">
        <DialogHeader className="gap-4">
          <DialogTitle
            showCloseButton
            className="typo-heading-24-m text-gray-800"
          >
            스토어 생성
          </DialogTitle>
          <DialogDescription>스토어 정보를 입력하세요</DialogDescription>
        </DialogHeader>

        <form
          className="grid grid-cols-[264px_1fr]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-[264px] flex-col gap-12">
            <div className="w-[220px]">
              <Controller
                name="profileImage"
                control={control}
                render={({ field: { onChange } }) => (
                  <div className="flex flex-col gap-8">
                    <p className="typo-body-12-r text-gray-800">
                      스토어 프로필
                    </p>
                    <label className="flex h-[180px] w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-12 border border-gray-200 bg-gray-50">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="스토어 프로필 미리보기"
                          className="size-full object-cover"
                        />
                      ) : (
                        <Plus size={56} className="text-gray-600" />
                      )}
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        className="sr-only"
                        disabled={isPending}
                        onChange={(event) => {
                          onChange(event.target.files?.[0] ?? null)
                        }}
                      />
                    </label>
                    <p className="typo-body-12-r break-keep text-gray-500">
                      권장 크기 1000*1000, 최소 160*160 이상 (1:1 비율). jpg,
                      jpeg, png 형식 · 10MB 이하 파일만 업로드 가능해요
                    </p>
                    <p className="min-h-5 typo-body-12-r text-error-500">
                      {errors.profileImage?.message}
                    </p>
                  </div>
                )}
              />
              <Input
                label="한줄소개"
                placeholder="빵그리입니다!"
                disabled={isPending}
                error={Boolean(errors.introduce)}
                errorMessage={errors.introduce?.message}
                helperText=" "
                {...register('introduce')}
              />
            </div>
          </div>

          <div className="flex flex-col gap-20">
            <div className="grid grid-cols-2 gap-16">
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
                  title="중복확인"
                  type="button"
                  variant="primary-outlined"
                  disabled={isPending}
                  className="mt-[26px] shrink-0"
                  onClick={handleCheckStoreName}
                />
              </div>
              <Input
                label="사업자번호"
                required
                placeholder="사업자번호를 입력하세요"
                disabled={isPending}
                error={Boolean(errors.identifier)}
                errorMessage={errors.identifier?.message}
                helperText=" "
                {...register('identifier')}
              />
            </div>

            <div className="grid grid-cols-2 gap-16">
              <Input
                label="연락처"
                required
                placeholder="'-' 특수문자 제외 연락처를 입력하세요"
                disabled={isPending}
                error={Boolean(errors.phoneNumber)}
                errorMessage={errors.phoneNumber?.message}
                helperText=" "
                {...register('phoneNumber')}
              />
              <Input
                label="추가 연락처"
                placeholder="'-' 특수문자 제외 연락처를 입력하세요"
                disabled={isPending}
                error={Boolean(errors.subPhoneNumber)}
                errorMessage={errors.subPhoneNumber?.message}
                helperText=" "
                {...register('subPhoneNumber')}
              />
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)_150px] items-start gap-12">
              <Input
                label="이메일"
                placeholder="aaa123"
                disabled={isPending}
                className="min-w-0"
                error={Boolean(errors.emailLocal)}
                errorMessage={errors.emailLocal?.message}
                helperText=" "
                {...register('emailLocal')}
              />
              <span className="mt-[26px] flex h-input items-center justify-center typo-title-16-r text-gray-700">
                @
              </span>
              <Input
                placeholder={isCustomEmailDomain ? '도메인을 입력하세요' : ''}
                disabled={isPending || !isCustomEmailDomain}
                className="mt-[26px] min-w-0"
                value={emailDomain}
                error={Boolean(errors.emailDomain)}
                errorMessage={errors.emailDomain?.message}
                helperText=" "
                onChange={(event) => {
                  setValue('emailDomain', event.target.value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }}
              />
              <Controller
                name="emailDomain"
                control={control}
                render={() => (
                  <Select
                    options={EMAIL_DOMAIN_OPTIONS}
                    value={domainSelectValue}
                    placeholder="선택하세요"
                    disabled={isPending}
                    className="mt-[26px] min-w-0"
                    onValueChange={handleEmailDomainSelect}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-[190px_130px_1fr] items-start gap-16">
              <Input
                label="우편번호"
                placeholder="12345"
                disabled={isPending}
                helperText=" "
                {...register('postalCode')}
              />
              <Button
                title="우편번호 검색"
                type="button"
                disabled={isPending}
                className="mt-[26px]"
                onClick={() => {
                  toast.info('우편번호 검색은 추후 연결 예정입니다.')
                }}
              />
              <Input
                label="출고지 주소"
                placeholder="서울특별시 강남구 선릉로"
                disabled={isPending}
                error={Boolean(errors.originAddress)}
                errorMessage={errors.originAddress?.message}
                helperText=" "
                {...register('originAddress')}
              />
            </div>

            <Input
              label="출고지 상세주소"
              placeholder="1동 101호"
              disabled={isPending}
              error={Boolean(errors.originAddressDetail)}
              errorMessage={errors.originAddressDetail?.message}
              helperText=" "
              {...register('originAddressDetail')}
            />

            <div className="flex justify-end pt-10">
              <Button
                title="등록하기"
                type="submit"
                disabled={!isValid || isPending}
                className="min-w-[172px]"
              />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
