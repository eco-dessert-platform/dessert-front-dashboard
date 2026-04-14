import { useMutation } from '@tanstack/react-query'

import { authKeys, issueToken, useAuthStore } from '@/entity/auth'
import { getExpFromToken, setCookie } from '@/shared/utils/cookieUtils'

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
