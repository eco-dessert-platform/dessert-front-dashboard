export type {
  AdminProduct,
  AdminProductOption,
  AdminProductListResult,
  GetAdminProductsRequestParams,
  DeleteAdminProductsRequestParams,
} from './management-all.type'

export {
  AdminProductOptionSchema,
  AdminProductSchema,
  AdminProductListResultSchema,
  AdminProductListResponseSchema,
  GetAdminProductsRequestParamsSchema,
  DeleteAdminProductsRequestParamsSchema,
  DeleteAdminProductsResponseSchema,
} from './management-all.contract'

export { getAdminProducts, deleteAdminProducts } from './management-all.api'

export { managementAllQueries } from './management-all.query'
