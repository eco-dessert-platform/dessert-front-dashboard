import { z } from 'zod'

export const UploadApprovalSchema = z.object({
  boardId: z.number(),
  storeName: z.string(),
  boardTitle: z.string(),
})

export const UploadApprovalListResultSchema = z.object({
  content: z.array(UploadApprovalSchema),
  page: z.number(),
  size: z.number(),
  totalPages: z.number(),
  totalElements: z.number(),
})

export const UploadApprovalListResponseSchema = z.object({
  success: z.boolean(),
  code: z.number(),
  message: z.string(),
  fieldErrors: z
    .array(z.object({ field: z.string(), msg: z.string() }))
    .optional(),
  result: UploadApprovalListResultSchema,
})

export const GetUploadApprovalsRequestParamsSchema = z.object({
  page: z.number().optional(),
  size: z.number().optional(),
  sort: z.array(z.string()).optional(),
})
