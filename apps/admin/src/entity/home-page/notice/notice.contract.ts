import { z } from 'zod'

const BaseResponseSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  fieldErrors: z
    .array(z.object({ field: z.string(), msg: z.string() }))
    .optional(),
})

export const NoticeListItemSchema = z.object({
  noticeId: z.number().int(),
  title: z.string(),
  createAt: z.string(),
  modifiedAt: z.string(),
})

export const NoticeListResultSchema = z.object({
  content: z.array(NoticeListItemSchema),
  page: z.number().int().nonnegative(),
  size: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  totalElements: z.number().int().nonnegative(),
})

export const NoticeListResponseSchema = BaseResponseSchema.extend({
  success: z.literal(true),
  result: NoticeListResultSchema,
}).or(BaseResponseSchema.extend({ success: z.literal(false) }))

export const NoticeDetailSchema = z.object({
  noticeId: z.number().int(),
  title: z.string(),
  content: z.string(),
  imageLinks: z.array(z.string()).default([]),
  createAt: z.string(),
  modifiedAt: z.string(),
})

export const NoticeDetailResponseSchema = BaseResponseSchema.extend({
  success: z.literal(true),
  result: NoticeDetailSchema,
}).or(BaseResponseSchema.extend({ success: z.literal(false) }))

/** 등록/수정 응답은 식별자 키가 noticeId 가 아니라 id 로 내려온다 */
export const NoticeMutationResultSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  content: z.string(),
  imageLinks: z.array(z.string()).default([]),
  createAt: z.string(),
  modifiedAt: z.string(),
})

export const NoticeMutationResponseSchema = BaseResponseSchema.extend({
  success: z.literal(true),
  result: NoticeMutationResultSchema,
}).or(BaseResponseSchema.extend({ success: z.literal(false) }))

export const DeleteNoticesResultSchema = z.object({
  successCount: z.number().int().nonnegative(),
  failureCount: z.number().int().nonnegative(),
  failedNotices: z
    .array(z.object({ id: z.number().int(), title: z.string() }))
    .default([]),
})

export const DeleteNoticesResponseSchema = BaseResponseSchema.extend({
  success: z.literal(true),
  result: DeleteNoticesResultSchema,
}).or(BaseResponseSchema.extend({ success: z.literal(false) }))
