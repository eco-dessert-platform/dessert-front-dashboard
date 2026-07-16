import { z } from 'zod'

const BaseResponseSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  fieldErrors: z
    .array(z.object({ field: z.string(), msg: z.string() }))
    .optional(),
})

export const StoreNameChangeStatusSchema = z.enum([
  'PENDING',
  'REJECT',
  'APPROVE',
])

export const StoreNameChangeRejectCategorySchema = z.enum([
  'ADMIN_INAPPROPRIATE',
  'BRAND_NAME_MISUSE',
  'OFFICIAL_STORE_CONFUSION',
  'INAPPROPRIATE_LANGUAGE',
  'PRODUCT_CATEGORY_NAME',
  'CONTACT_INFO_INCLUDED',
  'ADVERTISING_PHRASE',
  'SIMILAR_TO_EXISTING_STORE',
  'ETC',
])

export const STORE_NAME_CHANGE_REJECT_CATEGORY_LABELS: Record<
  z.infer<typeof StoreNameChangeRejectCategorySchema>,
  string
> = {
  ADMIN_INAPPROPRIATE: '관리자 판단 부적합',
  BRAND_NAME_MISUSE: '브랜드명 무단 사용',
  OFFICIAL_STORE_CONFUSION: '공식몰 오인 가능',
  INAPPROPRIATE_LANGUAGE: '비속어/부적절한 표현',
  PRODUCT_CATEGORY_NAME: '상품명/카테고리명 포함',
  CONTACT_INFO_INCLUDED: '연락처/URL 포함',
  ADVERTISING_PHRASE: '광고성 문구 포함',
  SIMILAR_TO_EXISTING_STORE: '타 판매자명 유사',
  ETC: '직접입력',
}

export const UpdateStoreNameSchema = z.object({
  requestId: z.number().int(),
  storeId: z.number().int(),
  currentName: z.string(),
  newName: z.string(),
  createdAt: z.string(),
})

export const UpdateStoreNameRequestListResultSchema = z.object({
  updateStoreNames: z.array(UpdateStoreNameSchema),
  totalElements: z.number().int(),
  totalPages: z.number().int(),
  hasPrevious: z.boolean(),
  hasNext: z.boolean(),
})

export const UpdateStoreNameApproveResultSchema = z.object({
  storeId: z.number().int(),
  prevName: z.string(),
  updateName: z.string(),
  status: StoreNameChangeStatusSchema,
  modifiedAt: z.string(),
})

export const UpdateStoreNameRejectRequestSchema = z.object({
  category: StoreNameChangeRejectCategorySchema,
  rejectDetail: z.string().nullable(),
})

export const UpdateStoreNameRejectResultSchema = z.object({
  requestId: z.number().int(),
  storeId: z.number().int(),
  currentName: z.string(),
  newName: z.string(),
  status: StoreNameChangeStatusSchema,
  category: StoreNameChangeRejectCategorySchema,
  rejectDetail: z.string(),
})

export const GetUpdateStoreNameRequestsParamsSchema = z.object({
  page: z.number().int().positive().optional(),
})

export const UpdateStoreNameRequestListResponseSchema = z.discriminatedUnion(
  'success',
  [
    BaseResponseSchema.extend({
      success: z.literal(true),
      result: UpdateStoreNameRequestListResultSchema,
    }),
    BaseResponseSchema.extend({
      success: z.literal(false),
      result: z.null().optional(),
    }),
  ],
)

export const UpdateStoreNameApproveResponseSchema = z.discriminatedUnion(
  'success',
  [
    BaseResponseSchema.extend({
      success: z.literal(true),
      result: UpdateStoreNameApproveResultSchema,
    }),
    BaseResponseSchema.extend({
      success: z.literal(false),
      result: z.null().optional(),
    }),
  ],
)

export const UpdateStoreNameRejectResponseSchema = z.discriminatedUnion(
  'success',
  [
    BaseResponseSchema.extend({
      success: z.literal(true),
      result: UpdateStoreNameRejectResultSchema,
    }),
    BaseResponseSchema.extend({
      success: z.literal(false),
      result: z.null().optional(),
    }),
  ],
)
