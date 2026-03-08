import { AxiosResponse } from 'axios'

import {
  client,
  googleOAuthClient,
  kakaoOAuthClient,
} from 'src/shared/utils/axios'

import { GOOGLE, KAKAO } from './constants'
import { GoogleAuthResponse, KakaoAuthResponse, LoginResponse } from './types'

export const kakaoLogin = async (
  code: string,
): Promise<AxiosResponse<LoginResponse>> => {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: KAKAO.client_id as string,
    redirect_uri: KAKAO.redirect_uri as string,
    code,
  })

  const { data: tokenData } = await kakaoOAuthClient.post<KakaoAuthResponse>(
    '/oauth/token',
    params.toString(),
  )

  const response = await client.get<LoginResponse>(
    `/api/v1/oauth/seller/login/kakao?token=${tokenData.access_token}`,
  )

  return response
}

export const googleLogin = async (
  code: string,
): Promise<AxiosResponse<LoginResponse>> => {
  const params = new URLSearchParams({
    code,
    client_id: GOOGLE.client_id as string,
    redirect_uri: GOOGLE.redirect_uri as string,
    client_secret: GOOGLE.clientsecret as string,
    grant_type: 'authorization_code',
  })

  const { data: tokenData } = await googleOAuthClient.post<GoogleAuthResponse>(
    '/token',
    params.toString(),
  )

  const response = await client.get<LoginResponse>(
    `/api/v1/oauth/seller/login/google?token=${tokenData.access_token}`,
  )

  return response
}

export const refreshToken = async (
  token: string,
): Promise<AxiosResponse<{ accessToken: string }>> =>
  await client.post('api/v1/token', { refreshToken: token })
