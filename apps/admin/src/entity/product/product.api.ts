import { client } from '@/shared/utils'

import { UploadApprovalListResponseSchema } from './product.contract'

import type {
  GetUploadApprovalsRequestParams,
  UploadApprovalListResult,
} from './product.type'

export const getUploadApprovals = async (
  params: GetUploadApprovalsRequestParams = {},
): Promise<UploadApprovalListResult> => {
  const response = await client.get('/api/v1/admin/products/upload-approvals', {
    params,
  })
  const parsed = UploadApprovalListResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}
