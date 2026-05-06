import { useEffect } from 'react'

import { Dropdown, Input, Label } from '@dessert/ui'
import { Controller } from 'react-hook-form'

import { DeliveryCompany, DeliveryTerms } from '@/entity/products'
import { cn } from '@/shared/libs/utils'

import { useProductDeliveryForm } from './use-product-delivery-form.hook'
import { InfoTooltip } from '../create-form/info-tooltip.ui'
import { useCreateHeaderSteps } from '../create-header/use-create-header-steps.hook'

export const ProductDeliveryArea = () => {
  const {
    form,
    deliveryTerms,
    deliveryFeeInput,
    deliveryMinFeeInput,
    isFormField,
  } = useProductDeliveryForm()

  const {
    control,
    setValue,
    formState: { errors },
  } = form

  const { setProductFields } = useCreateHeaderSteps()

  useEffect(() => {
    setProductFields({ productDelivery: isFormField })
  }, [isFormField, setProductFields])

  return (
    <>
      <div className="mb-24 flex items-center gap-2">
        <Label label="배송 정보" className="typo-heading-20-sb text-gray-900" />
        <InfoTooltip>
          상품 등록을 위해선 아래 5가지 기준 중<br /> 하나 이상 충족해야 합니다.
        </InfoTooltip>
      </div>
      <div className="grid grid-cols-2 gap-32">
        <div>
          <Label
            label="배송 조건"
            required
            className="typo-heading-18-r text-gray-900"
          />
          <Controller
            control={control}
            name="deliveryTerms"
            render={({ field }) => (
              <Dropdown
                options={DeliveryTerms}
                value={field.value}
                placeholder="유료"
                onSelect={(val) => {
                  field.onChange(val)
                  if (val === 'free') {
                    setValue('deliveryFee', null, { shouldValidate: true })
                    setValue('deliveryMinFee', null, { shouldValidate: true })
                  } else if (val === 'charged') {
                    setValue('deliveryMinFee', null, { shouldValidate: true })
                  }
                }}
                className="mt-8"
              />
            )}
          />
        </div>
        <div>
          <Label
            label="택배사"
            required
            className="typo-heading-18-r text-gray-900"
          />
          <Controller
            control={control}
            name="deliveryCompany"
            render={({ field }) => (
              <Dropdown
                options={DeliveryCompany}
                value={field.value}
                placeholder="택배사 선택"
                className="mt-8"
                onSelect={field.onChange}
              />
            )}
          />
        </div>
      </div>
      {deliveryTerms !== 'free' && (
        <div
          className={cn(
            'grid grid-cols-2 gap-32 pt-32',
            deliveryTerms === 'charged' && 'grid-cols-1',
          )}
        >
          <div>
            <div className="mt-8 flex w-full gap-8">
              <Input
                required
                label="배송비"
                labelClassName="typo-heading-18-r"
                placeholder="0~100,000"
                className="flex-1"
                value={deliveryFeeInput.displayValue}
                onChange={deliveryFeeInput.handleChange}
                error={!!errors.deliveryFee}
                errorMessage={errors.deliveryFee?.message || undefined}
              />
              <span className="relative top-11">원</span>
            </div>
          </div>
          {deliveryTerms !== 'charged' && (
            <div>
              <div className="mt-8 flex w-full gap-8">
                <Input
                  required
                  label="무료 배송 최소 금액"
                  labelClassName="typo-heading-18-r"
                  placeholder="0~100,000"
                  className="flex-1"
                  value={deliveryMinFeeInput.displayValue}
                  onChange={deliveryMinFeeInput.handleChange}
                  error={!!errors.deliveryMinFee}
                  errorMessage={errors.deliveryMinFee?.message || undefined}
                />
                <span className="relative top-11">원</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
