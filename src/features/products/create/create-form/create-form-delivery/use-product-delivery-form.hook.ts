import { useForm, Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNumberInput } from '../create-form-number-input.hook'

type DeliveryFormInput = {
  deliveryTerms: string
  deliveryCompany: string
  deliveryFee: number | null
  deliveryMinFee: number | null
}

const deliverySchema = z
  .object({
    deliveryTerms: z.string(),
    deliveryCompany: z.string(),
    deliveryFee: z.union([
      z
        .number({ error: '올바른 가격을 입력해주세요1' })
        .min(0, '올바른 가격을 입력해주세요'),
      z.null(),
    ]),
    deliveryMinFee: z.union([
      z
        .number({ error: '올바른 가격을 입력해주세요1' })
        .min(0, '올바른 가격을 입력해주세요'),
      z.null(),
    ]),
  })
  .refine(
    (data) => {
      if (data.deliveryTerms === 'free') return true
      return data.deliveryFee && data.deliveryFee <= 100000 ? true : false
    },
    { message: '올바른 금액을 입력해주세요', path: ['deliveryFee'] },
  )

export function useProductDeliveryForm() {
  const form = useForm<DeliveryFormInput>({
    resolver: zodResolver(deliverySchema) as Resolver<DeliveryFormInput>,
    defaultValues: {
      deliveryTerms: '',
      deliveryCompany: '',
      deliveryFee: null,
      deliveryMinFee: null,
    },
    mode: 'onChange',
  })

  const deliveryTerms = form.watch('deliveryTerms')
  const deliveryCompany = form.watch('deliveryCompany')
  const deliveryFee = form.watch('deliveryFee')
  const deliveryMinFee = form.watch('deliveryMinFee')

  const isFormField =
    deliveryTerms !== '' && deliveryCompany !== '' && deliveryTerms === 'free'
      ? true
      : deliveryTerms === 'conditionalFree'
        ? deliveryFee !== null && deliveryMinFee !== null
        : deliveryTerms === 'charged'
          ? deliveryFee !== null
          : false

  const deliveryFeeInput = useNumberInput(form.watch('deliveryFee'), (val) => {
    form.setValue('deliveryFee', val, { shouldValidate: true })
  })
  const deliveryMinFeeInput = useNumberInput(
    form.watch('deliveryMinFee'),
    (val) => {
      form.setValue('deliveryMinFee', val, { shouldValidate: true })
      if (form.watch('deliveryFee') !== null) form.trigger('deliveryFee')
    },
  )

  return {
    form,
    deliveryTerms,
    deliveryCompany,
    deliveryFee,
    deliveryMinFee,
    deliveryFeeInput,
    deliveryMinFeeInput,
    isFormField,
  }
}
