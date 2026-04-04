import { useMutation } from '@tanstack/react-query'

import { adminLogin, authKeys, useAuthStore } from '@/entity/auth'
import { getExpFromToken, setCookie } from '@/shared/utils'

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
