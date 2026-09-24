import { z } from 'zod'

import type {
  CreateAdminStoreRequest,
  StoreRegistration,
  UpdateAdminStoreRequest,
} from '@/entity/store/registration'

export const CUSTOM_EMAIL_DOMAIN = 'custom'

export const EMAIL_DOMAIN_OPTIONS = [
  { label: '직접 입력', value: CUSTOM_EMAIL_DOMAIN },
  { label: 'naver.com', value: 'naver.com' },
  { label: 'gmail.com', value: 'gmail.com' },
  { label: 'daum.net', value: 'daum.net' },
  { label: 'hanmail.net', value: 'hanmail.net' },
]

export const PRESET_EMAIL_DOMAINS = EMAIL_DOMAIN_OPTIONS.filter(
  (option) => option.value !== CUSTOM_EMAIL_DOMAIN,
).map((option) => option.value)

const PROFILE_IMAGE_MAX_SIZE = 10 * 1024 * 1024
const PROFILE_IMAGE_TYPES = ['image/jpeg', 'image/png']
const BUSINESS_NUMBER_PATTERN = /^(?:\d{10}|\d{3}-\d{2}-\d{5})$/
const EMAIL_LOCAL_PATTERN = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/
const EMAIL_DOMAIN_PATTERN =
  /^(?=.{1,253}$)(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/
const PROFILE_IMAGE_ERROR_MESSAGE =
  'jpg, jpeg, png 형식의 10MB 이하 이미지를 등록해주세요'

export const normalizeDigits = (value: string) => value.replace(/\D/g, '')

const isValidProfileImage = (value: unknown) =>
  typeof File !== 'undefined' &&
  value instanceof File &&
  PROFILE_IMAGE_TYPES.includes(value.type) &&
  value.size <= PROFILE_IMAGE_MAX_SIZE

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

const profileImageSchema = z.custom<File | null>(
  isValidProfileImage,
  PROFILE_IMAGE_ERROR_MESSAGE,
)

const optionalProfileImageSchema = z.custom<File | null>(
  (value) => value === null || isValidProfileImage(value),
  PROFILE_IMAGE_ERROR_MESSAGE,
)

const businessNumberSchema = z
  .string()
  .trim()
  .min(1, '사업자등록번호를 입력해주세요')
  .regex(BUSINESS_NUMBER_PATTERN, '사업자등록번호는 10자리 숫자로 입력해주세요')
  .refine(isValidBusinessNumber, '유효하지 않은 사업자등록번호입니다')
  .transform(normalizeDigits)

const createBaseStoreRegistrationFormSchema = (
  profileSchema: typeof profileImageSchema | typeof optionalProfileImageSchema,
) =>
  z
    .object({
      profileImage: profileSchema,
      storeName: z
        .string()
        .trim()
        .min(3, '스토어명은 3자 이상 입력해주세요')
        .max(50, '스토어명은 50자 이하로 입력해주세요'),
      identifier: businessNumberSchema,
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
      emailLocal: z
        .string()
        .trim()
        .min(1, '이메일을 입력해주세요')
        .regex(EMAIL_LOCAL_PATTERN, '이메일 형식이 올바르지 않습니다'),
      emailDomain: z
        .string()
        .trim()
        .min(1, '이메일 도메인을 선택해주세요')
        .regex(EMAIL_DOMAIN_PATTERN, '이메일 도메인 형식이 올바르지 않습니다'),
      postalCode: z.string().trim(),
      originAddress: z.string().trim().min(1, '출고지 주소를 입력해주세요'),
      originAddressDetail: z
        .string()
        .trim()
        .min(1, '출고지 상세주소를 입력해주세요')
        .max(50, '출고지 상세주소는 50자 이하로 입력해주세요'),
    })
    .superRefine(({ emailLocal, emailDomain }, context) => {
      if (!emailLocal || !emailDomain) return

      const email = `${emailLocal}@${emailDomain}`

      if (!z.email().safeParse(email).success) {
        context.addIssue({
          code: 'custom',
          path: ['emailLocal'],
          message: '유효한 이메일 주소를 입력해주세요',
        })
      }
    })

const optionalProfileStoreRegistrationFormSchema =
  createBaseStoreRegistrationFormSchema(optionalProfileImageSchema)

export const createStoreRegistrationFormSchema =
  createBaseStoreRegistrationFormSchema(profileImageSchema)

export const updateStoreRegistrationFormSchema =
  optionalProfileStoreRegistrationFormSchema

export type StoreRegistrationFormValues = z.input<
  typeof optionalProfileStoreRegistrationFormSchema
>

export const DEFAULT_STORE_REGISTRATION_FORM_VALUES: StoreRegistrationFormValues =
  {
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

const getOriginAddress = ({
  postalCode,
  originAddress,
}: Pick<StoreRegistrationFormValues, 'postalCode' | 'originAddress'>) => {
  if (!postalCode) return originAddress.trim()

  return `(${postalCode.trim()}) ${originAddress.trim()}`
}

const getEmailParts = (email: string) => {
  const [emailLocal = '', ...domainParts] = email.split('@')

  return {
    emailLocal,
    emailDomain: domainParts.join('@'),
  }
}

const getAddressParts = (originAddress: string) => {
  const trimmedAddress = originAddress.trim()
  const matched = trimmedAddress.match(/^\((\d{5})\)\s*(.*)$/)

  if (!matched) {
    return {
      postalCode: '',
      originAddress: trimmedAddress,
    }
  }

  return {
    postalCode: matched[1],
    originAddress: matched[2],
  }
}

export const toStoreRegistrationFormValues = (
  store: StoreRegistration,
): StoreRegistrationFormValues => {
  const { emailLocal, emailDomain } = getEmailParts(store.email)
  const { postalCode, originAddress } = getAddressParts(store.baseAddress)

  return {
    profileImage: null,
    storeName: store.storeName,
    identifier: normalizeDigits(store.businessNumber),
    introduce: store.introduction,
    phoneNumber: normalizeDigits(store.phone),
    subPhoneNumber: normalizeDigits(store.subPhoneNumber),
    emailLocal,
    emailDomain,
    postalCode,
    originAddress,
    originAddressDetail: store.detailAddress,
  }
}

export const toStoreDetailRequest = (
  values: StoreRegistrationFormValues,
): CreateAdminStoreRequest & UpdateAdminStoreRequest => ({
  storeName: values.storeName.trim(),
  identifier: normalizeDigits(values.identifier),
  introduce: values.introduce.trim(),
  phoneNumber: normalizeDigits(values.phoneNumber),
  subPhoneNumber: normalizeDigits(values.subPhoneNumber) || null,
  email: `${values.emailLocal.trim()}@${values.emailDomain.trim()}`,
  originAddress: getOriginAddress(values),
  originAddressDetail: values.originAddressDetail.trim(),
})
