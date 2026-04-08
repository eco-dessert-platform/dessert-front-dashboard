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
let pendingRequests: Array<(token: string) => void> = []

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        pendingRequests.push((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          resolve(client(originalRequest))
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
        'Bearer ',
        '',
      )

      if (newAccessToken) {
        setCookie('accessToken', newAccessToken, getExpFromToken(newAccessToken))
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        pendingRequests.forEach((cb) => cb(newAccessToken))
        pendingRequests = []
        return client(originalRequest)
      }
    } catch {
      // console.error('토큰 재발급 실패 - 리다이렉트 임시 차단')
      window.location.href = '/auth'
    } finally {
      isRefreshing = false
    }

    return Promise.reject(error)
  },
)

export const stream = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  responseType: 'stream',
})
