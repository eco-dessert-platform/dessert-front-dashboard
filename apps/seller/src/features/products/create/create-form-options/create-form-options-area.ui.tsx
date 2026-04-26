import { Label } from '@dessert/ui'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { CreateFormType } from '@/entity/products/create/create-form'

import { ProductOptionForm } from './create-form-options-form.ui'
import { DEFAULT_PRODUCT_OPTION } from '../create-form'

export const ProductOptionsArea = () => {
  const form = useFormContext<CreateFormType>()
  const { fields, append, remove, insert } = useFieldArray({
    control: form.control,
    name: 'options',
  })

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
            insert(index + 1, {
              ...current,
              optionName: `${current.optionName} (복사본)`,
            })
          }}
          onAdd={() => insert(index + 1, DEFAULT_PRODUCT_OPTION)}
        />
      ))}
    </>
  )
}
