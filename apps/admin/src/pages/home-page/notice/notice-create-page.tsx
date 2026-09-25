import { toast } from '@dessert/ui'
import { useNavigate } from 'react-router-dom'

import { getAdminIdFromToken } from '@/entity/auth'
import {
  NoticeForm,
  useCreateNoticeMutation,
} from '@/features/home-page/notice'
import type { NoticeSubmitValues } from '@/features/home-page/notice'
import { ROUTES } from '@/shared/constant'


export function NoticeCreatePage() {
  const navigate = useNavigate()
  const { mutate: addNotice, isPending } = useCreateNoticeMutation()

  const handleSubmit = ({ title, content, images }: NoticeSubmitValues) => {
    const adminId = getAdminIdFromToken()

    if (adminId === null) {
      toast.error('공지사항을 등록할 수 없어요', '다시 로그인해 주세요')
      return
    }

    addNotice(
      { adminId, request: { title, content }, images },
      { onSuccess: () => navigate(ROUTES.HOMEPAGE.NOTICE) },
    )
  }

  return (
    <NoticeForm
      heading="공지사항 등록"
      submitTitle="등록"
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  )
}
