import { deleteCookie } from '@dessert/core'
import { useMutation } from '@tanstack/react-query'

import { authKeys, logout, useAuthStore } from '@/entity/auth'
import { ROUTES } from '@/shared/constant/routes'

export const useLogoutMutation = () => {
  const logoutStore = useAuthStore((state) => state.logout)

  return useMutation({
    mutationKey: [...authKeys.all, 'logout'],
    mutationFn: () => logout(),
    onSettled: () => {
      // 성공/실패 여부와 관계없이 로컬 세션 정리
      deleteCookie('accessToken')
      logoutStore()
      window.location.href = ROUTES.AUTH
    },
  })
}
