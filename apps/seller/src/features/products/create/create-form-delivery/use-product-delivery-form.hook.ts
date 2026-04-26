import { useFormContext } from 'react-hook-form'

import { useNumberInput } from '../create-calculation'
import { CreateProductForm } from '../../../../entity/products/create/create-form/create-form.types'

export function useProductDeliveryForm() {
  const form = useFormContext<CreateProductForm>()

  const deliveryTerms = form.watch('deliveryTerms')
  const deliveryCompany = form.watch('deliveryCompany')
  const deliveryFee = form.watch('deliveryFee')
  const deliveryMinFee = form.watch('deliveryMinFee')

  const isFormField = (() => {
    if (deliveryTerms === 'free') return deliveryCompany !== ''
    if (deliveryTerms === 'conditionalFree')
      return deliveryFee !== null && deliveryMinFee !== null
    if (deliveryTerms === 'charged') return deliveryFee !== null
    return false
  })()

  const deliveryFeeInput = useNumberInput(deliveryFee, (val) => {
    form.setValue('deliveryFee', val, { shouldValidate: true })
  })
  const deliveryMinFeeInput = useNumberInput(deliveryMinFee, (val) => {
    form.setValue('deliveryMinFee', val, { shouldValidate: true })
    if (val !== null) form.trigger('deliveryFee')
  })

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
