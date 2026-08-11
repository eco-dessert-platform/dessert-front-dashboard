import { client } from '@/shared/utils'

import {
  ApproveSellersResponseSchema,
  MemberApprovalListResponseSchema,
} from './member-approval.contract'
import { formatJoinDate, getBankLabel } from './member-approval.const'

import type {
  AdminSellerApplication,
  ApproveSellersRequest,
  ApproveSellersResult,
  GetMemberApprovalsParams,
  MemberApprovalListResult,
  TableRow,
} from './member-approval.type'

export function mapApplicationToTableRow(
  item: AdminSellerApplication,
): TableRow {
  const store = item.sellerStoreDTO
  const seller = item.sellerDTO
  const address = [store.originAddressLine, store.originAddressDetail]
    .filter(Boolean)
    .join(' ')

  return {
    id: String(item.storeApplicationId),
    storeApplicationId: item.storeApplicationId,
    storeName: store.storeName,
    phoneNumber: store.phone,
    additionalPhoneNumber: store.subPhone ?? '',
    emailAddress: store.email,
    address,
    depositor: seller.accountHolder,
    bankName: getBankLabel(seller.bankCode),
    accountNumber: seller.accountNumber ?? '-',
    joinDate: formatJoinDate(seller.createdAt),
  }
}

export const getMemberApprovals = async (
  params: GetMemberApprovalsParams = {},
): Promise<MemberApprovalListResult> => {
  const response = await client.get('/api/v1/admin/sellers', {
    params: { page: params.page ?? 1 },
  })
  const parsed = MemberApprovalListResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}

export const approveSellers = async (
  body: ApproveSellersRequest,
): Promise<ApproveSellersResult> => {
  const response = await client.put('/api/v1/admin/sellers/approve', body)
  const parsed = ApproveSellersResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}
