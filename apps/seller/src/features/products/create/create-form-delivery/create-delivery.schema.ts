import { z } from 'zod'
export const deliverySchema = z
  .object({
    deliveryTerms: z.string().min(1),
    deliveryCompany: z.string().min(1),
    deliveryFee: z
      .number()
      .min(0)
      .max(100000, '올바른 가격을 입력해주세요')
      .nullable(),
    deliveryMinFee: z
      .number()
      .min(0)
      .max(100000, '올바른 가격을 입력해주세요')
      .nullable(),
  })
  .refine(
    (data) => {
      if (data.deliveryTerms === 'free') return true
      return data.deliveryFee !== null
    },
    { message: '올바른 가격을 입력해주세요', path: ['deliveryFee'] },
  )
  .refine(
    (data) => {
      if (data.deliveryTerms !== 'conditionalFree') return true
      return data.deliveryMinFee !== null
    },
    { message: '올바른 가격을 입력해주세요', path: ['deliveryMinFee'] },
  )
