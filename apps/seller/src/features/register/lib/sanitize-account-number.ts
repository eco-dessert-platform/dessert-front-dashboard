import { AccountVerificationRequest } from '@/entity/register'

export function sanitizeAccountPayload(
  payload: AccountVerificationRequest,
): AccountVerificationRequest {
  return {
    ...payload,
    accountNumber: payload.accountNumber.replace(/\D/g, ''),
  }
}
