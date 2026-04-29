import type {
  AdminProductListResultSchema,
  AdminProductOptionSchema,
  AdminProductSchema,
  DeleteAdminProductsRequestParamsSchema,
  GetAdminProductsRequestParamsSchema,
} from './management-all.contract'
import type { z } from 'zod'

export type AdminProductOption = z.infer<typeof AdminProductOptionSchema>
export type AdminProduct = z.infer<typeof AdminProductSchema>
export type AdminProductListResult = z.infer<
  typeof AdminProductListResultSchema
>
export type GetAdminProductsRequestParams = z.infer<
  typeof GetAdminProductsRequestParamsSchema
>
export type DeleteAdminProductsRequestParams = z.infer<
  typeof DeleteAdminProductsRequestParamsSchema
>
