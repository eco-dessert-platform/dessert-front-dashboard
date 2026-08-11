import type {
  AdminSellerApplicationSchema,
  ApproveFailDetailSchema,
  ApproveSellerItemSchema,
  ApproveSellersRequestSchema,
  ApproveSellersResultSchema,
  ApproveSuccessDetailSchema,
  GetMemberApprovalsParamsSchema,
  MemberApprovalListResultSchema,
  SellerDtoSchema,
  SellerStoreDtoSchema,
} from './member-approval.contract'
import type { z } from 'zod'

export type SellerStoreDto = z.infer<typeof SellerStoreDtoSchema>
export type SellerDto = z.infer<typeof SellerDtoSchema>
export type AdminSellerApplication = z.infer<
  typeof AdminSellerApplicationSchema
>
export type MemberApprovalListResult = z.infer<
  typeof MemberApprovalListResultSchema
>
export type GetMemberApprovalsParams = z.infer<
  typeof GetMemberApprovalsParamsSchema
>
export type ApproveSellerItem = z.infer<typeof ApproveSellerItemSchema>
export type ApproveSellersRequest = z.infer<typeof ApproveSellersRequestSchema>
export type ApproveSuccessDetail = z.infer<typeof ApproveSuccessDetailSchema>
export type ApproveFailDetail = z.infer<typeof ApproveFailDetailSchema>
export type ApproveSellersResult = z.infer<typeof ApproveSellersResultSchema>

export type TableRow = {
  id: string
  storeApplicationId: number
  storeName: string
  phoneNumber: string
  additionalPhoneNumber: string
  emailAddress: string
  address: string
  depositor: string
  bankName: string
  accountNumber: string
  joinDate: string
}
