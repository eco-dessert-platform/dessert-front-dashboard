import { LabelWithTooltip } from '../../ui/label-with-tooltip'
import Input from '@/shared/components/ui/input/input'
import { InfoTooltip } from '../../ui/info-tooltip'
import { Switch } from '@/shared/components/ui/switch/switch'
import Dropdown from '@/shared/components/ui/dropdown/dropdown'
import { useProductForm } from '@/pages/products/use-product-form.hook'
import { useNumberInput } from '@/pages/products/use-number-input.hook'
import { Controller } from 'react-hook-form'
import { productionTime } from '@/entity/products/create/product-info/production-time.constants'
import { productDiscountType } from '@/entity/products/create/product-info/product-discount-type.constants'
import { useFormSteps } from '@/features/products/create/form-steps.context'
import { useEffect } from 'react'

export const ProductInfoArea = () => {
  const { form, finalPrice, onSubmit } = useProductForm()
  const {
    control,
    watch,
    trigger,
    setValue,
    register,
    formState: { errors, isValid },
  } = form
  const { productInfo, setProductInfo } = useFormSteps()

  useEffect(() => {
    setProductInfo(isValid)
  }, [isValid])

  const discountType = watch('discountType')
  const price = form.watch('price')

  const priceInput = useNumberInput(watch('price'), (val) => {
    setValue('price', val, { shouldValidate: true })
    trigger('discountAmount')
  })
  const discountInput = useNumberInput(watch('discountAmount'), (val) => {
    setValue('discountAmount', val, { shouldValidate: true })
    trigger('price')
  })

  return (
    <>
      <Input
        label="상품명"
        required
        placeholder="상품명을 3~50자 미만으로 입력해주세요"
        className="gap-8 pt-24"
        labelClassName="typo-heading-18-r"
        error={!!errors.productName}
        errorMessage={errors.productName?.message}
        {...register('productName')}
      />

      <div className="flex items-center gap-12 pt-32">
        <LabelWithTooltip
          title="신선식품"
          titleRequire
          titleTooltipProps={
            <InfoTooltip iconSize={20}>
              신선식품 안내 <br></br>
              <ul className="list-disc pl-16">
                <li>주문 즉시 제작되거나 빠르게 소비해야 하는 상품이에요.</li>
                <li>
                  상품 특성상 제작이 시작된 후에는 주문 취소가 불가능합니다.
                </li>
              </ul>
            </InfoTooltip>
          }
          className="typo-heading-18-r"
        />
        <Controller
          control={control}
          name="isFresh"
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </div>
      <p className="mt-4 typo-title-16-r text-gray-600">
        주문 제작 상품의 경우 신선식품으로 설정해주세요.
      </p>

      <LabelWithTooltip
        title="상품 제작 시간"
        titleRequire
        className="pt-32 typo-heading-18-r"
      />
      <p className="mt-2 typo-title-16-r text-gray-600">
        고객 주문 취소 시점에 활용되니 정확히 입력해주세요.
      </p>
      <Controller
        control={control}
        name="productionTime"
        render={({ field }) => (
          <Dropdown
            options={productionTime}
            value={field.value}
            className="mt-8"
            onSelect={field.onChange}
          />
        )}
      />

      <div className="grid grid-cols-2 gap-32 pt-32">
        <div>
          <div className="mt-8 flex w-full gap-8">
            <Input
              required
              label="가격"
              labelClassName="typo-heading-18-r"
              placeholder="0~100,000"
              className="flex-1"
              value={priceInput.displayValue}
              onChange={priceInput.handleChange}
              error={!!errors.price}
              errorMessage={errors.price?.message}
            />
            <span className="relative top-[44px]">원</span>
          </div>
        </div>
        <div>
          <div className="mt-8 flex gap-8">
            <Input
              required
              label="할인 금액"
              placeholder={discountType === 'won' ? '0~100,000' : '0~100'}
              className="flex-1"
              labelClassName="typo-heading-18-r"
              value={discountInput.displayValue}
              onChange={discountInput.handleChange}
              error={!!errors.discountAmount}
              errorMessage={errors.discountAmount?.message}
            />
            <Controller
              control={control}
              name="discountType"
              render={({ field }) => (
                <Dropdown
                  options={productDiscountType}
                  value={field.value}
                  placeholder="원"
                  onSelect={(val) => {
                    field.onChange(val)
                    setValue('discountAmount', null, { shouldValidate: true })
                  }}
                  className="relative top-[34px] max-w-[65px]"
                />
              )}
            />
          </div>
        </div>
      </div>

      {finalPrice !== null && (
        <div className="mt-32 flex w-full items-center justify-between rounded-10 bg-primary-50 px-24 py-10">
          <p className="typo-heading-18-b">최종 상품 금액</p>

          <div className="flex items-center gap-8">
            <p className="typo-heading-18-r text-gray-600 line-through">
              {price?.toLocaleString('ko-KR')}
            </p>
            <p className="flex items-center gap-4 typo-heading-18-r text-primary-500">
              <span className="typo-heading-24-sb">
                {finalPrice.toLocaleString('ko-KR')}
              </span>
              원
            </p>
          </div>
        </div>
      )}
    </>
  )
}
