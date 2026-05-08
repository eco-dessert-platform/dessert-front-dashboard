export type {
  AdminProduct,
  AdminProductOption,
  AdminProductListResult,
  GetAdminProductsRequestParams,
  DeleteAdminProductsRequestParams,
  DeleteAdminProductOptionsBody,
  DeleteAdminProductOptionsParams,
  EditStockFlag,
  EditAdminProductOptionStockBody,
  EditAdminProductOptionStockParams,
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
  EditStockFlagSchema,
  EditAdminProductOptionStockBodySchema,
} from './management-all.contract'

export {
  getAdminProducts,
  deleteAdminProducts,
  deleteAdminProductOptions,
  editAdminProductOptionStock,
} from './management-all.api'

export { managementAllQueries } from './management-all.query'

export { getAdminProductMockData } from './management-all.mock'
