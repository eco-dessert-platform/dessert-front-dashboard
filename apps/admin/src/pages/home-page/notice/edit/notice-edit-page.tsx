import { toast } from '@dessert/ui'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { NoticeForm } from '@/features/notification/form'
import type { NoticeFormValues } from '@/features/notification/form'
import { noticeManagementMockData } from '@/features/notification/management/notice-management.mock'
import { ROUTES } from '@/shared/constant/routes'

export function NoticeEditPage() {
  const navigate = useNavigate()
  const { noticeId } = useParams()
  const notice = noticeManagementMockData.find((item) => item.id === noticeId)

  if (!notice) {
    return <Navigate to={ROUTES.HOMEPAGE.NOTICE} replace />
  }

  const defaultValues: NoticeFormValues = {
    title: notice.title,
    content: notice.content,
    profileImage: [],
  }

  const handleSubmit = () => {
    toast.success('공지사항 수정 화면이 준비되었습니다.')
    navigate(ROUTES.HOMEPAGE.NOTICE)
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
