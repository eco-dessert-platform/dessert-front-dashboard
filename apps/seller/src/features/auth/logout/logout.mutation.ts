import { useMutation } from '@tanstack/react-query'

import { authKeys, logout, useAuthStore } from '@/entity/auth'

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
