import { useEffect, useState } from 'react'

import { PlusIcon } from '@dessert/icons'
import { Button, Input, Select, toast } from '@dessert/ui'
import { useKakaoPostcodePopup } from 'react-daum-postcode'
import { Controller, useWatch } from 'react-hook-form'

import { formatDaumAddress } from '@/shared/utils'

import {
  CUSTOM_EMAIL_DOMAIN,
  EMAIL_DOMAIN_OPTIONS,
  PRESET_EMAIL_DOMAINS,
} from './store-registration-form.schema'

import type { StoreRegistrationFormValues } from './store-registration-form.schema'
import type { UseFormReturn } from 'react-hook-form'

interface StoreRegistrationFormFieldsProps {
  form: UseFormReturn<StoreRegistrationFormValues>
  disabled: boolean
  submitTitle: string
}

export const StoreRegistrationFormFields = ({
  form,
  disabled,
  submitTitle,
}: StoreRegistrationFormFieldsProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const {
    register,
    control,
    setValue,
    setFocus,
    formState: { errors, isValid },
  } = form
  const profileImage = useWatch({ control, name: 'profileImage' })
  const emailDomain = useWatch({ control, name: 'emailDomain' }) ?? ''
  const domainSelectValue = PRESET_EMAIL_DOMAINS.includes(emailDomain)
    ? emailDomain
    : CUSTOM_EMAIL_DOMAIN
  const isCustomEmailDomain = domainSelectValue === CUSTOM_EMAIL_DOMAIN
  const openPostcodePopup = useKakaoPostcodePopup()

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

  const handleEmailDomainSelect = (value: string) => {
    setValue('emailDomain', value === CUSTOM_EMAIL_DOMAIN ? '' : value, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const handleCheckStoreName = () => {
    toast.info('스토어명 중복 확인은 추후 연결 예정입니다.')
  }

  const handleSearchPostalCode = () => {
    openPostcodePopup({
      onComplete: (data) => {
        setValue('postalCode', data.zonecode, {
          shouldDirty: true,
          shouldValidate: true,
        })
        setValue('originAddress', formatDaumAddress(data), {
          shouldDirty: true,
          shouldValidate: true,
        })
        setFocus('originAddressDetail')
      },
    })
  }

  return (
    <>
      <div className="flex w-[264px] flex-col gap-12">
        <div className="w-[220px]">
          <Controller
            name="profileImage"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex flex-col gap-8">
                <p className="typo-body-12-r text-gray-800">스토어 프로필</p>
                <label className="flex h-[180px] w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-12 border border-gray-200 bg-gray-50">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="스토어 프로필 미리보기"
                      className="size-full object-cover"
                    />
                  ) : (
                    <PlusIcon className="size-56 text-gray-600" />
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    className="sr-only"
                    disabled={disabled}
                    onChange={(event) => {
                      onChange(event.target.files?.[0] ?? null)
                    }}
                  />
                </label>
                <p className="typo-body-12-r break-keep text-gray-500">
                  권장 크기 1000*1000, 최소 160*160 이상 (1:1 비율). jpg, jpeg,
                  png 형식 · 10MB 이하 파일만 업로드 가능해요
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
            disabled={disabled}
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
              disabled={disabled}
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
              disabled={disabled}
              className="mt-[26px] shrink-0"
              onClick={handleCheckStoreName}
            />
          </div>
          <Input
            label="사업자번호"
            required
            placeholder="사업자번호를 입력하세요"
            disabled={disabled}
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
            disabled={disabled}
            error={Boolean(errors.phoneNumber)}
            errorMessage={errors.phoneNumber?.message}
            helperText=" "
            {...register('phoneNumber')}
          />
          <Input
            label="추가 연락처"
            placeholder="'-' 특수문자 제외 연락처를 입력하세요"
            disabled={disabled}
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
            disabled={disabled}
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
            disabled={disabled || !isCustomEmailDomain}
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
                disabled={disabled}
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
            disabled={disabled}
            helperText=" "
            {...register('postalCode')}
          />
          <Button
            title="우편번호 검색"
            type="button"
            disabled={disabled}
            className="mt-[26px]"
            onClick={handleSearchPostalCode}
          />
          <Input
            label="출고지 주소"
            placeholder="서울특별시 강남구 선릉로"
            disabled={disabled}
            error={Boolean(errors.originAddress)}
            errorMessage={errors.originAddress?.message}
            helperText=" "
            {...register('originAddress')}
          />
        </div>

        <Input
          label="출고지 상세주소"
          placeholder="1동 101호"
          disabled={disabled}
          error={Boolean(errors.originAddressDetail)}
          errorMessage={errors.originAddressDetail?.message}
          helperText=" "
          {...register('originAddressDetail')}
        />

        <div className="flex justify-end pt-10">
          <Button
            title={submitTitle}
            type="submit"
            disabled={!isValid || disabled}
            className="min-w-[172px]"
          />
        </div>
      </div>
    </>
  )
}
