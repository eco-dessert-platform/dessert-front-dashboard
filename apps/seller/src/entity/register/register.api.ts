import { isAxiosError } from 'axios'

import type { ApiResponse } from '@/entity/auth/types'
import { client } from '@/shared/utils/axios'

import type {
  AccountVerificationDetail,
  AccountVerificationRequest,
  AccountVerificationResult,
  RegisterDocumentsRequest,
  RegisterDocumentsResult,
  StoreApplicationResult,
  StoreNameCheckResult,
  StoreNamesResult,
  SubmitStoreApplicationInput,
} from './register.type'

export async function getStoreApplication(): Promise<StoreApplicationResult> {
  const { data } = await client.get<ApiResponse<StoreApplicationResult>>(
    '/api/v1/seller/stores/applications',
  )

  if (!data.result) {
    throw new Error(data.message ?? '스토어 신청 정보를 불러오지 못했습니다.')
  }

  return data.result
}

export async function getStoreNames(
  storeName: string,
): Promise<StoreNamesResult> {
  const { data } = await client.get<ApiResponse<StoreNamesResult>>(
    '/api/v1/seller/stores/store-names',
    {
      params: { storeName },
    },
  )

  if (!data.result) {
    throw new Error(data.message ?? '스토어 목록을 불러오지 못했습니다.')
  }

  return data.result
}

export async function checkStoreName(
  storeName: string,
): Promise<StoreNameCheckResult> {
  const { data } = await client.get<ApiResponse<StoreNameCheckResult>>(
    '/api/v1/seller/stores/check-name',
    {
      params: { storeName: storeName.trim() },
    },
  )

  if (!data.result) {
    throw new Error(data.message ?? '스토어 중복 확인에 실패했습니다.')
  }

  return data.result
}

export async function getAccountVerification(): Promise<AccountVerificationDetail | null> {
  try {
    const { data } = await client.get<ApiResponse<AccountVerificationDetail>>(
      '/api/v1/seller/sellers/account-verifications',
    )
    return data.result ?? null
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 400) return null
    throw err
  }
}

export async function verifyAccount(
  payload: AccountVerificationRequest,
): Promise<AccountVerificationResult> {
  const sanitized: AccountVerificationRequest = {
    ...payload,
    accountNumber: payload.accountNumber.replace(/\D/g, ''),
  }

  const { data } = await client.post<ApiResponse<AccountVerificationResult>>(
    '/api/v1/seller/sellers/account-verifications',
    sanitized,
  )

  if (!data.result) {
    throw new Error(data.message ?? '계좌 인증에 실패했습니다.')
  }

  return data.result
}

interface ListApiResponse<T> {
  success: boolean
  code: number
  message: string
  list?: T
}

export async function registerDocuments({
  businessLicense,
  mailOrderLicense,
  bankbookCopy,
  foodManufactureLicense,
  accountVerificationId,
}: RegisterDocumentsRequest): Promise<RegisterDocumentsResult> {
  const formData = new FormData()
  formData.append('businessLicense', businessLicense)
  formData.append('mailOrderLicense', mailOrderLicense)
  formData.append('bankbookCopy', bankbookCopy)
  formData.append('foodManufactureLicense', foodManufactureLicense)
  formData.append('accountVerificationId', String(accountVerificationId))

  const { data } = await client.post<ListApiResponse<RegisterDocumentsResult>>(
    '/api/v1/seller/sellers/documents',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  )

  if (!data.list) {
    throw new Error(data.message ?? '서류 등록에 실패했습니다.')
  }

  return data.list
}

export async function submitStoreApplication({
  request,
  profileImage,
}: SubmitStoreApplicationInput): Promise<StoreApplicationResult> {
  if (!request.profile && !profileImage) {
    throw new Error('프로필 이미지 또는 프로필 URL 중 하나는 필수입니다.')
  }

  const formData = new FormData()
  formData.append(
    'request',
    new Blob([JSON.stringify(request)], { type: 'application/json' }),
  )
  if (profileImage) {
    formData.append('profileImage', profileImage)
  }

  const { data } = await client.post<ApiResponse<StoreApplicationResult>>(
    '/api/v1/seller/stores/applications',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  )

  if (!data.result) {
    throw new Error(data.message ?? '스토어 등록 신청에 실패했습니다.')
  }

  return data.result
}
