import { useMutation } from '@tanstack/react-query'

import { getExpFromToken, setCookie } from '@/shared/utils/cookieUtils'

import { googleLogin, kakaoLogin } from './auth-api'
import { useAuthStore } from './auth-store'
import { authKeys } from './key'

export const useKakaoLoginMutation = () => {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)

  return useMutation({
    mutationKey: authKeys.all,
    mutationFn: (code: string) => kakaoLogin(code),
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data
      setCookie('accessToken', accessToken, getExpFromToken(accessToken))
      setCookie('refreshToken', refreshToken, getExpFromToken(refreshToken))
      setIsLoggedIn(true)
    },
  })
}

export const useGoogleLoginMutation = () => {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)

  return useMutation({
    mutationKey: authKeys.all,
    mutationFn: (code: string) => googleLogin(code),
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data
      setCookie('accessToken', accessToken, getExpFromToken(accessToken))
      setCookie('refreshToken', refreshToken, getExpFromToken(refreshToken))
      setIsLoggedIn(true)
    },
  })
}
