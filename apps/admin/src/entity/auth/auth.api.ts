import { client } from '@/shared/utils'

interface LoginResponse {
  success: boolean
  code: number
  message: string
  fieldErrors: Array<{ field: string; msg: string }>
  result: {
    accessToken: string
    refreshToken: string
  } | null
}

export const adminLogin = async (data: {
  accountId: string
  password: string
}): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await client.post<LoginResponse>('/api/v1/admin/login', data)

  if (!response.data.success || !response.data.result) {
    throw new Error(response.data.message)
  }

  return response.data.result
}
