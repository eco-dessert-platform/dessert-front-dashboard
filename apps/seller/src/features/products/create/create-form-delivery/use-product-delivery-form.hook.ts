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

    // 허용된 배송 조건만 완료 처리(미허용 값은 fail-closed)
    if (deliveryTerms === 'free') return true
    if (deliveryTerms === 'charged') {
      return deliveryFee !== null
    }
    if (deliveryTerms === 'conditionalFree') {
      return deliveryFee !== null && deliveryMinFee !== null
    }

    return false
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
    if (val === 'free') {
      // 둘 다 비필수: 값과 에러를 모두 제거
      form.clearErrors(['deliveryFee', 'deliveryMinFee'])
      form.setValue('deliveryFee', null)
      form.setValue('deliveryMinFee', null)
    } else if (val === 'charged') {
      // 배송비 필수 / 최소금액 비필수
      form.clearErrors('deliveryMinFee')
      form.setValue('deliveryMinFee', null)
      form.trigger('deliveryFee')
    } else if (val === 'conditionalFree') {
      // 둘 다 필수: null이어도 검증을 트리거해 누락 에러를 노출
      form.trigger(['deliveryFee', 'deliveryMinFee'])
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
