import { AxiosResponse } from 'axios'

import { client } from '@/shared/utils/axios'

import { LoginResponse } from './types'

export const adminLogin = async (data: {
  accountId: string
  password: string
}): Promise<AxiosResponse<LoginResponse>> => {
  return await client.post('/api/v1/admin/login', data)
}
