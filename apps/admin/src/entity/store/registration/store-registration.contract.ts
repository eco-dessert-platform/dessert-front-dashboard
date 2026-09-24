import { z } from 'zod'

const BaseResponseSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  fieldErrors: z
    .array(z.object({ field: z.string(), msg: z.string() }))
    .optional(),
})

export const RegisteredStoreInfoSchema = z.object({
  storeId: z.number().int(),
  storeName: z.string(),
  businessNumber: z.string(),
  introduce: z.string(),
  phoneNumber: z.string(),
  subPhoneNumber: z.string(),
  email: z.string(),
  originAddressLine: z.string(),
  originAddressDetail: z.string(),
})

export const RegisteredStoreListResultSchema = z.object({
  content: z.array(RegisteredStoreInfoSchema),
  page: z.number().int().nonnegative(),
  size: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  totalElements: z.number().int().nonnegative(),
})

export const StoreDetailResponseSchema = z.object({
  storeId: z.number().int(),
  name: z.string(),
  identifier: z.string(),
  introduce: z.string(),
  profile: z.string(),
  phoneNumber: z.string(),
  subPhoneNumber: z.string(),
  email: z.string(),
  originAddress: z.string(),
  originAddressDetail: z.string(),
})

export const GetRegisteredStoresRequestParamsSchema = z.object({
  page: z.number().int().nonnegative().optional(),
  size: z.number().int().positive().optional(),
  sort: z.array(z.string()).optional(),
})

export const CreateAdminStoreRequestSchema = z.object({
  storeName: z.string(),
  identifier: z.string(),
  introduce: z.string(),
  phoneNumber: z.string(),
  subPhoneNumber: z.string().nullable(),
  email: z.string(),
  originAddress: z.string(),
  originAddressDetail: z.string(),
})

export const UpdateAdminStoreRequestSchema = CreateAdminStoreRequestSchema

export const DeleteAdminStoresRequestParamsSchema = z.object({
  storeIds: z.array(z.number().int()).min(1),
})

export const RegisteredStoreListResponseSchema = z.discriminatedUnion(
  'success',
  [
    BaseResponseSchema.extend({
      success: z.literal(true),
      result: RegisteredStoreListResultSchema,
    }),
    BaseResponseSchema.extend({
      success: z.literal(false),
      result: z.null().optional(),
    }),
  ],
)

export const CreateAdminStoreResponseSchema = z.discriminatedUnion('success', [
  BaseResponseSchema.extend({
    success: z.literal(true),
    result: StoreDetailResponseSchema,
  }),
  BaseResponseSchema.extend({
    success: z.literal(false),
    result: z.null().optional(),
  }),
])

export const UpdateAdminStoreResponseSchema = CreateAdminStoreResponseSchema

export const DeleteAdminStoresResponseSchema = BaseResponseSchema.extend({
  success: z.boolean(),
})
