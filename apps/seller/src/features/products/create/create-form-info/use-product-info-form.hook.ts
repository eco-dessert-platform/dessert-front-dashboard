import { useFormContext } from 'react-hook-form'

import { CreateProductForm } from '../../../../entity/products/create/create-form/product-create.types'
import { useNumberInput } from '../create-calculation'
// import { useCreateFormSteps } from '../create-form'
import { useCreateHeaderSteps } from '../create-store'

export function useProductInfoForm() {
  const form = useFormContext<CreateProductForm>()
  const { setProductPrice } = useCreateHeaderSteps()

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
      ? discountType === 'AMOUNT'
        ? Math.max(price - discountAmount, 0)
        : Math.max(price * (1 - discountAmount / 100), 0)
      : null

  const priceInput = useNumberInput(price, (val) => {
    form.setValue('price', val, { shouldValidate: true })
    if (discountAmount !== null) form.trigger('discountAmount')
    //상품 옵션 정보의 가격에 사용될 값을 전역 상태에 업데이트
    setProductPrice(val || 0)
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
