import type {
  GetUploadApprovalsRequestParamsSchema,
  UploadApprovalListResultSchema,
  UploadApprovalSchema,
} from './product.contract'
import type { z } from 'zod'

export interface ProductOption {
  optionId: number
  optionName: string
  price: number
  stock: number
  tags: string[]
}

export interface Product {
  productId: number
  storeName: string
  productName: string
  productPrice: number
  productOptions: ProductOption[]
}

export interface ProductResponse {
  success: boolean
  code: number
  message: string
  result: {
    contents: Product[]
    page: number
    size: number
    totalElements: number
    totalPages: number
  }
}

export type UploadApproval = z.infer<typeof UploadApprovalSchema>
export type UploadApprovalListResult = z.infer<
  typeof UploadApprovalListResultSchema
>
export type GetUploadApprovalsRequestParams = z.infer<
  typeof GetUploadApprovalsRequestParamsSchema
>
