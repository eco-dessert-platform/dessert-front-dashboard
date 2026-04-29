import { z } from 'zod'

const BaseResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  fieldErrors: z
    .array(z.object({ field: z.string(), msg: z.string() }))
    .optional(),
})

export const AdminProductOptionSchema = z.object({
  optionId: z.number().int(),
  optionName: z.string(),
  price: z.number().int(),
  stock: z.number().int(),
  tags: z.array(z.string()),
})

export const AdminProductSchema = z.object({
  productId: z.number().int(),
  storeId: z.number().int(),
  storeName: z.string(),
  productName: z.string(),
  productPrice: z.number().int(),
  productOptions: z.array(AdminProductOptionSchema),
})

export const AdminProductListResultSchema = z.object({
  content: z.array(AdminProductSchema),
  page: z.number().int(),
  size: z.number().int(),
  totalPages: z.number().int(),
  totalElements: z.number().int(),
})

export const AdminProductListResponseSchema = z.discriminatedUnion('success', [
  BaseResponseSchema.extend({
    success: z.literal(true),
    result: AdminProductListResultSchema,
  }),
  BaseResponseSchema.extend({
    success: z.literal(false),
    result: z.null().optional(),
  }),
])

export const DeleteAdminProductsResponseSchema = BaseResponseSchema.extend({
  success: z.boolean(),
})

export const GetAdminProductsRequestParamsSchema = z.object({
  page: z.number().int().nonnegative().optional(),
  size: z.number().int().positive().optional(),
  sort: z.array(z.string()).optional(),
})

export const DeleteAdminProductsRequestParamsSchema = z.object({
  productIds: z.array(z.number().int()),
})
