import { useEffect } from 'react'

import { Button, Checkbox, Input, Label, Select, Switch } from '@dessert/ui'
import { Copy, Trash2 } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { NUTRITION_FIELDS } from '@/entity/products/create/create-options/product-nutritions.constant'
import { MAIN_CATEGORY_OPTIONS } from '@/entity/products/create/create-options/product-options.constant'
import DaySelector from '@/shared/block/day-selector/day-selector'

import { useProductOptionForm } from './use-product-options.form.hook'
import { useCreateFormSteps } from '../create-form/use-create-form-steps.hook'
import { InfoTooltip } from '../create-form/info-tooltip.ui'

export const ProductOptionsArea = () => {
  const {
    form,
    mainCategory,
    subCategoryOptions,
    additionalPrice,
    shippingDays,
    hasNutrition,
    ingredientCategories,
    totalPrice,
    isFormField,
    handleMainCategoryChange,
    toggleIngredient,
    additionalPriceInput,
    stockInput,
    nutritionInputs,
    toggleShippingDay,
  } = useProductOptionForm()

  const {
    control,
    register,
    formState: { errors },
  } = form

  const { setProductFields } = useCreateFormSteps()

  useEffect(() => {
    setProductFields((prev) => ({ ...prev, productOptions: isFormField }))
  }, [isFormField, setProductFields])

  const handleDelete = () => {
    //삭제 기능
  }

  const handleCopy = () => {
    //복사 기능
  }

  return (
    <>
      <div className="mb-24 flex items-center gap-2">
        <Label
          label="상품 옵션 정보"
          className="typo-heading-20-sb text-gray-900"
        />
      </div>

      {/* 카테고리 */}
      <div className="grid grid-cols-2 items-end gap-32">
        <Controller
          control={control}
          name="mainCategory"
          render={({ field }) => (
            <Select
              options={MAIN_CATEGORY_OPTIONS}
              label="상품 카테고리"
              required
              placeholder="대분류"
              labelClassName="typo-heading-18-r mb-8"
              value={field.value}
              onValueChange={(val) => handleMainCategoryChange(val)}
              error={!!errors.mainCategory}
              errorMessage={errors.mainCategory?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="subCategory"
          render={({ field }) => (
            <Select
              options={subCategoryOptions}
              placeholder="중분류"
              labelClassName="typo-heading-18-r mb-8"
              className="self-auto"
              value={field.value}
              onValueChange={field.onChange}
              disabled={!mainCategory}
              error={!!errors.subCategory}
              errorMessage={errors.subCategory?.message}
            />
          )}
        />
      </div>

      {/* 옵션명 + 성분 카테고리 */}
      <div className="grid grid-cols-2 gap-32 pt-32">
        <Input
          label="상품 옵션명"
          required
          placeholder="상품 옵션명을 3~50자 미만으로 입력해주세요"
          className="gap-8"
          labelClassName="typo-heading-18-r"
          error={!!errors.optionName}
          errorMessage={errors.optionName?.message}
          style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
          {...register('optionName')}
        />
        <div>
          <Label
            label="성분 카테고리"
            required
            className="mb-3.5 block typo-heading-18-r"
          />
          {errors.ingredientCategories && (
            <p className="mb-4 text-sm text-red-500">
              {errors.ingredientCategories.message}
            </p>
          )}
          <div className="flex gap-10">
            <Checkbox
              label="글루텐 프리"
              type="single"
              checked={ingredientCategories.includes('glutenFree')}
              onCheckedChange={() => toggleIngredient('glutenFree')}
            />
            <Checkbox
              label="비건"
              type="single"
              checked={ingredientCategories.includes('vegan')}
              onCheckedChange={() => toggleIngredient('vegan')}
            />
          </div>
        </div>
      </div>

      <div className="pt-32">
        <Label label="상품 옵션 가격" required className="typo-heading-18-r" />
        <div className="mt-8 flex gap-16 rounded-10 border border-gray-300 p-16">
          <div className="flex w-full gap-8">
            <Input
              label="상품 가격"
              labelClassName="typo-title-16-r"
              placeholder="0~100,000"
              className="flex-1"
              // value={toLocaleString('ko-KR') ?? ''}
              disabled
            />
            <span className="relative top-11">원</span>
          </div>
          <div className="flex w-full gap-8">
            <Input
              label="추가 가격"
              labelClassName="typo-title-16-r"
              placeholder="-100,000~100,000"
              className="flex-1"
              value={additionalPriceInput.displayValue}
              onChange={additionalPriceInput.handleChange}
              error={!!errors.additionalPrice && additionalPrice !== null}
              errorMessage={errors.additionalPrice?.message}
            />
            <span className="relative top-11">원</span>
          </div>
        </div>
        {totalPrice !== null && (
          <div className="mt-8 flex justify-end">
            <p className="typo-title-16-r text-gray-600">
              최종 가격:
              <span className="typo-heading-18-b text-gray-900">
                {totalPrice.toLocaleString('ko-KR')}원
              </span>
            </p>
          </div>
        )}
      </div>

      {/* 재고 수량 + 발송 요일 */}
      <div className="grid grid-cols-2 gap-32 pt-32">
        <div>
          <Label label="재고 수량" required className="typo-heading-18-r" />
          <p className="mt-2 mb-8 typo-title-16-r text-gray-600">
            주문 제작 상품인 경우 재고를 1000개 이상으로 설정해주세요.
          </p>
          <Input
            placeholder="재고 수량을 입력하세요"
            className="flex-1"
            value={stockInput.displayValue}
            onChange={stockInput.handleChange}
          />
        </div>
        <div>
          <Label
            label="상품 발송 요일"
            required
            className="typo-heading-18-r"
          />
          <p className="mt-2 mb-8 typo-title-16-r text-gray-600">
            정해진 발송 요일이 있다면 선택하세요.
          </p>
          <DaySelector
            selectedDays={shippingDays}
            onDayChange={toggleShippingDay}
          />
        </div>
      </div>

      {/* 영양 정보 */}
      <div className="flex items-center gap-12 pt-32">
        <div className="flex items-center gap-2">
          <Label
            label="영양 정보"
            required
            className="typo-heading-18-r text-gray-900"
          />
          <InfoTooltip iconSize={20}>
            아래 기준에 해당하면 상단 성분 카테고리가 자동으로 등록돼요.
            <ul className="list-disc pl-16">
              <li>저당: 100g당 5g 미만 / 100ml당 2.5g 미만</li>
              <li>고단백: 100g당 11g 이상</li>
              <li>저지방: 100g당 3g 미만 / 100ml당 1.5g 미만</li>
            </ul>
          </InfoTooltip>
        </div>
        <Controller
          control={control}
          name="hasNutrition"
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={(checked: boolean) => {
                field.onChange(checked)
                NUTRITION_FIELDS.forEach(({ key }) => {
                  const inputProps =
                    nutritionInputs[key as keyof typeof nutritionInputs]
                  inputProps.handleNull()
                })
              }}
            />
          )}
        />
      </div>

      <div className="mt-8 grid grid-cols-7 gap-8">
        {NUTRITION_FIELDS.map(({ key, label }) => {
          const inputProps =
            nutritionInputs[key as keyof typeof nutritionInputs]
          return (
            <div
              key={key}
              className="flex flex-col items-center gap-8 rounded-10 border border-gray-300 bg-gray-50 p-20"
            >
              <p>{label}</p>
              <Input
                placeholder="0"
                className="text-center"
                disabled={!hasNutrition}
                value={inputProps.displayValue}
                onChange={inputProps.handleChange}
              />
            </div>
          )
        })}
      </div>
      <p className="mt-4 typo-title-16-r text-gray-600">
        영양 성분은 1회 제공량 기준으로 작성하세요.
      </p>

      {/* 삭제 / 복사 */}
      <div className="flex items-center justify-end gap-16">
        <button className="text-gray-700" onClick={handleDelete}>
          <Trash2 size={20} />
        </button>
        <button className="text-gray-700" onClick={handleCopy}>
          <Copy size={20} />
        </button>
      </div>

      <Button
        title="상품 추가"
        variant="primary-outlined"
        size="lg"
        className="mt-32 w-full"
      />
    </>
  )
}
