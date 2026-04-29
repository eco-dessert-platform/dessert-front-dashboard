export type {
  AdminProduct,
  AdminProductOption,
  AdminProductListResult,
  GetAdminProductsRequestParams,
  DeleteAdminProductsRequestParams,
  DeleteAdminProductOptionsBody,
  DeleteAdminProductOptionsParams,
} from './management-all.type'

export {
  AdminProductOptionSchema,
  AdminProductSchema,
  AdminProductListResultSchema,
  AdminProductListResponseSchema,
  GetAdminProductsRequestParamsSchema,
  DeleteAdminProductsRequestParamsSchema,
  DeleteAdminProductsResponseSchema,
  DeleteAdminProductOptionsBodySchema,
} from './management-all.contract'

export {
  getAdminProducts,
  deleteAdminProducts,
  deleteAdminProductOptions,
} from './management-all.api'

export { managementAllQueries } from './management-all.query'
