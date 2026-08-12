import { toast } from '@dessert/ui'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import {
  notificationQueries,
  useCreateAdminNotificationMutation,
} from '@/entity/notification'
import {
  NoticeForm,
  getAdminIdFromAccessToken,
} from '@/features/notification/form'
import type { NoticeFormValues } from '@/features/notification/form'
import { ROUTES } from '@/shared/constant/routes'

const DEFAULT_VALUES: NoticeFormValues = {
  title: '',
  content: '',
  profileImage: [],
}

export function NoticeCreatePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutateAsync } = useCreateAdminNotificationMutation()

  const handleSubmit = async (values: NoticeFormValues) => {
    try {
      const adminId = getAdminIdFromAccessToken()

      await mutateAsync({
        adminId,
        body: values,
      })
      await queryClient.invalidateQueries({
        queryKey: notificationQueries.list.queryKey,
      })
      toast.success('공지사항을 등록했습니다.')
      navigate(ROUTES.HOMEPAGE.NOTICE)
    } catch (error) {
      toast.error(
        '공지사항 등록에 실패했습니다.',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      )
    }
  }

  return (
    <NoticeForm
      title="공지사항 등록"
      submitLabel="등록"
      defaultValues={DEFAULT_VALUES}
      onSubmit={handleSubmit}
    />
  )
}
