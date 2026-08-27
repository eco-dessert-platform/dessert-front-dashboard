import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { useNoticeDetailQuery } from '@/entity/home-page/notice'
import {
  NoticeForm,
  useUpdateNoticeMutation,
} from '@/features/home-page/notice'
import type { NoticeSubmitValues } from '@/features/home-page/notice'
import { ROUTES } from '@/shared/constant'

export function NoticeEditPage() {
  const navigate = useNavigate()
  const { noticeId } = useParams()
  const parsedNoticeId = Number(noticeId)
  const isValidNoticeId = Number.isInteger(parsedNoticeId) && parsedNoticeId > 0

  const {
    data: notice,
    isError,
    isLoading,
  } = useNoticeDetailQuery({
    variables: { noticeId: parsedNoticeId },
    enabled: isValidNoticeId,
    retry: false,
  })
  const { mutate: editNotice, isPending } = useUpdateNoticeMutation()

  if (!isValidNoticeId || isError) {
    return <Navigate to={ROUTES.HOMEPAGE.NOTICE} replace />
  }

  const handleSubmit = ({ title, content, images }: NoticeSubmitValues) => {
    editNotice(
      { noticeId: parsedNoticeId, request: { title, content }, images },
      { onSuccess: () => navigate(ROUTES.HOMEPAGE.NOTICE) },
    )
  }

  // 에디터가 마운트 이후 바뀐 값을 반영하지 않아, 조회가 끝난 뒤에 폼을 그린다
  if (isLoading || !notice) {
    return (
      <p className="py-40 text-center typo-title-16-r text-gray-500">
        불러오는 중입니다
      </p>
    )
  }

  return (
    <NoticeForm
      heading="공지사항 수정"
      submitTitle="등록"
      defaultValues={{ title: notice.title, content: notice.content }}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  )
}
