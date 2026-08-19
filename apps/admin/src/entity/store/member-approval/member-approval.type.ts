import type {
  AdminSellerApplicationApproveListResultSchema,
  AdminSellerApplicationListResultSchema,
  AdminSellerApplicationRejectListResultSchema,
  AdminSellerApplicationSchema,
  AdminSellerDocumentDownloadRequestSchema,
  FailDetailSchema,
  GetAdminSellerApplicationsRequestParamsSchema,
  SellerSchema,
  SellerStatusSchema,
  SellerStoreSchema,
  StoreApplicationApproveSchema,
  StoreApplicationIdsSchema,
  StoreSchema,
  SuccessDetailSchema,
} from './member-approval.contract'
import type { z } from 'zod'

export type SellerStatus = z.infer<typeof SellerStatusSchema>
export type SellerStore = z.infer<typeof SellerStoreSchema>
export type Store = z.infer<typeof StoreSchema>
export type Seller = z.infer<typeof SellerSchema>
export type AdminSellerApplication = z.infer<
  typeof AdminSellerApplicationSchema
>
export type AdminSellerDocumentDownloadRequest = z.infer<
  typeof AdminSellerDocumentDownloadRequestSchema
>
export interface AdminSellerDocumentDownloadResult {
  blob: Blob
  filename: string
}
export type AdminSellerApplicationListResult = z.infer<
  typeof AdminSellerApplicationListResultSchema
>
export type GetAdminSellerApplicationsRequestParams = z.infer<
  typeof GetAdminSellerApplicationsRequestParamsSchema
>
export type StoreApplicationApprove = z.infer<
  typeof StoreApplicationApproveSchema
>
export type StoreApplicationIds = z.infer<typeof StoreApplicationIdsSchema>
export type SuccessDetail = z.infer<typeof SuccessDetailSchema>
export type FailDetail = z.infer<typeof FailDetailSchema>
export type AdminSellerApplicationApproveListResult = z.infer<
  typeof AdminSellerApplicationApproveListResultSchema
>
export type AdminSellerApplicationRejectListResult = z.infer<
  typeof AdminSellerApplicationRejectListResultSchema
>
