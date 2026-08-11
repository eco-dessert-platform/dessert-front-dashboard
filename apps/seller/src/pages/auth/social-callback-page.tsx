import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getPostLoginPath } from '@/entity/auth'
import { useIssueTokenMutation } from '@/features/auth/login'
import { ROUTES } from '@/shared/constant/routes'

const ERROR_MESSAGES: Record<string, string> = {
  NOT_SUPPORTED_SERVER: '지원하지 않는 서버입니다.',
  INTERNAL_SERVER_ERROR: '서버 오류가 발생했습니다.',
}

const SocialCallbackPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const issueTokenMutation = useIssueTokenMutation()
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    const generateToken = searchParams.get('generateToken')
    const error = searchParams.get('error')

    if (error) {
      const message = ERROR_MESSAGES[error] ?? '로그인 중 오류가 발생했습니다.'
      toast.error(message)
      navigate(ROUTES.AUTH, { replace: true })
      return
    }

    if (!generateToken) {
      navigate(ROUTES.AUTH, { replace: true })
      return
    }

    issueTokenMutation.mutate(generateToken, {
      onSuccess: ({ result }) => {
        // 로그인 직후 추가 API 호출은 401 인터셉터와 리다이렉트 루프를 유발할 수 있어
        // 서버에서 내려준 status만으로 목적지 결정
        navigate(getPostLoginPath(result.status), { replace: true })
      },
      onError: () => {
        toast.error('로그인에 실패했습니다.')
        navigate(ROUTES.AUTH, { replace: true })
      },
    })
    // OAuth 콜백은 마운트 시 1회만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-500">로그인 처리 중</p>
    </div>
  )
}

export default SocialCallbackPage
