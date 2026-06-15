import { z } from 'zod'

export const storeNameSchema = z.object({
  storeName: z
    .string()
    .min(3, '스토어명은 3~50자 이내로 입력해주세요.')
    .max(50, '스토어명은 3~50자 이내로 입력해주세요.'),
})

export type StoreNameFormValues = z.infer<typeof storeNameSchema>

export const storeAccountInfoSchema = z.object({
  bankCode: z.string().min(1, '은행명을 입력해주세요.'),
  accountHolder: z.string().min(1, '예금주를 입력해주세요.'),
  accountNumber: z.string().min(1, '계좌번호를 입력해주세요.'),
})

export type StoreAccountInfoFormValues = z.infer<typeof storeAccountInfoSchema>

export const storeDetailSchema = z
  .object({
    introduce: z.string().max(100, '100자 이내로 입력해주세요.'),
    phoneNumber: z.string().min(1, '연락처를 입력해주세요.'),
    subPhoneNumber: z.string().optional(),
    emailLocal: z.string().min(1, '이메일을 입력해주세요.'),
    emailDomain: z.string().min(1, '도메인을 선택해주세요.'),
    emailDomainSelection: z.string(),
    originAddress: z.string().min(1, '주소를 입력해주세요.'),
    originAddressDetail: z.string().min(1, '상세주소를 입력해주세요.'),
  })
  .superRefine(({ emailLocal, emailDomain }, ctx) => {
    const combined = `${emailLocal}@${emailDomain}`
    if (!z.string().email().safeParse(combined).success) {
      ctx.addIssue({
        code: 'custom',
        message: '올바른 이메일 형식이 아니에요.',
        path: ['emailLocal'],
      })
    }
  })

export type StoreDetailFormValues = z.infer<typeof storeDetailSchema>
