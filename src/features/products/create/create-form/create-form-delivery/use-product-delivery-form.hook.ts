import { useForm, Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { deliverySchema } from './create-delivery.schema'
import { useNumberInput } from '../create-form-number-input.hook'
import { DeliveryFormInput } from '@/entity/products/create/product-form.type'

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
