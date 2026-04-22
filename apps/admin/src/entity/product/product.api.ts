import { getUploadApprovalMockData } from './product.mock'

import type {
  GetUploadApprovalsRequestParams,
  UploadApprovalListResult,
} from './product.type'

export const getUploadApprovals = async (
  params: GetUploadApprovalsRequestParams = {},
): Promise<UploadApprovalListResult> => {
  return getUploadApprovalMockData(params.page ?? 0, params.size ?? 20)

  // TODO: DB 데이터 추가 후 아래 코드로 교체
  // const response = await client.get('/api/v1/admin/products/upload-approvals', {
  //   params,
  // })
  // const parsed = UploadApprovalListResponseSchema.parse(response.data)
  // if (!parsed.success) throw new Error(parsed.message)
  // return parsed.result
}
