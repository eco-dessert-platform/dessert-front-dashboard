import { client } from '@/shared/utils'

import {
  AdminProductListResponseSchema,
  DeleteAdminProductsResponseSchema,
} from './management-all.contract'

import type {
  AdminProductListResult,
  DeleteAdminProductsRequestParams,
  GetAdminProductsRequestParams,
} from './management-all.type'

export const getAdminProducts = async (
  params: GetAdminProductsRequestParams = {},
): Promise<AdminProductListResult> => {
  const response = await client.get('/api/v1/admin/products', { params })
  const parsed = AdminProductListResponseSchema.parse(response.data)
  if (!parsed.success) throw new Error(parsed.message)
  return parsed.result
}

export const deleteAdminProducts = async ({
  productIds,
}: DeleteAdminProductsRequestParams): Promise<void> => {
  const response = await client.delete('/api/v1/admin/products', {
    params: { productIds },
  })
  const parsed = DeleteAdminProductsResponseSchema.parse(response.data)

  if (!parsed.success) throw new Error(parsed.message)
}
