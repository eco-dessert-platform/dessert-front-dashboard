import { useMutation } from '@tanstack/react-query'

import { deleteCookie, getExpFromToken, setCookie } from '@/shared/utils/cookieUtils'

import { issueToken, logout } from './auth-api'
import { useAuthStore } from './auth-store'
import { authKeys } from './key'

export const useIssueTokenMutation = () => {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationKey: authKeys.all,
    mutationFn: async (generateToken: string) => {
      const data = await issueToken(generateToken)

      if (!data.accessToken || !data.result) {
        throw new Error('토큰 또는 사용자 정보가 응답에 포함되지 않았습니다.')
      }

      return data
    },
    onSuccess: (data) => {
      setCookie(
        'accessToken',
        data.accessToken!,
        getExpFromToken(data.accessToken!),
      )
      setAuth(data.result!.sellerId, data.result!.status)
    },
  })
}

export const useLogoutMutation = () => {
  const logoutStore = useAuthStore((state) => state.logout)

  return useMutation({
    mutationKey: [...authKeys.all, 'logout'],
    mutationFn: () => logout(),
    onSettled: () => {
      // 성공/실패 여부와 관계없이 로컬 세션 정리
      deleteCookie('accessToken')
      logoutStore()
      window.location.href = '/auth'
    },
  })
}
