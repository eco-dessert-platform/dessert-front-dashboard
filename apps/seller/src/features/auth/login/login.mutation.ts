import { useMutation } from '@tanstack/react-query'

import { authKeys, issueToken, useAuthStore } from '@/entity/auth'
import { getExpFromToken, setCookie } from '@/shared/utils/cookieUtils'

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
