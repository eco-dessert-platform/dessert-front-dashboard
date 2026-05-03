import { client } from '@/shared/utils'

import {
  DecideUploadApprovalResponseSchema,
  UploadApprovalListResponseSchema,
} from './product.contract'

import type {
  DecideUploadApproval,
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

export const decideUploadApproval = async (
  boardId: number,
  body: DecideUploadApproval,
): Promise<void> => {
  const response = await client.post(
    `/api/v1/admin/products/${boardId}/decision`,
    body,
  )
  const parsed = DecideUploadApprovalResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
}
