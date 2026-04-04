import { useMutation } from '@tanstack/react-query'

import { getExpFromToken, setCookie } from '@/shared/utils/cookieUtils'

import { adminLogin } from './auth-api'
import { useAuthStore } from './auth-store'
import { authKeys } from './key'

export const useAdminLoginMutation = () => {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)

  return useMutation({
    mutationKey: authKeys.all,
    mutationFn: adminLogin,
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data

      try {
        setCookie('accessToken', accessToken, getExpFromToken(accessToken))
        setCookie('refreshToken', refreshToken, getExpFromToken(refreshToken))
      } catch {
        setCookie('accessToken', accessToken)
        setCookie('refreshToken', refreshToken)
      }
      setIsLoggedIn(true)
    },
  })
}
