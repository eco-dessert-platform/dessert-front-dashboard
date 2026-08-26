import { toast } from '@dessert/ui'
import { isAxiosError } from 'axios'
import { useFormContext, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/entity/auth'
import { RegisterForm, STORE_INFO_FIELDS } from '@/entity/register'
import {
  REGISTER_TOAST_MESSAGES,
  RegisterStepFooter,
  StoreInfo,
  TermsAgreement,
  useSubmitStoreApplicationMutation,
} from '@/features/register'
import { ROUTES } from '@/shared/constant/routes'

const isFieldFilled = (value: unknown) => {
  if (value === undefined || value === null) return false
  if (typeof value === 'string') return value.trim().length > 0
  return true
}

const StoreInfoPage = () => {
  const { control, trigger, getValues } = useFormContext<RegisterForm>()
  const storeFieldValues = useWatch({ control, name: STORE_INFO_FIELDS })
  const profileImage = useWatch({ control, name: 'profileImage' })
  const agreeToServiceTerms = useWatch({
    control,
    name: 'agreeToServiceTerms',
  })
  const agreeToPrivacyPolicy = useWatch({
    control,
    name: 'agreeToPrivacyPolicy',
  })
  const navigate = useNavigate()
  const setSellerStatus = useAuthStore((s) => s.setSellerStatus)
  const { mutate: submitApplication, isPending } =
    useSubmitStoreApplicationMutation()

  const allRequiredFilled =
    storeFieldValues.every(isFieldFilled) &&
    !!profileImage &&
    !!agreeToServiceTerms &&
    !!agreeToPrivacyPolicy

  const handleAdvance = async () => {
    const valid = await trigger(STORE_INFO_FIELDS)
    if (!valid) return

    const values = getValues()

    if (!values.profileImage) {
      const msg = REGISTER_TOAST_MESSAGES.PROFILE_IMAGE_TYPE_INVALID
      toast.error('스토어 프로필을 업로드해주세요')
      return
    }

    if (!values.agreeToServiceTerms || !values.agreeToPrivacyPolicy) {
      toast.error('필수 약관에 동의해주세요')
      return
    }

    submitApplication(
      {
        request: {
          storeName: values.storeName,
          introduce: values.introduce,
          phoneNumber: values.phoneNumber,
          subPhoneNumber: values.subPhoneNumber || null,
          email: `${values.emailLocal}@${values.emailDomain}`,
          originAddress: `(${values.postalCode}) ${values.originAddress}`,
          originAddressDetail: values.originAddressDetail,
          storeId: values.storeId,
        },
        profileImage: values.profileImage,
      },
      {
        onSuccess: () => {
          setSellerStatus('PENDING')
          navigate(ROUTES.REGISTER.COMPLETE, { replace: true })
        },
        onError: (err) => {
          const serverMessage =
            isAxiosError(err) && typeof err.response?.data?.message === 'string'
              ? err.response.data.message
              : undefined
          if (serverMessage) {
            toast.error(serverMessage)
          } else {
            const msg = REGISTER_TOAST_MESSAGES.STORE_APPLICATION_ERROR
            toast.error(msg.title, msg.description)
          }
        },
      },
    )
  }

  // TODO: 수정하기 버튼 동작 기획 미정 — 정의되면 구현
  const handleEdit = () => {}

  return (
    <>
      <StoreInfo />
      <TermsAgreement />
      <RegisterStepFooter
        onNext={handleAdvance}
        onPrev={handleEdit}
        nextDisabled={!allRequiredFilled || isPending}
      />
    </>
  )
}

export default StoreInfoPage
