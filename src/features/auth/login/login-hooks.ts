import { useEffect } from 'react'

import {
  useGoogleLoginMutation,
  useKakaoLoginMutation,
} from 'src/entity/auth/auth-query'
import { useAuthStore } from 'src/entity/auth/auth-store'

interface SocialLoginMessage {
  type: 'SOCIAL_LOGIN_SUCCESS' | 'SOCIAL_LOGIN_ERROR'
  provider?: string
  code?: string
  error?: string
}

// Internal popup state management
let kakaoPopup: Window | null = null
let googlePopup: Window | null = null

export const setKakaoPopup = (popup: Window | null) => {
  kakaoPopup = popup
}
export const getKakaoPopup = () => kakaoPopup
export const clearKakaoPopup = () => {
  kakaoPopup = null
}

export const setGooglePopup = (popup: Window | null) => {
  googlePopup = popup
}
export const getGooglePopup = () => googlePopup
export const clearGooglePopup = () => {
  googlePopup = null
}

export const useSocialLogin = () => {
  const { socialLoginType, setSocialLoginType } = useAuthStore()
  const kakaoMutation = useKakaoLoginMutation()
  const googleMutation = useGoogleLoginMutation()

  useEffect(() => {
    const handleMessage = (event: MessageEvent<SocialLoginMessage>) => {
      if (event.origin !== window.location.origin) return
      const { type, provider, code, error } = event.data

      if (type === 'SOCIAL_LOGIN_SUCCESS' && provider && code) {
        const upperProvider = provider.toUpperCase() as 'KAKAO' | 'GOOGLE'

        if (upperProvider === 'GOOGLE') {
          googleMutation.mutate(code)
        } else {
          kakaoMutation.mutate(code)
        }

        clearGooglePopup()
        clearKakaoPopup()
      }

      if (type === 'SOCIAL_LOGIN_ERROR') {
        console.error('소셜 로그인 에러:', error)
        setSocialLoginType(null)
        clearGooglePopup()
        clearKakaoPopup()
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [googleMutation, kakaoMutation, setSocialLoginType])

  useEffect(() => {
    if (kakaoMutation.isSuccess || googleMutation.isSuccess) {
      window.location.href = '/'
    }
  }, [kakaoMutation.isSuccess, googleMutation.isSuccess])

  useEffect(() => {
    if (!socialLoginType) return

    const popup =
      socialLoginType === 'KAKAO' ? getKakaoPopup() : getGooglePopup()
    if (!popup) return

    const checkPopupClosed = setInterval(() => {
      if (popup.closed) {
        const isLoading = kakaoMutation.isPending || googleMutation.isPending
        if (!isLoading) {
          setSocialLoginType(null)
        }
        clearGooglePopup()
        clearKakaoPopup()
        clearInterval(checkPopupClosed)
      }
    }, 1000)

    return () => clearInterval(checkPopupClosed)
  }, [
    socialLoginType,
    kakaoMutation.isPending,
    googleMutation.isPending,
    setSocialLoginType,
  ])
}
