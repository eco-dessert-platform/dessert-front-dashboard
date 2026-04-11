import { client } from '@/shared/utils/axios'

import { ApiResponse, OAuthTokenRequest, OAuthTokenResult } from './types'

export const issueToken = async (generateToken: string) => {
  const response = await client.post<ApiResponse<OAuthTokenResult>>(
    '/api/v1/seller/oauth/tokens',
    { generateToken } satisfies OAuthTokenRequest,
  )

  const accessToken = response.headers['authorization']?.replace(/^Bearer\s+/i, '')

  return {
    ...response.data,
    accessToken,
  }
}

export const reissueToken = async () => {
  const response = await client.post<ApiResponse>(
    '/api/v1/auth/reissue',
    null,
    { withCredentials: true },
  )

  const accessToken = response.headers['authorization']?.replace(/^Bearer\s+/i, '')

  return { ...response.data, accessToken }
}

export const logout = async () => {
  const response = await client.delete<ApiResponse>('/api/v1/auth/logout', {
    withCredentials: true,
  })

  return response.data
}
