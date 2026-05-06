import { Input, Label, Radio } from '@dessert/ui'
import { Control, Controller, FieldErrors, useWatch } from 'react-hook-form'

import { cn } from '@/shared/libs/utils'

import { DISCLOSURE_FIELDS, RADIO_OPTIONS } from './product-disclosure.constant'
import { useProductDisclosureForm } from './use-product-disclosure-form.hook'
import { CreateProductForm } from '../create-form/product-create.types'

/**
 * [Refactoring] DisclosureFieldItem
 * 개별 필드 단위를 분리하여 useWatch를 사용함으로써,
 * 특정 필드 수정 시 전체 섹션이 리렌더링 되는 것을 방지합니다.
 */
const DisclosureFieldItem = ({
  field,
  index,
  control,
  errors,
}: {
  field: (typeof DISCLOSURE_FIELDS)[number]
  index: number
  control: Control<CreateProductForm>
  errors: FieldErrors<CreateProductForm>
}) => {
  // 개별 모드 값만 감시하여 리렌더링 범위 최소화
  const modeValue = useWatch({
    control,
    name: `productInfoNoticeMode.${field.key}`,
  })
  const isLastItem = index === DISCLOSURE_FIELDS.length - 1

  return (
    <div className={cn('flex flex-col gap-8', isLastItem && 'col-span-2')}>
      <div className="flex items-center gap-2">
        <Label
          label={field.label}
          required
          className="typo-heading-18-r text-gray-800"
        />
      </div>

      <Controller
        control={control}
        name={`productInfoNoticeMode.${field.key}`}
        render={({ field: { value, onChange } }) => (
          <Radio
            name={`productInfoNoticeMode.${field.key}`}
            options={RADIO_OPTIONS}
            value={value as string}
            onChange={onChange}
            className="gap-12"
            labelClassName="gap-8"
          />
        )}
      />

      <Controller
        control={control}
        name={`productInfoNotice.${field.key}`}
        render={({ field: inputField }) => (
          <Input
            placeholder={
              modeValue === 'default' && field.key !== 'productName'
                ? '해당항목 없음'
                : '3자 이상 50자 미만으로 입력해 주세요'
            }
            disabled={modeValue === 'default'}
            className="w-full"
            error={!!errors.productInfoNotice?.[field.key]}
            errorMessage={errors.productInfoNotice?.[field.key]?.message}
            style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
            maxLength={49}
            value={inputField.value as string}
            onChange={inputField.onChange}
            onBlur={inputField.onBlur}
            name={inputField.name}
          />
        )}
      />
    </div>
  )
}

export const ProductDisclosureArea = () => {
  const { control, errors } = useProductDisclosureForm()

  return (
    <div className="flex flex-col">
      <div className="mb-24 flex items-center gap-2">
        <Label
          label="상품 정보 제공 고시"
          className="typo-heading-20-sb text-gray-900"
        />
      </div>

      <div className="grid grid-cols-2 gap-32">
        {DISCLOSURE_FIELDS.map((field, index) => (
          <DisclosureFieldItem
            key={field.key}
            field={field}
            index={index}
            control={control}
            errors={errors}
          />
        ))}
      </div>
    </div>
  )
}
