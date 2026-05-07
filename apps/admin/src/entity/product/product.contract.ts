import { z } from 'zod'

export const UploadApprovalSchema = z.object({
  boardId: z.number().int().positive(),
  storeName: z.string(),
  boardTitle: z.string(),
})

export const UploadApprovalListResultSchema = z.object({
  content: z.array(UploadApprovalSchema),
  page: z.number().int().nonnegative(),
  size: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  totalElements: z.number().int().nonnegative(),
})

const BaseResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  fieldErrors: z
    .array(z.object({ field: z.string(), msg: z.string() }))
    .optional(),
})

export const UploadApprovalListResponseSchema = z.discriminatedUnion(
  'success',
  [
    BaseResponseSchema.extend({
      success: z.literal(true),
      result: UploadApprovalListResultSchema,
    }),
    BaseResponseSchema.extend({
      success: z.literal(false),
      result: z.null().optional(),
    }),
  ],
)

export const GetUploadApprovalsRequestParamsSchema = z.object({
  page: z.number().int().nonnegative().optional(),
  size: z.number().int().positive().optional(),
  sort: z.array(z.string()).optional(),
})

export const RejectCategorySchema = z.enum(
  [
    'ADMIN_JUDGMENT',
    'INAPPROPRIATE_BRAND_NAME',
    'OFFICIAL_MATERIAL_CONFUSION',
    'INAPPROPRIATE_EXPRESSION',
    'PROHIBITED_STORE_EXPRESSION',
    'CONTAINS_ADVERTISING',
    'CONTAINS_CONTACT_INFO',
    'CONTAINS_COMPETITOR_NAME',
    'DIRECT_INPUT',
  ],
  { error: '거절 카테고리를 선택해주세요.' },
)

export const REJECT_CATEGORY_LABELS: Record<
  z.infer<typeof RejectCategorySchema>,
  string
> = {
  ADMIN_JUDGMENT: '관리자 판단 부적합',
  INAPPROPRIATE_BRAND_NAME: '브랜드명 무단사용',
  OFFICIAL_MATERIAL_CONFUSION: '공식물 오인 가능',
  INAPPROPRIATE_EXPRESSION: '비속어/부적절한 표현',
  PROHIBITED_STORE_EXPRESSION: '상품명/카테고리명 포함',
  CONTAINS_ADVERTISING: '광고성 문구 포함',
  CONTAINS_CONTACT_INFO: '연락처/URL 포함',
  CONTAINS_COMPETITOR_NAME: '타 판매자명 유사',
  DIRECT_INPUT: '직접입력',
}

export const RejectBodySchema = z.object({
  rejectCategory: RejectCategorySchema,
  rejectReason: z
    .string()
    .trim()
    .min(1, '거절 사유를 입력해주세요.')
    .max(500, '거절 사유는 500자 이하로 입력해주세요.'),
})

export const DecideUploadApprovalRequestSchema = z.discriminatedUnion(
  'decisionType',
  [
    z.object({ decisionType: z.literal('APPROVE') }),
    RejectBodySchema.extend({ decisionType: z.literal('REJECT') }),
  ],
)

export const DecideUploadApprovalResponseSchema = BaseResponseSchema.extend({
  success: z.boolean(),
  result: z.null().optional(),
})
