import { useMutation } from '@tanstack/react-query'

import { adminLogin, authKeys, useAuthStore } from '@/entity/auth'
import { TOKEN_COOKIE_KEYS } from '@/shared/constant'
import { getExpFromToken, setCookie } from '@/shared/utils'

export const useAdminLoginMutation = () => {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)

  return useMutation({
    mutationKey: authKeys.all,
    mutationFn: adminLogin,
    onSuccess: ({ accessToken, refreshToken }) => {
      try {
        setCookie(
          TOKEN_COOKIE_KEYS.ACCESS,
          accessToken,
          getExpFromToken(accessToken),
        )
        setCookie(
          TOKEN_COOKIE_KEYS.REFRESH,
          refreshToken,
          getExpFromToken(refreshToken),
        )
      } catch {
        setCookie(TOKEN_COOKIE_KEYS.ACCESS, accessToken)
        setCookie(TOKEN_COOKIE_KEYS.REFRESH, refreshToken)
      }
      setIsLoggedIn(true)
    },
  })
}
