import { useEffect } from 'react'

import { Button, Checkbox, Input, Label, Select, Switch } from '@dessert/ui'
import { Copy, Trash2 } from 'lucide-react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

import { ProductOptionFormInput } from '@/entity/products'
import { NUTRITION_FIELDS } from '@/entity/products/create/create-options/product-nutritions.constant'
import { MAIN_CATEGORY_OPTIONS } from '@/entity/products/create/create-options/product-options.constant'
import DaySelector from '@/shared/block/day-selector/day-selector'

import { useProductOptionForm } from './use-product-options.form.hook'
import { CreateProductForm, useCreateFormSteps } from '../create-form'
import { ProductOptionForm } from './create-form-options-form.ui'
import { InfoTooltip } from '../create-form/info-tooltip.ui'
import { DEFAULT_PRODUCT_OPTION } from '../create-form/use-create-product-form.hook'

export const ProductOptionsArea = () => {
  const form = useFormContext<CreateProductForm>()
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
        <>
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
        </>
      ))}
    </>
  )
}
