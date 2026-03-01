import { useForm, Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type ProductFormInput = {
  productName: string
  isFresh: boolean
  productionTime: string
  price: number | null
  discountAmount: number | null
  discountType: 'won' | 'percentage'
}
//zod 정의
const productSchema = z
  .object({
    productName: z
      .string()
      .min(3, '상품명을 3~50자 미만으로 입력해주세요')
      .max(49, '상품명을 3~50자 미만으로 입력해주세요'),
    isFresh: z.boolean(),
    productionTime: z.string().min(1, '상품 제작 시간을 선택해주세요'),
    price: z
      .number({ error: '올바른 가격을 입력해주세요' })
      .min(0, '올바른 가격을 입력해주세요')
      .max(100000, '올바른 가격을 입력해주세요')
      .nullable()
      .refine((val) => val !== null, '올바른 가격을 입력해주세요'),
    discountAmount: z
      .number({ error: '올바른 할인 금액을 입력해주세요' })
      .min(0, '올바른 할인 금액을 입력해주세요')
      .nullable()
      .refine((val) => val !== null, '올바른 할인 금액을 입력해주세요'),
    discountType: z.enum(['won', 'percentage']),
  })
  // (할인금액 > 가격 방지)
  .refine(
    (data) =>
      data.discountType === 'won' ? data.discountAmount <= 100000 : true,
    { message: '올바른 금액을 입력해주세요', path: ['discountAmount'] },
  )
  .refine(
    (data) =>
      data.discountType === 'percentage' ? data.discountAmount <= 100 : true,
    { message: '올바른 할인율을 입력해주세요', path: ['discountAmount'] },
  )
  .refine(
    (data) => {
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

export function useProductForm() {
  const form = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormInput>,
    defaultValues: {
      productName: '',
      isFresh: true,
      productionTime: '',
      price: null,
      discountAmount: null,
      discountType: 'won',
    },
    mode: 'onChange',
  })
  // 실시간으로 가격/할인 최종 금액 계산
  const price = form.watch('price')
  const discountAmount = form.watch('discountAmount')
  const discountType = form.watch('discountType')

  const finalPrice =
    price !== null && discountAmount !== null
      ? discountType === 'won'
        ? Math.max(price - discountAmount, 0)
        : Math.max(price * (1 - discountAmount / 100), 0)
      : null

  // 5. submit 핸들러
  const onSubmit = form.handleSubmit((data) => {
    console.log('제출된 데이터:', data)
  })

  return {
    form,
    finalPrice,
    onSubmit,
  }
}
