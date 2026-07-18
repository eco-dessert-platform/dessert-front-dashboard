import type {
  CreateAdminStoreRequestSchema,
  DeleteAdminStoresRequestParamsSchema,
  GetRegisteredStoresRequestParamsSchema,
  RegisteredStoreInfoSchema,
  RegisteredStoreListResultSchema,
  StoreDetailResponseSchema,
  UpdateAdminStoreRequestSchema,
} from './store-registration.contract'
import type { z } from 'zod'

export interface StoreRegistration {
  id: number
  storeName: string
  businessNumber: string
  introduction: string
  phone: string
  subPhoneNumber: string
  email: string
  baseAddress: string
  detailAddress: string
}

export type RegisteredStoreInfo = z.infer<typeof RegisteredStoreInfoSchema>
export type RegisteredStoreListResult = z.infer<
  typeof RegisteredStoreListResultSchema
>
export type StoreDetailResponse = z.infer<typeof StoreDetailResponseSchema>
export type GetRegisteredStoresRequestParams = z.infer<
  typeof GetRegisteredStoresRequestParamsSchema
>
export type CreateAdminStoreRequest = z.infer<
  typeof CreateAdminStoreRequestSchema
>
export type UpdateAdminStoreRequest = z.infer<
  typeof UpdateAdminStoreRequestSchema
>
export type DeleteAdminStoresRequestParams = z.infer<
  typeof DeleteAdminStoresRequestParamsSchema
>

export interface CreateAdminStoreInput {
  request: CreateAdminStoreRequest
  profileImage: File
}

export interface UpdateAdminStoreParams {
  storeId: number
  body: UpdateAdminStoreRequest
}
