import { z } from 'zod'

export const SellerStoreSchema = z.object({
  storeName: z.string(),
  phone: z.string(),
  subPhone: z.string(),
  email: z.string(),
  originAddressLine: z.string(),
  originAddressDetail: z.string(),
})

export const SellerSchema = z.object({
  sellerId: z.number().int(),
  sellerName: z.string(),
  // 백엔드 enum 전체 값이 확정되지 않아 string으로 둠 (PENDING/APPROVED/REJECTED 등)
  sellerStatus: z.string(),
})

export const AdminSellerApplicationSchema = z.object({
  storeApplicationId: z.number().int(),
  sellerStoreDTO: SellerStoreSchema,
  sellerDTO: SellerSchema,
})

export const AdminSellerListResultSchema = z.object({
  adminSellerApplicationList: z.array(AdminSellerApplicationSchema),
  totalElements: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
  hasPrevious: z.boolean(),
  hasNext: z.boolean(),
})

const BaseResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  fieldErrors: z
    .array(z.object({ field: z.string(), msg: z.string() }))
    .optional(),
})

export const AdminSellerListResponseSchema = z.discriminatedUnion('success', [
  BaseResponseSchema.extend({
    success: z.literal(true),
    result: AdminSellerListResultSchema,
  }),
  BaseResponseSchema.extend({
    success: z.literal(false),
    result: z.null().optional(),
  }),
])

export const GetAdminSellersRequestParamsSchema = z.object({
  page: z.number().int().positive().optional(),
})

export const ApproveSellerItemSchema = z.object({
  applicationId: z.number().int(),
  sellerName: z.string(),
  identifier: z.string(),
})

export const ApproveSellersRequestSchema = z.array(ApproveSellerItemSchema)

// 승인/거절 응답에서 실패 항목 구조는 동일 (둘 다 공유)
export const FailDetailSchema = z.object({
  storeApplicationId: z.number().int(),
  reason: z.string(),
})

// 응답에서 실제 사용하는 필드만 파싱 (storeDTO/sellerDTO 등 부가 정보는 무시)
export const ApproveSuccessDetailSchema = z.object({
  storeApplicationId: z.number().int(),
  storeApplicationStatus: z.string(),
})

export const ApproveSellersResultSchema = z.object({
  successDetails: z.array(ApproveSuccessDetailSchema),
  failDetails: z.array(FailDetailSchema),
})

export const ApproveSellersResponseSchema = z.discriminatedUnion('success', [
  BaseResponseSchema.extend({
    success: z.literal(true),
    result: ApproveSellersResultSchema,
  }),
  BaseResponseSchema.extend({
    success: z.literal(false),
    result: z.null().optional(),
  }),
])

export const RejectSellersRequestSchema = z.object({
  applicationIds: z.array(z.number().int()),
})

export const RejectSellersResultSchema = z.object({
  successIds: z.array(z.number().int()),
  failDetails: z.array(FailDetailSchema),
})

export const RejectSellersResponseSchema = z.discriminatedUnion('success', [
  BaseResponseSchema.extend({
    success: z.literal(true),
    result: RejectSellersResultSchema,
  }),
  BaseResponseSchema.extend({
    success: z.literal(false),
    result: z.null().optional(),
  }),
])
