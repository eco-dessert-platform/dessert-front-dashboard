import { getExpFromToken, setCookie } from '@dessert/core'
import { useMutation } from '@tanstack/react-query'

import { authKeys, issueToken, useAuthStore } from '@/entity/auth'

export const useIssueTokenMutation = () => {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationKey: authKeys.all,
    mutationFn: async (generateToken: string) => {
      const data = await issueToken(generateToken)

      if (!data.accessToken || !data.result) {
        throw new Error('토큰 또는 사용자 정보가 응답에 포함되지 않았습니다.')
      }

      return { accessToken: data.accessToken, result: data.result }
    },
    onSuccess: ({ accessToken, result }) => {
      setCookie('accessToken', accessToken, getExpFromToken(accessToken))
      setAuth(result.sellerId, result.status)
    },
  })
}
