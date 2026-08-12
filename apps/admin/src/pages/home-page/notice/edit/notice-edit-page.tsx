import { toast } from '@dessert/ui'
import { useQueryClient } from '@tanstack/react-query'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'

import {
  notificationQueries,
  useUpdateAdminNotificationMutation,
} from '@/entity/notification'
import { NoticeForm } from '@/features/notification/form'
import type { NoticeFormValues } from '@/features/notification/form'
import { ROUTES } from '@/shared/constant/routes'

type NoticeEditLocationState = {
  notice?: {
    noticeId: number
    title: string
    content: string
  }
}

export function NoticeEditPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const { noticeId } = useParams()
  const { mutateAsync } = useUpdateAdminNotificationMutation()
  const state = location.state as NoticeEditLocationState | null
  const notice = state?.notice
  const parsedNoticeId = Number(noticeId)

  if (
    !notice ||
    !Number.isInteger(parsedNoticeId) ||
    notice.noticeId !== parsedNoticeId
  ) {
    return <Navigate to={ROUTES.HOMEPAGE.NOTICE} replace />
  }

  const defaultValues: NoticeFormValues = {
    title: notice.title,
    content: notice.content,
    profileImage: [],
  }

  const handleSubmit = async (values: NoticeFormValues) => {
    try {
      await mutateAsync({
        noticeId: parsedNoticeId,
        body: values,
      })
      await queryClient.invalidateQueries({
        queryKey: notificationQueries.list.queryKey,
      })
      toast.success('공지사항을 수정했습니다.')
      navigate(ROUTES.HOMEPAGE.NOTICE)
    } catch (error) {
      toast.error(
        '공지사항 수정에 실패했습니다.',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      )
    }
  }

  return (
    <NoticeForm
      title="공지사항 수정"
      submitLabel="수정"
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  )
}
