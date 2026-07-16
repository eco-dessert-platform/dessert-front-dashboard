import type {
  AdminSellerApplicationListResultSchema,
  AdminSellerApplicationSchema,
  GetAdminSellerApplicationsRequestParamsSchema,
  SellerSchema,
  SellerStatusSchema,
  SellerStoreSchema,
} from './member-approval.contract'
import type { z } from 'zod'

export type SellerStatus = z.infer<typeof SellerStatusSchema>
export type SellerStore = z.infer<typeof SellerStoreSchema>
export type Seller = z.infer<typeof SellerSchema>
export type AdminSellerApplication = z.infer<
  typeof AdminSellerApplicationSchema
>
export type AdminSellerApplicationListResult = z.infer<
  typeof AdminSellerApplicationListResultSchema
>
export type GetAdminSellerApplicationsRequestParams = z.infer<
  typeof GetAdminSellerApplicationsRequestParamsSchema
>
