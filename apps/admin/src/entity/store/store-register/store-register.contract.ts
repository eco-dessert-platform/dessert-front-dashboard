import { z } from 'zod'

// 스토어 응답 객체 — 응답은 name 키를 사용 (요청 바디는 storeName 사용: 백엔드 키 불일치)
export const StoreSchema = z.object({
  storeId: z.number().int(),
  name: z.string(),
  identifier: z.string(),
  introduce: z.string(),
  profile: z.string(),
  phoneNumber: z.string(),
  subPhoneNumber: z.string(),
  email: z.string(),
  originAddress: z.string(),
  originAddressDetail: z.string(),
})

// 등록/수정 폼 입력값 (multipart의 request JSON 파트 = PATCH 요청 바디와 동일 필드)
export const StoreFormSchema = z.object({
  storeName: z.string().trim().min(1, '스토어명을 입력하세요.'),
  identifier: z.string().trim().min(1, '사업자등록번호를 입력하세요.'),
  introduce: z.string().trim().min(1, '스토어 소개를 입력하세요.'),
  phoneNumber: z.string().trim().min(1, '연락처를 입력하세요.'),
  subPhoneNumber: z.string().trim(),
  email: z.string().trim().email('올바른 이메일 형식이 아닙니다.'),
  originAddress: z.string().trim().min(1, '출고지 주소를 입력하세요.'),
  originAddressDetail: z.string().trim(),
})

const BaseResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  fieldErrors: z
    .array(z.object({ field: z.string(), msg: z.string() }))
    .optional(),
})

// 생성/수정 응답 — result에 스토어 객체
export const StoreMutationResponseSchema = z.discriminatedUnion('success', [
  BaseResponseSchema.extend({
    success: z.literal(true),
    result: StoreSchema,
  }),
  BaseResponseSchema.extend({
    success: z.literal(false),
    result: z.null().optional(),
  }),
])

// 삭제 응답 — result 없음, 성공 여부만
export const DeleteStoresResponseSchema = BaseResponseSchema.extend({
  success: z.boolean(),
})
