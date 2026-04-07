import { useMutation } from '@tanstack/react-query'

import { getExpFromToken, setCookie } from '@/shared/utils/cookieUtils'

import { issueToken, logout } from './auth-api'
import { useAuthStore } from './auth-store'
import { authKeys } from './key'

export const useIssueTokenMutation = () => {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationKey: authKeys.all,
    mutationFn: (generateToken: string) => issueToken(generateToken),
    onSuccess: (data) => {
      if (data.accessToken) {
        setCookie(
          'accessToken',
          data.accessToken,
          getExpFromToken(data.accessToken),
        )
      }

      if (data.result) {
        setAuth(data.result.sellerId, data.result.status)
      }
    },
  })
}

export const useLogoutMutation = () => {
  const logoutStore = useAuthStore((state) => state.logout)

  return useMutation({
    mutationKey: [...authKeys.all, 'logout'],
    mutationFn: () => logout(),
    onSuccess: () => {
      logoutStore()
      window.location.href = '/auth'
    },
  })
}
