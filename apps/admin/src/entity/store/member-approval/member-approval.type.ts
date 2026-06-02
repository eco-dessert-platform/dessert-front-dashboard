import type {
  AdminSellerApplicationSchema,
  AdminSellerListResultSchema,
  ApproveSellerItemSchema,
  ApproveSellersRequestSchema,
  ApproveSellersResultSchema,
  GetAdminSellersRequestParamsSchema,
  SellerSchema,
  SellerStoreSchema,
} from './member-approval.contract'
import type { z } from 'zod'

export type SellerStore = z.infer<typeof SellerStoreSchema>
export type Seller = z.infer<typeof SellerSchema>
export type AdminSellerApplication = z.infer<
  typeof AdminSellerApplicationSchema
>
export type AdminSellerListResult = z.infer<typeof AdminSellerListResultSchema>
export type GetAdminSellersRequestParams = z.infer<
  typeof GetAdminSellersRequestParamsSchema
>
export type ApproveSellerItem = z.infer<typeof ApproveSellerItemSchema>
export type ApproveSellersRequest = z.infer<typeof ApproveSellersRequestSchema>
export type ApproveSellersResult = z.infer<typeof ApproveSellersResultSchema>
