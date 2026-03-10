import { useFormContext } from 'react-hook-form'
import { useNumberInput } from '../create-form-number-input.hook'
import { CreateProductForm } from '@/pages/products/create/create-form'

export function useProductInfoForm() {
  const form = useFormContext<CreateProductForm>()

  // 실시간으로 가격/할인 최종 금액 계산
  const productName = form.watch('productName')
  const price = form.watch('price')
  const discountAmount = form.watch('discountAmount')
  const discountType = form.watch('discountType')
  const productionTime = form.watch('productionTime')

  const isFormField =
    price !== null &&
    discountAmount !== null &&
    productName.length >= 3 &&
    productName.length <= 49 &&
    productionTime !== '' &&
    form.formState.isValid

  const finalPrice =
    price !== null && discountAmount !== null
      ? discountType === 'won'
        ? Math.max(price - discountAmount, 0)
        : Math.max(price * (1 - discountAmount / 100), 0)
      : null

  const priceInput = useNumberInput(form.watch('price'), (val) => {
    form.setValue('price', val, { shouldValidate: true })
    if (form.watch('discountAmount') !== null) form.trigger('discountAmount')
  })
  const discountInput = useNumberInput(form.watch('discountAmount'), (val) => {
    form.setValue('discountAmount', val, { shouldValidate: true })
    if (form.watch('price') !== null) form.trigger('price')
  })

  // const onSubmit = form.handleSubmit((data) => {
  //   console.log('제출된 데이터:', data)
  // })

  return {
    form,
    finalPrice,
    isFormField,
    productName,
    price,
    discountAmount,
    discountType,
    productionTime,
    priceInput,
    discountInput,
  }
}
