import { z } from 'zod'

export const productSchema = z
  .object({
    productName: z.string(),
    isFresh: z.boolean(),
    productionTime: z.string().min(1, '상품 제작 시간을 선택해주세요'),
    price: z.union([
      z
        .number({ error: '올바른 가격을 입력해주세요' })
        .min(0, '올바른 가격을 입력해주세요')
        .max(100000, '올바른 가격을 입력해주세요'),
      z.null(),
    ]),
    discountAmount: z.union([
      z
        .number({ error: '올바른 가격을 입력해주세요1' })
        .min(0, '올바른 가격을 입력해주세요2'),
      z.null(),
    ]),
    discountType: z.enum(['won', 'percentage']),
  })

  .refine(
    (data) =>
      data.productName === '' ||
      (data.productName.length >= 3 && data.productName.length <= 49),
    { message: '상품명을 3~50자 미만으로 입력해주세요', path: ['productName'] },
  )
  //null일 때 false반환, message 없음
  .refine((data) => data.price !== null, { message: '', path: ['price'] })
  .refine((data) => data.discountAmount !== null, {
    message: '',
    path: ['discountAmount'],
  })
  .refine(
    (data) => {
      if (data.discountAmount === null) return true
      return data.discountType === 'won' ? data.discountAmount <= 100000 : true
    },
    { message: '올바른 금액을 입력해주세요', path: ['discountAmount'] },
  )
  .refine(
    (data) => {
      if (data.discountAmount === null) return true
      return data.discountType === 'percentage'
        ? data.discountAmount <= 100
        : true
    },
    { message: '올바른 할인율을 입력해주세요', path: ['discountAmount'] },
  )
  .refine(
    (data) => {
      if (data.price === null || data.discountAmount === null) return true
      const finalPrice =
        data.discountType === 'won'
          ? data.price - data.discountAmount
          : data.price * (1 - data.discountAmount / 100)
      return finalPrice >= 0
    },
    {
      message: '할인 금액이 가격을 초과할 수 없어요',
      path: ['discountAmount'],
    },
  )
