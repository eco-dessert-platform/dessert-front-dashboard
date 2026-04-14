import axios from 'axios'

import { TOKEN_COOKIE_KEYS } from '@/shared/constant'
import { getCookie } from '@/shared/utils/cookieUtils'
const baseURL = import.meta.env.VITE_PUBLIC_SERVER_URL

export const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use(
  (config) => {
    const token = getCookie(TOKEN_COOKIE_KEYS.ACCESS)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

type UnauthorizedCallback = () => void

export const setupAuthResponseInterceptor = (
  onUnauthorized: UnauthorizedCallback,
) => {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        const requestUrl = error.config?.url ?? ''
        const isLoginRequest = /\/api\/v1\/admin\/login(?:\?|$)/.test(
          requestUrl,
        )
        // 로그인 요청의 401은 무시 (onError에서 처리)
        if (!isLoginRequest) {
          onUnauthorized()
          window.location.href = '/login'
        }
      }
      return Promise.reject(error)
    },
  )
}
