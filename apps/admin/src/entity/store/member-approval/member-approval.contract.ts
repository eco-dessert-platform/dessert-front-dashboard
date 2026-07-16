import { z } from 'zod'

const BaseResponseSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  fieldErrors: z
    .array(z.object({ field: z.string(), msg: z.string() }))
    .optional(),
})

export const SellerStatusSchema = z.enum([
  'NEW',
  'PENDING',
  'APPROVED',
  'REJECTED',
])

export const SellerStoreSchema = z.object({
  storeName: z.string().nullish(),
  phone: z.string().nullish(),
  subPhone: z.string().nullish(),
  email: z.string().nullish(),
  originAddressLine: z.string().nullish(),
  originAddressDetail: z.string().nullish(),
})

export const SellerSchema = z.object({
  sellerId: z.number().int(),
  sellerName: z.string().nullish(),
  sellerStatus: SellerStatusSchema.nullish(),
  bankCode: z.string().nullish(),
  accountHolder: z.string().nullish(),
  accountNumber: z.string().nullish(),
  createdAt: z.string().nullish(),
})

export const AdminSellerApplicationSchema = z.object({
  storeApplicationId: z.number().int(),
  sellerStoreDTO: SellerStoreSchema,
  sellerDTO: SellerSchema,
})

export const AdminSellerApplicationListResultSchema = z.object({
  adminSellerApplicationList: z.array(AdminSellerApplicationSchema),
  totalElements: z.number().int(),
  totalPages: z.number().int(),
  hasPrevious: z.boolean(),
  hasNext: z.boolean(),
})

export const AdminSellerApplicationListResponseSchema = z.discriminatedUnion(
  'success',
  [
    BaseResponseSchema.extend({
      success: z.literal(true),
      result: AdminSellerApplicationListResultSchema,
    }),
    BaseResponseSchema.extend({
      success: z.literal(false),
      result: z.null().optional(),
    }),
  ],
)

export const GetAdminSellerApplicationsRequestParamsSchema = z.object({
  page: z.number().int().positive().optional(),
})
