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

export const RejectCategorySchema = z.enum([
  'ADMIN_JUDGMENT',
  'INAPPROPRIATE_BRAND_NAME',
  'INVALID_PRICE_CONDITION',
  'INAPPROPRIATE_VEGAN_EXPRESSION',
  'PROHIBITED_STORE_EXPRESSION',
  'PROHIBITED_LOGO_TEXT',
  'CONTAINS_CONTACT_INFO',
  'CONTAINS_COMPETITOR_NAME',
  'DIRECT_INPUT',
])

export const RejectBodySchema = z.object({
  rejectCategory: RejectCategorySchema,
  rejectReason: z.string().trim().min(1).max(500),
})

export const DecideUploadApprovalRequestSchema = z.discriminatedUnion(
  'decisionType',
  [
    z.object({ decisionType: z.literal('APPROVE') }),
    RejectBodySchema.extend({ decisionType: z.literal('REJECT') }),
  ],
)

export const DecideUploadApprovalResponseSchema = z.discriminatedUnion(
  'success',
  [
    BaseResponseSchema.extend({
      success: z.literal(true),
      result: z.null().optional(),
    }),
    BaseResponseSchema.extend({
      success: z.literal(false),
      result: z.null().optional(),
    }),
  ],
)
