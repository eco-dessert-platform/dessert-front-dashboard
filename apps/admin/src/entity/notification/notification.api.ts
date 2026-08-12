import { client } from '@/shared/utils'

import {
  AdminNotificationCreateResponseSchema,
  AdminNotificationDeleteResponseSchema,
  AdminNotificationListResponseSchema,
  AdminNotificationUpdateResponseSchema,
} from './notification.contract'

import type {
  AdminNotificationDetailResponse,
  AdminNotificationListResult,
  CreateAdminNotificationVariables,
  DeleteAdminNotificationsRequest,
  DeleteAdminNotificationsResult,
  GetAdminNotificationsParams,
  UpdateAdminNotificationVariables,
  UpsertAdminNotificationRequest,
} from './notification.type'

const createNotificationFormData = ({
  title,
  content,
  profileImage = [],
}: UpsertAdminNotificationRequest) => {
  const formData = new FormData()

  formData.append('title', title)
  formData.append('content', content)
  profileImage.forEach((file) => {
    formData.append('profileImage', file)
  })

  return formData
}

export const getAdminNotifications = async (
  params: GetAdminNotificationsParams = {},
): Promise<AdminNotificationListResult> => {
  const response = await client.get('/api/v1/admin/notifications', { params })
  const parsed = AdminNotificationListResponseSchema.parse(response.data)

  if (!parsed.success) throw new Error(parsed.message)

  return parsed.result
}

export const deleteAdminNotifications = async (
  noticeIds: DeleteAdminNotificationsRequest,
): Promise<DeleteAdminNotificationsResult> => {
  const response = await client.delete('/api/v1/admin/notifications', {
    data: noticeIds,
  })
  const parsed = AdminNotificationDeleteResponseSchema.parse(response.data)

  if (!parsed.success) throw new Error(parsed.message)

  return parsed.result
}

export const createAdminNotification = async ({
  adminId,
  body,
}: CreateAdminNotificationVariables): Promise<AdminNotificationDetailResponse> => {
  const response = await client.post(
    `/api/v1/admin/notifications/${adminId}/register`,
    createNotificationFormData(body),
    { headers: { 'Content-Type': undefined } },
  )
  const parsed = AdminNotificationCreateResponseSchema.parse(response.data)

  if (!parsed.success) throw new Error(parsed.message)

  return parsed.result
}

export const updateAdminNotification = async ({
  noticeId,
  body,
}: UpdateAdminNotificationVariables): Promise<AdminNotificationDetailResponse> => {
  const response = await client.put(
    `/api/v1/admin/notifications/${noticeId}`,
    createNotificationFormData(body),
    { headers: { 'Content-Type': undefined } },
  )
  const parsed = AdminNotificationUpdateResponseSchema.parse(response.data)

  if (!parsed.success) throw new Error(parsed.message)

  return parsed.result
}
