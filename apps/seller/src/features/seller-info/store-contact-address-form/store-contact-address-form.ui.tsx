import { useState } from 'react'

import { Controller, useFormContext } from 'react-hook-form'
import { Button, Dropdown, Input, Label } from '@dessert/ui'

import { StoreDetailFormValues } from '@/entity/seller-info'

const CUSTOM_EMAIL_DOMAIN = 'custom'

const EMAIL_DOMAIN = [
  { label: '선택하세요', value: '' },
  { label: 'naver.com', value: 'naver.com' },
  { label: 'gmail.com', value: 'gmail.com' },
  { label: 'kakao.com', value: 'kakao.com' },
  { label: 'icloud.com', value: 'icloud.com' },
  { label: 'hanmail.net', value: 'hanmail.net' },
  { label: 'hotmail.com', value: 'hotmail.com' },
  { label: 'outlook.com', value: 'outlook.com' },
  { label: '직접 입력', value: CUSTOM_EMAIL_DOMAIN },
]

export function StoreContactAddressForm() {
  return (
    <section className="flex w-full min-w-0 flex-col gap-24">
      <ContactSection />
      <EmailSection />
      <AddressSection />
    </section>
  )
}

function ContactSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<StoreDetailFormValues>()

  return (
    <div>
      <div className="flex w-full flex-col gap-20 2xl:flex-row">
        <div className="flex flex-1 flex-col gap-6">
          <Input
            {...register('phoneNumber')}
            placeholder="01011112222"
            required
            label="연락처"
          />
          {errors.phoneNumber && (
            <span className="typo-body-12-r text-error-500">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>
        <Input
          {...register('subPhoneNumber')}
          placeholder="01033334444"
          label="추가 연락처"
          className="flex-1"
        />
      </div>
      <p className="mt-2 text-[12px] font-normal text-gray-500">
        연락처는 주문서 혹은 상품 페이지 하단에서 고객이 확인할 수 있어요
      </p>
    </div>
  )
}

function EmailSection() {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<StoreDetailFormValues>()

  const isCustomDomain = watch('emailDomainSelection') === CUSTOM_EMAIL_DOMAIN

  return (
    <div>
      <Label label="이메일" required />
      <div className="flex w-full flex-col gap-20 2xl:flex-row 2xl:items-center">
        <div className="flex flex-1 flex-col gap-6">
          <Input {...register('emailLocal')} placeholder="aaa123" required />
          {errors.emailLocal && (
            <span className="typo-body-12-r text-error-500">
              {errors.emailLocal.message}
            </span>
          )}
        </div>

        <div className="flex items-center text-[16px] font-normal text-gray-800">
          @
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <Input
            {...register('emailDomain')}
            placeholder="naver.com"
            required
            disabled={!isCustomDomain}
          />
          {errors.emailDomain && (
            <span className="typo-body-12-r text-error-500">
              {errors.emailDomain.message}
            </span>
          )}
        </div>

        <Controller
          name="emailDomainSelection"
          control={control}
          render={({ field }) => (
            <Dropdown
              options={EMAIL_DOMAIN}
              placeholder="선택하세요"
              value={field.value}
              onSelect={(value) => {
                field.onChange(value)
                setValue(
                  'emailDomain',
                  value === CUSTOM_EMAIL_DOMAIN ? '' : value,
                  { shouldValidate: true },
                )
              }}
              className="flex-1"
            />
          )}
        />
      </div>
    </div>
  )
}

function AddressSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<StoreDetailFormValues>()

  const [isPostalCodeSelected, setIsPostalCodeSelected] = useState(false)

  const handleClickPostalCodeSearch = () => {
    // 추후 우편번호 검색 라이브러리 연동
    // setValue('originAddress', '...')
    // setIsPostalCodeSelected(true)
  }

  return (
    <div>
      <div className="flex flex-col gap-24">
        <div className="flex w-full flex-col gap-20 2xl:flex-row">
          <div className="w-full xl:w-[310px] 2xl:shrink-0">
            <Label label="우편번호" required />
            <div className="flex gap-12">
              <Input
                placeholder="12345"
                required
                className="flex-1"
                disabled
              />
              <Button
                title="우편번호 검색"
                className="shrink-0"
                onClick={handleClickPostalCodeSearch}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6">
            <Input
              {...register('originAddress')}
              label="출고지 주소"
              placeholder="서울시 강남구 선릉로"
              required
              disabled
            />
            {errors.originAddress && (
              <span className="typo-body-12-r text-error-500">
                {errors.originAddress.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Input
            {...register('originAddressDetail')}
            label="출고지 상세주소"
            placeholder="1동 101호"
            required
            disabled={!isPostalCodeSelected}
          />
          {errors.originAddressDetail && (
            <span className="typo-body-12-r text-error-500">
              {errors.originAddressDetail.message}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
