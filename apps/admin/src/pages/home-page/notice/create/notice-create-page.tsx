import { toast } from '@dessert/ui'
import { useNavigate } from 'react-router-dom'

import { NoticeForm } from '@/features/notification/form'
import type { NoticeFormValues } from '@/features/notification/form'
import { ROUTES } from '@/shared/constant/routes'

const DEFAULT_VALUES: NoticeFormValues = {
  title: '',
  content: '',
  profileImage: [],
}

export function NoticeCreatePage() {
  const navigate = useNavigate()

  const handleSubmit = () => {
    toast.success('공지사항 등록 화면이 준비되었습니다.')
    navigate(ROUTES.HOMEPAGE.NOTICE)
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
