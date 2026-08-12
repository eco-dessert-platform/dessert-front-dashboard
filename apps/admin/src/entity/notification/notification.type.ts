import type {
  AdminNotificationDetailResponseSchema,
  AdminNotificationListResultSchema,
  AdminNotificationSearchResponseSchema,
  DeleteAdminNotificationsRequestSchema,
  DeleteAdminNotificationsResultSchema,
  FailedNotificationSchema,
  GetAdminNotificationsParamsSchema,
  UpsertAdminNotificationRequestSchema,
} from './notification.contract'
import type { z } from 'zod'

export type AdminNotificationSearchResponse = z.infer<
  typeof AdminNotificationSearchResponseSchema
>

export type AdminNotificationDetailResponse = z.infer<
  typeof AdminNotificationDetailResponseSchema
>

export type AdminNotificationListResult = z.infer<
  typeof AdminNotificationListResultSchema
>

export type GetAdminNotificationsParams = z.infer<
  typeof GetAdminNotificationsParamsSchema
>

export type DeleteAdminNotificationsRequest = z.infer<
  typeof DeleteAdminNotificationsRequestSchema
>

export type FailedNotification = z.infer<typeof FailedNotificationSchema>

export type DeleteAdminNotificationsResult = z.infer<
  typeof DeleteAdminNotificationsResultSchema
>

export type UpsertAdminNotificationRequest = z.infer<
  typeof UpsertAdminNotificationRequestSchema
>

export type CreateAdminNotificationVariables = {
  adminId: number
  body: UpsertAdminNotificationRequest
}

export type UpdateAdminNotificationVariables = {
  noticeId: number
  body: UpsertAdminNotificationRequest
}
