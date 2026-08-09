import { z } from 'zod'

export const SellerStoreDtoSchema = z.object({
  storeName: z.string(),
  phone: z.string(),
  subPhone: z.string().nullish(),
  email: z.string(),
  originAddressLine: z.string(),
  originAddressDetail: z.string(),
})

export const SellerDtoSchema = z.object({
  sellerId: z.number().int(),
  bankCode: z.string(),
  accountHolder: z.string(),
  accountNumber: z.string().nullish(),
  createdAt: z.string(),
})

export const AdminSellerApplicationSchema = z.object({
  storeApplicationId: z.number().int(),
  sellerStoreDTO: SellerStoreDtoSchema,
  sellerDTO: SellerDtoSchema,
})

export const MemberApprovalListResultSchema = z.object({
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

export const MemberApprovalListResponseSchema = z.discriminatedUnion(
  'success',
  [
    BaseResponseSchema.extend({
      success: z.literal(true),
      result: MemberApprovalListResultSchema,
    }),
    BaseResponseSchema.extend({
      success: z.literal(false),
      result: z.null().optional(),
    }),
  ],
)

export const ApproveSellerItemSchema = z.object({
  applicationId: z.number().int().positive(),
  sellerName: z.string().min(1),
  identifier: z.string().min(1),
})

export const ApproveSellersRequestSchema = z.array(ApproveSellerItemSchema)

export const ApproveSuccessDetailSchema = z.object({
  storeApplicationId: z.number().int(),
  storeApplicationStatus: z.string(),
  storeDTO: z
    .object({
      storeId: z.number().int(),
      storeName: z.string(),
      introduce: z.string().nullish(),
      profile: z.string().nullish(),
      phone: z.string(),
      subPhone: z.string().nullish(),
      email: z.string(),
      originAddressLine: z.string().nullish(),
      originAddressDetail: z.string().nullish(),
    })
    .optional(),
  sellerDTO: z
    .object({
      sellerId: z.number().int(),
      sellerName: z.string(),
      sellerStatus: z.string(),
    })
    .optional(),
})

export const ApproveFailDetailSchema = z.object({
  storeApplicationId: z.number().int(),
  reason: z.string(),
})

export const ApproveSellersResultSchema = z.object({
  successDetails: z.array(ApproveSuccessDetailSchema),
  failDetails: z.array(ApproveFailDetailSchema),
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

export const GetMemberApprovalsParamsSchema = z.object({
  page: z.number().int().positive().optional(),
})
