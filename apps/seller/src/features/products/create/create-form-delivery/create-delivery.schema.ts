import { z } from 'zod'

export const deliverySchema = z
  .object({
    deliveryTerms: z.string(),
    deliveryCompany: z.string(),
    deliveryFee: z.union([
      z
        .number({ error: '올바른 가격을 입력해주세요' })
        .min(0, '올바른 가격을 입력해주세요'),
      z.null(),
    ]),
    deliveryMinFee: z.union([
      z
        .number({ error: '올바른 가격을 입력해주세요' })
        .min(0, '올바른 가격을 입력해주세요'),
      z.null(),
    ]),
  })
  .refine(
    (data) => {
      if (data.deliveryTerms === 'free') return true
      return data.deliveryFee !== null && data.deliveryFee <= 100000
    },
    { message: '올바른 금액을 입력해주세요', path: ['deliveryFee'] },
  )
