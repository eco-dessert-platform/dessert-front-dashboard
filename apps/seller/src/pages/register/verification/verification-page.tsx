import { toast } from '@dessert/ui'
import { useFormContext, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { RegisterForm, VERIFICATION_FIELDS } from '@/entity/register'
import {
  AccountVerification,
  DocumentUpload,
  REGISTER_TOAST_MESSAGES,
  RegisterStepFooter,
 useRegisterDocumentsMutation } from '@/features/register'
import { ROUTES } from '@/shared/constant/routes'

const FILE_FIELDS = [
  'businessLicense',
  'mailOrderCert',
  'foodBusinessCert',
  'bankbook',
] as const satisfies readonly (keyof RegisterForm)[]

const isFieldFilled = (value: unknown) => {
  if (value === undefined || value === null) return false
  if (typeof value === 'string') return value.trim().length > 0
  return true
}

const VerificationPage = () => {
  const { control, trigger, getValues } = useFormContext<RegisterForm>()
  const navigate = useNavigate()
  const { mutate: registerDocs, isPending } = useRegisterDocumentsMutation()

  const watched = useWatch({ control, name: VERIFICATION_FIELDS })
  const accountVerificationId = useWatch({
    control,
    name: 'accountVerificationId',
  })
  const hasAnyInput = watched.some(isFieldFilled)
  const isAllFilled = watched.every(isFieldFilled)
  const canAdvance = isAllFilled && accountVerificationId != null

  const handleAdvance = async () => {
    const valid = await trigger(VERIFICATION_FIELDS)

    if (!valid) {
      const values = getValues()
      const hasMissingFile = FILE_FIELDS.some((field) => !values[field])
      if (hasMissingFile) {
        const msg = REGISTER_TOAST_MESSAGES.FILE_UPLOAD_MISSING
        toast.error(msg.title, msg.description)
      }
      return
    }

    const {
      businessLicense,
      mailOrderCert,
      foodBusinessCert,
      bankbook,
      accountVerificationId,
    } = getValues()

    if (!accountVerificationId) {
      const msg = REGISTER_TOAST_MESSAGES.ACCOUNT_VERIFY_REQUIRED
      toast.error(msg.title, msg.description)
      return
    }

    registerDocs(
      {
        businessLicense,
        mailOrderLicense: mailOrderCert,
        foodManufactureLicense: foodBusinessCert,
        bankbookCopy: bankbook,
        accountVerificationId,
      },
      {
        onSuccess: () => navigate(ROUTES.REGISTER.STORE_INFO),
      },
    )
  }

  // TODO: 수정하기 버튼 동작 기획 미정 — 정의되면 구현
  const handleEdit = () => {}

  return (
    <>
      <DocumentUpload />
      <AccountVerification />
      <RegisterStepFooter
        onPrev={handleEdit}
        onNext={handleAdvance}
        prevDisabled={!hasAnyInput || isPending}
        nextDisabled={!canAdvance || isPending}
      />
    </>
  )
}

export default VerificationPage
