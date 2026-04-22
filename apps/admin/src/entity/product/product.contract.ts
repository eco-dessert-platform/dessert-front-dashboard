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
