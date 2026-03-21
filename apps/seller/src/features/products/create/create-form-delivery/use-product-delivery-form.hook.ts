import { useFormContext } from 'react-hook-form'

import { CreateProductForm } from '@/pages/products/create/create-form'

import { useNumberInput } from '../create-calculation/create-form-number-input.hook'

export function useProductDeliveryForm() {
  const form = useFormContext<CreateProductForm>()

  const deliveryTerms = form.watch('deliveryTerms')
  const deliveryCompany = form.watch('deliveryCompany')
  const deliveryFee = form.watch('deliveryFee')
  const deliveryMinFee = form.watch('deliveryMinFee')

  const isFormField =
    deliveryTerms !== '' && deliveryTerms === 'free' && deliveryCompany !== ''
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
