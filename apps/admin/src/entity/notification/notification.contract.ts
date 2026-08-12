import { z } from 'zod'

export const AdminNotificationSearchResponseSchema = z.object({
  title: z.string(),
  createAt: z.string(),
  modifiedAt: z.string(),
})

export const AdminNotificationDetailResponseSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  content: z.string(),
  imageLinks: z.array(z.string()),
  createAt: z.string(),
  modifiedAt: z.string(),
})

export const AdminNotificationListResultSchema = z.object({
  content: z.array(AdminNotificationSearchResponseSchema),
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

export const AdminNotificationListResponseSchema = z.discriminatedUnion(
  'success',
  [
    BaseResponseSchema.extend({
      success: z.literal(true),
      result: AdminNotificationListResultSchema,
    }),
    BaseResponseSchema.extend({
      success: z.literal(false),
      result: z.null().optional(),
    }),
  ],
)

export const GetAdminNotificationsParamsSchema = z.object({
  page: z.number().int().nonnegative().optional(),
  size: z.number().int().positive().max(100).optional(),
  sort: z.string().optional(),
})

export const DeleteAdminNotificationsRequestSchema = z.array(
  z.number().int().positive(),
)

export const FailedNotificationSchema = z.object({
  id: z.number().int(),
  title: z.string(),
})

export const DeleteAdminNotificationsResultSchema = z.object({
  successCount: z.number().int().nonnegative(),
  failureCount: z.number().int().nonnegative(),
  failedNotices: z.array(FailedNotificationSchema),
})

export const AdminNotificationDeleteResponseSchema = z.discriminatedUnion(
  'success',
  [
    BaseResponseSchema.extend({
      success: z.literal(true),
      result: DeleteAdminNotificationsResultSchema,
    }),
    BaseResponseSchema.extend({
      success: z.literal(false),
      result: z.null().optional(),
    }),
  ],
)

export const UpsertAdminNotificationRequestSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
  profileImage: z.array(z.instanceof(File)).optional(),
})

export const AdminNotificationCreateResponseSchema = z.discriminatedUnion(
  'success',
  [
    BaseResponseSchema.extend({
      success: z.literal(true),
      result: AdminNotificationDetailResponseSchema,
    }),
    BaseResponseSchema.extend({
      success: z.literal(false),
      result: z.null().optional(),
    }),
  ],
)

export const AdminNotificationUpdateResponseSchema = z.discriminatedUnion(
  'success',
  [
    BaseResponseSchema.extend({
      success: z.literal(true),
      result: AdminNotificationDetailResponseSchema,
    }),
    BaseResponseSchema.extend({
      success: z.literal(false),
      result: z.null().optional(),
    }),
  ],
)
