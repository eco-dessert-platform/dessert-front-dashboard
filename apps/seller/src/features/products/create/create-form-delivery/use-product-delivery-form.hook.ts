import { useEffect, useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { useNumberInput } from '../create-calculation/create-form-number-input.hook'
import { CreateProductForm } from '../create-form/product-create.types'

export function useProductDeliveryForm() {
  const form = useFormContext<CreateProductForm>()
  const [isTouched, setIsTouched] = useState(false)
  const { errors } = form.formState

  const fields = [
    'deliveryTerms',
    'deliveryCompany',
    'deliveryFee',
    'deliveryMinFee',
  ] as const
  const values = form.watch(fields)
  const [deliveryTerms, deliveryCompany, deliveryFee, deliveryMinFee] = values

  const isFormField = (() => {
    const hasError = fields.some((field) => !!errors[field])
    if (hasError) return false

    if (deliveryTerms === '' || deliveryCompany === '') return false

    if (deliveryTerms === 'conditionalFree') {
      return deliveryFee !== null && deliveryMinFee !== null
    }
    if (deliveryTerms === 'charged') {
      return deliveryFee !== null
    }

    return true
  })()

  // 조건 변경 시 실시간 에러 갱신
  useEffect(() => {
    if (!isTouched) return
    if (deliveryFee !== null) form.trigger('deliveryFee')
    if (deliveryMinFee !== null) form.trigger('deliveryMinFee')
  }, [deliveryTerms, deliveryCompany, deliveryFee, deliveryMinFee])

  const deliveryFeeInput = useNumberInput(deliveryFee, (val) => {
    setIsTouched(true)
    form.setValue('deliveryFee', val, { shouldValidate: true })
  })
  const deliveryMinFeeInput = useNumberInput(deliveryMinFee, (val) => {
    setIsTouched(true)
    form.setValue('deliveryMinFee', val, { shouldValidate: true })
    if (val !== null) form.trigger('deliveryFee')
  })

  const handleDeliveryTermsChange = (val: string) => {
    form.setValue('deliveryTerms', val as CreateProductForm['deliveryTerms'], {
      shouldValidate: true,
    })
    form.clearErrors(['deliveryFee', 'deliveryMinFee'])
    if (val === 'free') {
      form.setValue('deliveryFee', null)
      form.setValue('deliveryMinFee', null)
    } else if (val === 'charged') {
      form.setValue('deliveryMinFee', null)
    }
  }

  return {
    form,
    deliveryTerms,
    deliveryCompany,
    deliveryFee,
    deliveryMinFee,
    deliveryFeeInput,
    deliveryMinFeeInput,
    isFormField,
    handleDeliveryTermsChange,
  }
}
