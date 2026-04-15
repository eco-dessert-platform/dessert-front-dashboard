import { useFormContext } from 'react-hook-form'

import { useNumberInput } from '../create-calculation/create-form-number-input.hook'
import { CreateProductForm } from '../create-form/product-create.types'

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
    productionTime !== ''

  const finalPrice =
    price !== null && discountAmount !== null
      ? discountType === 'won'
        ? Math.max(price - discountAmount, 0)
        : Math.max(price * (1 - discountAmount / 100), 0)
      : null

  const priceInput = useNumberInput(price, (val) => {
    form.setValue('price', val, { shouldValidate: true })
    if (discountAmount !== null) form.trigger('discountAmount')
  })
  const discountInput = useNumberInput(discountAmount, (val) => {
    form.setValue('discountAmount', val, { shouldValidate: true })
    if (price !== null) form.trigger('price')
  })

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
