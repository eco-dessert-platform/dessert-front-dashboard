import { isAxiosError } from 'axios'

export const extractServerMessage = (err: unknown): string | undefined => {
  if (!isAxiosError(err)) return undefined
  const message = err.response?.data?.message
  return typeof message === 'string' && message.length > 0 ? message : undefined
}
