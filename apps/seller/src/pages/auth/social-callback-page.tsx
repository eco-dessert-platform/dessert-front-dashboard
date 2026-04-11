import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useIssueTokenMutation } from '@/entity/auth/auth-query'
import { ROUTES } from '@/shared/constant/routes'

const ERROR_MESSAGES: Record<string, string> = {
  NOT_SUPPORTED_SERVER: '지원하지 않는 서버입니다.',
  INTERNAL_SERVER_ERROR: '서버 오류가 발생했습니다.',
}

const SocialCallbackPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const issueTokenMutation = useIssueTokenMutation()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const generateToken = searchParams.get('generateToken')
    const error = searchParams.get('error')

    if (error) {
      const message = ERROR_MESSAGES[error] ?? '로그인 중 오류가 발생했습니다.'
      toast.error(message)
      navigate(ROUTES.AUTH, { replace: true })
      return
    }

    if (generateToken) {
      issueTokenMutation.mutate(generateToken, {
        onSuccess: () => {
          navigate(ROUTES.PRODUCTS.ALL, { replace: true })
        },
        onError: () => {
          toast.error('로그인에 실패했습니다.')
          navigate(ROUTES.AUTH, { replace: true })
        },
      })
    }
  }, [])

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-500">로그인 처리 중</p>
    </div>
  )
}

export default SocialCallbackPage
