import { Path, useFormContext } from 'react-hook-form'

import { CreateInfoValidator } from './create-info-validator.utils'
import { useNumberInput } from '../create-calculation/create-form-number-input.hook'
import { CreateProductForm } from '../create-form/product-create.types'

export function useProductInfoForm() {
  const form = useFormContext<CreateProductForm>()

  const productFields: Array<Path<CreateProductForm>> = [
    'productName',
    'price',
    'discountAmount',
    'discountType',
    'productionTime',
  ]

  const { isValid: isFormField, values } =
    CreateInfoValidator<CreateProductForm>(productFields)

  const [productName, price, discountAmount, discountType, productionTime] =
    values as [
      CreateProductForm['productName'],
      CreateProductForm['price'],
      CreateProductForm['discountAmount'],
      CreateProductForm['discountType'],
      CreateProductForm['productionTime'],
    ]

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
