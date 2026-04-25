import { Input, Label, Radio } from '@dessert/ui'
import { Control, Controller, FieldErrors, useWatch } from 'react-hook-form'

import {
  DISCLOSURE_FIELDS,
  RADIO_OPTIONS,
} from '@/entity/products/create/create-disclosure'
import { CreateFormType } from '@/entity/products/create/create-form'
import { cn } from '@/shared/libs/utils'

import { useProductDisclosureForm } from './use-product-disclosure-form.hook'

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
  control: Control<CreateFormType>
  errors: FieldErrors<CreateFormType>
}) => {
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
        render={({ field: { value, onChange, name } }) => (
          <Radio
            name={name}
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
            {...inputField}
            placeholder={
              modeValue === 'default'
                ? '해당항목 없음' // 기획 문구
                : '3자 이상 50자 미만으로 입력해 주세요'
            }
            disabled={modeValue === 'default'}
            className="w-full"
            error={!!errors.productInfoNotice?.[field.key]}
            errorMessage={errors.productInfoNotice?.[field.key]?.message}
            maxLength={49}
            // value가 null일 경우를 대비해 빈 문자열 처리
            value={(inputField.value as string) ?? ''}
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
