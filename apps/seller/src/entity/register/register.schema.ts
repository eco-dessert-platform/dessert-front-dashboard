import { z } from 'zod'

export const verificationSchema = z.object({
  businessLicense: z.instanceof(File, {
    error: '사업자 등록증을 업로드해주세요',
  }),
  mailOrderCert: z.instanceof(File, {
    error: '통신판매업 신고증을 업로드해주세요',
  }),
  foodBusinessCert: z.instanceof(File, {
    error: '즉석식품제조가공업 서류를 업로드해주세요',
  }),
  bankbook: z.instanceof(File, {
    error: '통장사본을 업로드해주세요',
  }),
  bank: z.string().min(1, '은행을 선택해주세요'),
  accountNumber: z.string().min(1, '계좌번호를 입력해주세요'),
  accountVerificationId: z.number().nullable(),
})

export const storeInfoSchema = z.object({
  storeName: z.string().min(1, '스토어명을 선택해주세요'),
  storeId: z.number().nullable(),
  introduce: z.string().min(1, '한줄소개를 입력해주세요'),
  phoneNumber: z.string().min(1, '연락처를 입력해주세요'),
  subPhoneNumber: z.string(),
  emailLocal: z.string().min(1, '이메일을 입력해주세요'),
  emailDomain: z.string().min(1, '이메일 도메인을 선택해주세요'),
  postalCode: z.string().min(1, '우편번호를 검색해주세요'),
  originAddress: z.string().min(1, '주소를 입력해주세요'),
  originAddressDetail: z.string().min(1, '상세주소를 입력해주세요'),
  profileImage: z.instanceof(File).nullable(),
  agreeToServiceTerms: z.boolean(),
  agreeToPrivacyPolicy: z.boolean(),
})

export const registerSchema = verificationSchema.extend(storeInfoSchema.shape)

export type RegisterForm = z.infer<typeof registerSchema>

export const VERIFICATION_FIELDS = [
  'businessLicense',
  'mailOrderCert',
  'foodBusinessCert',
  'bankbook',
  'bank',
  'accountNumber',
] as const satisfies readonly (keyof RegisterForm)[]

export const STORE_INFO_FIELDS = [
  'storeName',
  'introduce',
  'phoneNumber',
  'emailLocal',
  'emailDomain',
  'postalCode',
  'originAddress',
  'originAddressDetail',
] as const satisfies readonly (keyof RegisterForm)[]
