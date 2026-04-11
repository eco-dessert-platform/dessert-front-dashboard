import axios from 'axios'

import { getCookie, getExpFromToken, setCookie } from '@/shared/utils/cookieUtils'

const baseURL = import.meta.env.VITE_PUBLIC_SERVER_URL

export const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// 모든 요청에 Bearer Token 추가
client.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 401 응답 시 토큰 재발급
let isRefreshing = false
let pendingRequests: Array<{
  resolve: (token: string) => void
  reject: (error: Error) => void
}> = []

const processPendingRequests = (token: string | null, error?: Error) => {
  pendingRequests.forEach(({ resolve, reject }) => {
    if (token) {
      resolve(token)
    } else {
      reject(error ?? new Error('토큰 재발급 실패'))
    }
  })
  pendingRequests = []
}

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(client(originalRequest))
          },
          reject,
        })
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const response = await axios.post(
        `${baseURL}/api/v1/auth/reissue`,
        null,
        { withCredentials: true },
      )

      const newAccessToken = response.headers['authorization']?.replace(
        /^Bearer\s+/i,
        '',
      )

      if (newAccessToken) {
        setCookie('accessToken', newAccessToken, getExpFromToken(newAccessToken))
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        processPendingRequests(newAccessToken)
        return client(originalRequest)
      } else {
        const noTokenError = new Error('토큰이 응답에 포함되지 않았습니다.')
        processPendingRequests(null, noTokenError)
        window.location.href = '/auth'
        return Promise.reject(noTokenError)
      }
    } catch (refreshError) {
      const error =
        refreshError instanceof Error
          ? refreshError
          : new Error('토큰 재발급 실패')
      processPendingRequests(null, error)
      window.location.href = '/auth'
      return Promise.reject(error)
    } finally {
      isRefreshing = false
    }
  },
)

export const stream = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  responseType: 'stream',
})
