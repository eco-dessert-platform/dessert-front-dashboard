import type {
  GetUpdateStoreNameRequestsParamsSchema,
  StoreNameChangeRejectCategorySchema,
  StoreNameChangeStatusSchema,
  UpdateStoreNameApproveResultSchema,
  UpdateStoreNameRejectRequestSchema,
  UpdateStoreNameRejectResultSchema,
  UpdateStoreNameRequestListResultSchema,
  UpdateStoreNameSchema,
} from './name-change-approval.contract'
import type { z } from 'zod'

export type StoreNameChangeStatus = z.infer<typeof StoreNameChangeStatusSchema>
export type StoreNameChangeRejectCategory = z.infer<
  typeof StoreNameChangeRejectCategorySchema
>
export type UpdateStoreName = z.infer<typeof UpdateStoreNameSchema>
export type UpdateStoreNameRequestListResult = z.infer<
  typeof UpdateStoreNameRequestListResultSchema
>
export type UpdateStoreNameApproveResult = z.infer<
  typeof UpdateStoreNameApproveResultSchema
>
export type UpdateStoreNameRejectRequest = z.infer<
  typeof UpdateStoreNameRejectRequestSchema
>
export type UpdateStoreNameRejectResult = z.infer<
  typeof UpdateStoreNameRejectResultSchema
>
export type GetUpdateStoreNameRequestsParams = z.infer<
  typeof GetUpdateStoreNameRequestsParamsSchema
>
