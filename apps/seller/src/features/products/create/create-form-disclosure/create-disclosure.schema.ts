import { z } from 'zod'

export const disclosureSchema = z
  .object({
    productInfoNotice: z.object({
      productName: z.string(),
      foodType: z.string(),
      manufacturer: z.string(),
      originLocation: z.string(),
      manufactureDate: z.string(),
      expirationDate: z.string(),
      storageGuide: z.string(),
      packagingQuantityUnit: z.string(),
      rawMaterialName: z.string(),
      nutritionInfo: z.string(),
      transgenic: z.string(),
      customerWarning: z.string(),
      importFood: z.string(),
    }),
    productInfoNoticeMode: z.object({
      productName: z.enum(['default', 'manual']),
      foodType: z.enum(['default', 'manual']),
      manufacturer: z.enum(['default', 'manual']),
      originLocation: z.enum(['default', 'manual']),
      manufactureDate: z.enum(['default', 'manual']),
      expirationDate: z.enum(['default', 'manual']),
      storageGuide: z.enum(['default', 'manual']),
      packagingQuantityUnit: z.enum(['default', 'manual']),
      rawMaterialName: z.enum(['default', 'manual']),
      nutritionInfo: z.enum(['default', 'manual']),
      transgenic: z.enum(['default', 'manual']),
      customerWarning: z.enum(['default', 'manual']),
      importFood: z.enum(['default', 'manual']),
    }),
  })
  .superRefine((data, ctx) => {
    const fields = Object.keys(
      data.productInfoNoticeMode,
    ) as (keyof typeof data.productInfoNotice)[]

    fields.forEach((field) => {
      if (data.productInfoNoticeMode[field] === 'manual') {
        const val = data.productInfoNotice[field]
        if (val.length < 3 || val.length >= 50) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '3자 이상 50자 미만으로 입력해 주세요',
            path: ['productInfoNotice', field],
          })
        }
      }
    })
  })
