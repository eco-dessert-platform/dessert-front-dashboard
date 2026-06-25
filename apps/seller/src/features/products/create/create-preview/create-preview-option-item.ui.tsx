import { ChevronUpIcon } from '@dessert/icons'

import { EssentialOptions } from '@/features/products/create/create-header/essential-options.constants'
import { DaySelector } from '@/widgets/day-selector'

import { ProductOptionsType } from '../create-form-options'

const getOptionTags = (option: ProductOptionsType) => {
  const tags: string[] = []
  const { ingredientCategories, protein, fat, sugar } = option
  if (ingredientCategories.includes('glutenFree'))
    tags.push(EssentialOptions[0].title)
  if (ingredientCategories.includes('vegan'))
    tags.push(EssentialOptions[1].title)
  if (protein !== null && protein >= 11) tags.push(EssentialOptions[2].title)
  if (fat !== null && fat < 3) tags.push(EssentialOptions[3].title)
  if (sugar !== null && sugar < 5) tags.push(EssentialOptions[4].title)
  return tags
}

interface CreatePreviewOptionItemUiProps {
  option: ProductOptionsType
  idx: number
  productPrice: number | null
  discountAmount: number
}

export const CreatePreviewOptionItemUi = ({
  option,
  idx,
  productPrice,
  discountAmount,
}: CreatePreviewOptionItemUiProps) => {
  const basePrice = productPrice ?? 0
  const additionalPrice = option.additionalPrice ?? 0
  const originalPrice = basePrice + additionalPrice
  const finalPrice = originalPrice - discountAmount
  const discountRate =
    originalPrice > 0 ? Math.round((discountAmount / originalPrice) * 100) : 0
  const optionTags = getOptionTags(option)
  const hasPrice = productPrice !== null
  const displayDiscountRate = hasPrice ? `${discountRate}%` : '{{할인율}}'
  const displayFinalPrice = hasPrice
    ? `${finalPrice.toLocaleString()}원`
    : '{{할인가격}}'

  return (
    <div className="border-t border-gray-300">
      <div className="flex items-center justify-between p-16">
        <h4 className="typo-title-14-r text-gray-800">
          {option.optionName || `{{옵션명 ${idx + 1}}}`}
        </h4>
        <div className="flex items-center gap-6">
          {discountAmount > 0 && (
            <span className="typo-body-12-r text-gray-400 line-through">
              {originalPrice.toLocaleString()}원
            </span>
          )}
          <span className="typo-title-14-sb text-primary-500">
            {displayDiscountRate}
          </span>
          <span className="typo-title-14-sb text-gray-900">
            {displayFinalPrice}
          </span>
          <ChevronUpIcon className="ml-8 size-20 text-gray-900" />
        </div>
      </div>

      {/* 태그 영역 */}
      <div className="flex flex-wrap gap-6 border-t border-gray-300 p-16">
        {optionTags.length > 0 ? (
          optionTags.map((tag) => (
            <span
              key={tag}
              className="rounded-4 border border-gray-200 px-6 py-2 typo-body-10-r text-gray-600"
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="typo-body-12-r text-gray-400">
            성분 카테고리 미입력
          </span>
        )}
      </div>

      <div className="p-16 pt-0">
        <p className="mb-2 typo-body-12-sb text-gray-500">주문 가능날짜</p>
        <div className="flex w-full items-center justify-between">
          <DaySelector
            selectedDays={option.shippingDays}
            className="gap-4"
            size="small"
          />
          <div className="rounded-8 bg-gray-900 px-10 py-[5.5px] typo-body-12-m text-white">
            빵켓팅 알림 신청
          </div>
        </div>
      </div>

      {option.hasNutrition && (
        <div className="p-16 pt-0">
          <div className="mb-10 flex items-center justify-between">
            <span className="mb-2 typo-body-12-sb text-gray-500">영양정보</span>
            <span className="typo-body-12-sb text-gray-700">
              총 내용량 {option.totalWeight ?? 0}g / {option.calories ?? 0}kcal
            </span>
          </div>
          <div className="mt-8 grid grid-cols-4 gap-6">
            {[
              { label: '단백질', key: 'protein' as const },
              { label: '당류', key: 'sugar' as const },
              { label: '탄수화물', key: 'carbohydrate' as const },
              { label: '지방', key: 'fat' as const },
            ].map((nutri) => (
              <div
                key={nutri.key}
                className="rounded-8 bg-gray-100 p-12 text-center"
              >
                <div className="mb-4 typo-body-11-r text-gray-500">
                  {nutri.label}
                </div>
                <div className="typo-title-14-sb text-gray-900">
                  {option[nutri.key] ?? 0}g
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
