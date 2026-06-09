import type {
  GetUpdateStoreNamesRequestParamsSchema,
  UpdateStoreNameListResultSchema,
  UpdateStoreNameSchema,
} from './name-change-approval.contract'
import type { z } from 'zod'

export type UpdateStoreName = z.infer<typeof UpdateStoreNameSchema>
export type UpdateStoreNameListResult = z.infer<
  typeof UpdateStoreNameListResultSchema
>
export type GetUpdateStoreNamesRequestParams = z.infer<
  typeof GetUpdateStoreNamesRequestParamsSchema
>
