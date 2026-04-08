import { AxiosResponse } from 'axios'

import { client } from '@/shared/utils'

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}
export const adminLogin = async (data: {
  accountId: string
  password: string
}): Promise<AxiosResponse<LoginResponse>> => {
  return await client.post('/api/v1/admin/login', data)
}
