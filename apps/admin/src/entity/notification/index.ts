export {
  createAdminNotification,
  deleteAdminNotifications,
  getAdminNotifications,
  updateAdminNotification,
} from './notification.api'
export {
  notificationQueries,
  useCreateAdminNotificationMutation,
  useDeleteAdminNotificationsMutation,
  useAdminNotificationsQuery,
  useUpdateAdminNotificationMutation,
} from './notification.query'
export type {
  AdminNotificationDetailResponse,
  AdminNotificationListResult,
  AdminNotificationSearchResponse,
  CreateAdminNotificationVariables,
  DeleteAdminNotificationsRequest,
  DeleteAdminNotificationsResult,
  FailedNotification,
  GetAdminNotificationsParams,
  UpdateAdminNotificationVariables,
  UpsertAdminNotificationRequest,
} from './notification.type'
