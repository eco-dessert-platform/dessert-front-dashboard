import { z } from 'zod'

export const UpdateStoreNameSchema = z.object({
  requestId: z.number().int(),
  storeId: z.number().int(),
  currentName: z.string(),
  newName: z.string(),
  createdAt: z.string(),
})

export const UpdateStoreNameListResultSchema = z.object({
  updateStoreNames: z.array(UpdateStoreNameSchema),
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

export const UpdateStoreNameListResponseSchema = z.discriminatedUnion(
  'success',
  [
    BaseResponseSchema.extend({
      success: z.literal(true),
      result: UpdateStoreNameListResultSchema,
    }),
    BaseResponseSchema.extend({
      success: z.literal(false),
      result: z.null().optional(),
    }),
  ],
)

export const GetUpdateStoreNamesRequestParamsSchema = z.object({
  page: z.number().int().positive().optional(),
})

// 승인/거절은 requestId 단건 처리 — 응답에서 성공 여부만 확인 (result 구조는 사용하지 않음)
export const UpdateStoreNameMutationResponseSchema = BaseResponseSchema.extend({
  success: z.boolean(),
})
