import { useEffect, useRef, useState } from 'react'

import { Button, Input, Label, Select, toast } from '@dessert/ui'
import { ImageIcon } from '@dessert/icons'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { useKakaoPostcodePopup } from 'react-daum-postcode'

import { FILE_UPLOAD_LIMITS, RegisterForm } from '@/entity/register'
import { formatDaumAddress } from '@/shared/utils/format-daum-address'
import { InputField } from '@/widgets/input-field'

import { REGISTER_TOAST_MESSAGES } from '../register.constant'
import { useCheckStoreNameMutation } from './check-store-name.mutation'
import { ConfirmStoreAlert } from './confirm-store-alert.ui'
import { DuplicateStoreAlert } from './duplicate-store-alert.ui'
import { StoreSearchModal, type StoreSelection } from './store-search-modal.ui'

const CUSTOM_DOMAIN = 'custom'

const EMAIL_DOMAIN_OPTIONS = [
  { label: '직접 입력', value: CUSTOM_DOMAIN },
  { label: 'naver.com', value: 'naver.com' },
  { label: 'gmail.com', value: 'gmail.com' },
  { label: 'daum.net', value: 'daum.net' },
  { label: 'kakao.com', value: 'kakao.com' },
]

const PRESET_EMAIL_DOMAINS = EMAIL_DOMAIN_OPTIONS.filter(
  (option) => option.value !== CUSTOM_DOMAIN,
).map((option) => option.value)

export function StoreInfo() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [duplicateAlertOpen, setDuplicateAlertOpen] = useState(false)
  const [confirmAlertOpen, setConfirmAlertOpen] = useState(false)
  const [pendingStore, setPendingStore] = useState<StoreSelection | null>(null)

  const { mutate: checkDuplicate, isPending } = useCheckStoreNameMutation()
  const openPostcodePopup = useKakaoPostcodePopup()

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<RegisterForm>()
  const [domainSelectValue, setDomainSelectValue] = useState(() => {
    const domain = getValues('emailDomain')
    if (!domain) return ''
    return PRESET_EMAIL_DOMAINS.includes(domain) ? domain : CUSTOM_DOMAIN
  })
  const storeName = useWatch({ control, name: 'storeName' }) ?? ''
  const emailDomain = useWatch({ control, name: 'emailDomain' }) ?? ''
  const postalCode = useWatch({ control, name: 'postalCode' }) ?? ''
  const originAddress = useWatch({ control, name: 'originAddress' }) ?? ''
  const profileImage = useWatch({ control, name: 'profileImage' }) ?? null
  const isCustomDomain = domainSelectValue === CUSTOM_DOMAIN
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profilePreviewUrl, setProfilePreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!profileImage) {
      setProfilePreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(profileImage)
    setProfilePreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [profileImage])

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
      },
    })
  }

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (file.size > FILE_UPLOAD_LIMITS.MAX_SIZE_BYTES) {
      const msg = REGISTER_TOAST_MESSAGES.FILE_SIZE_EXCEEDED
      toast.error(msg.title, msg.description)
      return
    }

    const allowedImageTypes = ['image/jpeg', 'image/png']
    if (!allowedImageTypes.includes(file.type)) {
      const msg = REGISTER_TOAST_MESSAGES.PROFILE_IMAGE_TYPE_INVALID
      toast.error(msg.title, msg.description)
      return
    }

    setValue('profileImage', file, { shouldDirty: true, shouldValidate: true })
    toast.success(REGISTER_TOAST_MESSAGES.FILE_UPLOAD_SUCCESS.title)
  }

  const handleDomainSelect = (value: string) => {
    setDomainSelectValue(value)
    if (value === CUSTOM_DOMAIN) {
      setValue('emailDomain', '', { shouldDirty: true, shouldValidate: true })
    } else {
      setValue('emailDomain', value, {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }

  const handleCheckDuplicate = (selected: StoreSelection) => {
    setPendingStore(selected)
    checkDuplicate(selected.name, {
      onSuccess: (result) => {
        if (result.available) {
          setConfirmAlertOpen(true)
        } else {
          setDuplicateAlertOpen(true)
        }
      },
      onError: () => {
        const msg = REGISTER_TOAST_MESSAGES.STORE_NAME_CHECK_ERROR
        toast.error(msg.title, msg.description)
        setPendingStore(null)
      },
    })
  }

  const handleDuplicateConfirm = () => {
    setDuplicateAlertOpen(false)
    setPendingStore(null)
    // 스펙 AU-03-02: 검색 모달 초기 화면으로 돌아감 (search modal 은 열린 상태 유지)
  }

  const handleConfirmCancel = () => {
    setConfirmAlertOpen(false)
    // 스펙: 취소 시 이전 화면(search modal)으로
  }

  const handleConfirmRegister = () => {
    // 스펙 AU-03-07: 스토어명 등록 완료 → 모달 닫고 form 에 반영
    if (!pendingStore) return
    setValue('storeName', pendingStore.name, {
      shouldDirty: true,
      shouldValidate: true,
    })
    setValue('storeId', pendingStore.id, {
      shouldDirty: true,
    })
    setConfirmAlertOpen(false)
    setSearchOpen(false)
    setPendingStore(null)
  }

  return (
    <section className="flex w-full flex-col overflow-clip rounded-[16px] bg-white">
      <header className="sticky top-0 flex items-center justify-between bg-white px-24 pb-12 pt-16">
        <h2 className="typo-heading-20-sb text-gray-900">스토어 정보 등록</h2>
      </header>

      <div className="flex flex-col items-start bg-white px-24 pb-16 pt-10">
        <InputField
          label="스토어명"
          required
          placeholder="스토어를 검색해주세요"
          buttonText="검색"
          readOnly
          allowEmptyButtonClick
          value={storeName}
          onButtonClick={() => setSearchOpen(true)}
          error={!!errors.storeName}
          errorMessage={errors.storeName?.message}
        />
      </div>

      <div className="flex items-start pb-16">
        <div className="flex h-[398px] flex-col items-start gap-8 bg-white py-10 pl-24 pr-20">
          <div className="flex w-full flex-col items-start gap-4">
            <p className="typo-title-14-m text-gray-800">스토어 프로필</p>
            <button
              type="button"
              className="flex w-full size-[200px] cursor-pointer flex-col items-center justify-center gap-0 overflow-hidden rounded-[16px] border border-gray-200 bg-white p-10"
              onClick={() => fileInputRef.current?.click()}
            >
              {profilePreviewUrl ? (
                <img
                  src={profilePreviewUrl}
                  alt="스토어 프로필 미리보기"
                  className="size-full object-cover"
                />
              ) : (
                <>
                  <ImageIcon aria-hidden className="size-[30px] text-gray-400" />
                  <span className="typo-body-12-r text-gray-800">
                    이미지를 업로드해주세요
                  </span>
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              hidden
              onChange={handleProfileImageChange}
            />
            <p className="typo-body-10-r text-gray-500">
              권장 크기 1000×1000, 최소 160×160 이상 (1:1 비율) ·<br />
              jpg, jpeg, png 형식 · 10MB 이하 파일만 업로드 가능해요
            </p>
          </div>

          <Controller
            control={control}
            name="introduce"
            render={({ field }) => (
              <Input
                {...field}
                label="한줄소개"
                placeholder="스토어 소개를 작성해주세요"
                className="w-full"
                error={!!errors.introduce}
                errorMessage={errors.introduce?.message}
              />
            )}
          />
        </div>

        <div className="flex flex-1 flex-col items-start justify-center self-stretch">
          <div className="flex w-full items-start gap-16 pl-20 pr-24">
            <div className="flex flex-1 py-10">
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <Input
                    {...field}
                    className="w-full"
                    label="연락처"
                    required
                    placeholder="하이픈(-) 없이 입력해주세요"
                    helperText="연락처는 주문서 혹은 상품 페이지 하단에서 고객이 확인할 수 있어요"
                    error={!!errors.phoneNumber}
                    errorMessage={errors.phoneNumber?.message}
                  />
                )}
              />
            </div>
            <div className="flex flex-1 py-10">
              <Controller
                control={control}
                name="subPhoneNumber"
                render={({ field }) => (
                  <Input
                    {...field}
                    className="w-full"
                    label="추가 연락처"
                    placeholder="하이픈(-) 없이 입력해주세요"
                  />
                )}
              />
            </div>
          </div>

          <div className="flex w-full items-end gap-16 bg-white py-10 pl-20 pr-24">
            <Controller
              control={control}
              name="emailLocal"
              render={({ field }) => (
                <Input
                  {...field}
                  label="이메일"
                  required
                  placeholder="이메일 주소를 입력해주세요"
                  className="flex-1"
                  error={!!errors.emailLocal}
                  errorMessage={errors.emailLocal?.message}
                />
              )}
            />
            <div className="flex h-input shrink-0 items-center typo-title-16-r text-gray-800">
              @
            </div>
            <Input
              placeholder={isCustomDomain ? '도메인을 입력해주세요' : ''}
              disabled={!isCustomDomain}
              value={emailDomain}
              onChange={(e) =>
                setValue('emailDomain', e.target.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              className="flex-1 self-end!"
              error={!!errors.emailDomain}
              errorMessage={errors.emailDomain?.message}
            />
            <Select
              options={EMAIL_DOMAIN_OPTIONS}
              placeholder="선택하세요"
              value={domainSelectValue}
              onValueChange={handleDomainSelect}
              className="w-[150px] shrink-0 self-end!"
            />
          </div>

          <div className="flex w-full items-start gap-16 bg-white py-10 pl-20 pr-24">
            <div className="flex w-[336px] shrink-0 flex-col items-start gap-4">
              <Label label="우편번호" required />
              <div className="flex w-full items-start gap-16">
                <Input
                  readOnly
                  placeholder="우편번호"
                  className="flex-1"
                  value={postalCode}
                  error={!!errors.postalCode}
                  errorMessage={errors.postalCode?.message}
                />
                <Button
                  type="button"
                  title="우편번호 검색"
                  size="md"
                  onClick={handleSearchPostalCode}
                  className="w-[130px] shrink-0 whitespace-nowrap"
                />
              </div>
            </div>
            <Input
              label="출고지 주소"
              required
              placeholder="출고지 주소"
              readOnly
              className="flex-1"
              value={originAddress}
              error={!!errors.originAddress}
              errorMessage={errors.originAddress?.message}
            />
          </div>

          <div className="flex w-full flex-col items-start bg-white py-10 pl-20 pr-24">
            <Controller
              control={control}
              name="originAddressDetail"
              render={({ field }) => (
                <Input
                  {...field}
                  label="출고지 상세주소"
                  required
                  placeholder="상세 주소를 입력해 주세요(동/호수 포함)"
                  error={!!errors.originAddressDetail}
                  errorMessage={errors.originAddressDetail?.message}
                />
              )}
            />
          </div>
        </div>
      </div>

      <StoreSearchModal
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onCheckDuplicate={handleCheckDuplicate}
        isChecking={isPending}
      />
      <DuplicateStoreAlert
        open={duplicateAlertOpen}
        onOpenChange={setDuplicateAlertOpen}
        onConfirm={handleDuplicateConfirm}
      />
      <ConfirmStoreAlert
        open={confirmAlertOpen}
        onOpenChange={setConfirmAlertOpen}
        storeName={pendingStore?.name ?? ''}
        onCancel={handleConfirmCancel}
        onConfirm={handleConfirmRegister}
      />
    </section>
  )
}
