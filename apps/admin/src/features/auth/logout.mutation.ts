import { useMutation } from '@tanstack/react-query'

import { adminLogout, authKeys, useAuthStore } from '@/entity/auth'
import { TOKEN_COOKIE_KEYS } from '@/shared/constant'
import { deleteCookie } from '@/shared/utils'

export const useAdminLogoutMutation = () => {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)

  return useMutation({
    mutationKey: authKeys.all,
    mutationFn: adminLogout,
    onSuccess: () => {
      deleteCookie(TOKEN_COOKIE_KEYS.ACCESS)
      deleteCookie(TOKEN_COOKIE_KEYS.REFRESH)
      setIsLoggedIn(false)
    },
  })
}
