import { createQueryKeys } from '@lukemorales/query-key-factory'
import { createMutation, createQuery } from 'react-query-kit'

import {
  createAdminNotification,
  deleteAdminNotifications,
  getAdminNotifications,
  updateAdminNotification,
} from './notification.api'

import type {
  AdminNotificationDetailResponse,
  AdminNotificationListResult,
  CreateAdminNotificationVariables,
  DeleteAdminNotificationsRequest,
  DeleteAdminNotificationsResult,
  GetAdminNotificationsParams,
  UpdateAdminNotificationVariables,
} from './notification.type'

export const notificationQueries = createQueryKeys('notifications', {
  list: null,
})

export const useAdminNotificationsQuery = createQuery<
  AdminNotificationListResult,
  GetAdminNotificationsParams
>({
  queryKey: notificationQueries.list.queryKey,
  fetcher: (variables = {}) => getAdminNotifications(variables),
})

export const useDeleteAdminNotificationsMutation = createMutation<
  DeleteAdminNotificationsResult,
  DeleteAdminNotificationsRequest
>({
  mutationKey: [...notificationQueries._def, 'delete'],
  mutationFn: deleteAdminNotifications,
})

export const useCreateAdminNotificationMutation = createMutation<
  AdminNotificationDetailResponse,
  CreateAdminNotificationVariables
>({
  mutationKey: [...notificationQueries._def, 'create'],
  mutationFn: createAdminNotification,
})

export const useUpdateAdminNotificationMutation = createMutation<
  AdminNotificationDetailResponse,
  UpdateAdminNotificationVariables
>({
  mutationKey: [...notificationQueries._def, 'update'],
  mutationFn: updateAdminNotification,
})
