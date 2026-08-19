import { useEffect } from 'react'

import { Label } from '@dessert/ui'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'

import { CreateProductForm } from '../create-form/product-create.types'
import { DEFAULT_PRODUCT_OPTION } from '../create-form/use-create-product-form.hook'
import { useCreateHeaderSteps } from '../create-header/use-create-header-steps.hook'
import { ProductOptionForm } from './create-form-options-form.ui'
import { areAllOptionsValid } from './create-options-validator.utils'

const SUFFIX = ' (복사본)'
const MAX_LENGTH = 50

export const ProductOptionsArea = () => {
  const form = useFormContext<CreateProductForm>()
  const options = useWatch({ control: form.control, name: 'options' })
  const { fields, remove, insert } = useFieldArray({
    control: form.control,
    name: 'options',
  })
  const allOptionsValid = areAllOptionsValid(options)
  const { setProductFields } = useCreateHeaderSteps()

  // StageTab 완료 여부는 옵션 배열 전체를 기준으로만 갱신합니다.
  useEffect(() => {
    setProductFields({ productOptions: allOptionsValid })
  }, [allOptionsValid, setProductFields])

  return (
    <>
      <div className="mb-24 flex items-center gap-2">
        <Label
          label="상품 옵션 정보"
          className="typo-heading-20-sb text-gray-900"
        />
      </div>
      {fields.map((field, index) => (
        <ProductOptionForm
          key={field.id}
          index={index}
          isLast={index === fields.length - 1}
          onDelete={() => fields.length > 1 && remove(index)}
          onCopy={() => {
            const current = form.getValues(`options.${index}`)
            const truncatedName = current.optionName.slice(
              0,
              MAX_LENGTH - SUFFIX.length,
            )
            insert(index + 1, {
              ...current,
              optionName: `${truncatedName}${SUFFIX}`,
            })
          }}
          onAdd={() => insert(index + 1, DEFAULT_PRODUCT_OPTION)}
        />
      ))}
    </>
  )
}
