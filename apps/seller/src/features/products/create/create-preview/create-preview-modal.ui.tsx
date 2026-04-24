import { BbanggreuiOvenLogo } from '@dessert/icons'
import { Button } from '@dessert/ui'
import { ChevronDown, ChevronUp, Heart, Star } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { useCreateFormSteps } from '../create-form'
import { CreateProductForm } from '../create-form/product-create.types'

const DaySelector = ({ selectedDays }: { selectedDays: string[] }) => {
  const days = [
    { key: 'mon', label: '월' },
    { key: 'tue', label: '화' },
    { key: 'wed', label: '수' },
    { key: 'thu', label: '목' },
    { key: 'fri', label: '금' },
    { key: 'sat', label: '토' },
    { key: 'sun', label: '일' },
  ]
  return (
    <div className="flex gap-4">
      {days.map((day) => (
        <span
          key={day.key}
          className={`flex size-32 items-center justify-center rounded-full border typo-body-12-sb ${
            selectedDays.includes(day.key)
              ? 'border-[#F26565] bg-[#F26565] text-white'
              : 'border-gray-100 bg-white text-gray-400'
          }`}
        >
          {day.label}
        </span>
      ))}
    </div>
  )
}

export const ProductPreviewModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const { watch } = useFormContext<CreateProductForm>()
  const formData = watch()
  const { activeTags, productPrice, nutritionData } = useCreateFormSteps()

  if (!isOpen) return null

  const price = formData.price ?? 0
  const discountAmount = formData.discountAmount ?? 0
  const discountType = formData.discountType

  const discountPercent =
    discountType === 'won'
      ? price > 0
        ? Math.round((discountAmount / price) * 100)
        : 0
      : discountAmount // percentage면 그대로

  const totalPrice =
    discountType === 'won'
      ? price - discountAmount
      : Math.round(price * (1 - discountAmount / 100))

  //tags
  const activeTagList = Object.entries(activeTags)
    .filter(([, value]) => value)
    .map(([key]) => key)

  // mainImage를 ObjectURL로 변환해서 미리보기
  const mainImageUrl = formData.mainImage
    ? URL.createObjectURL(formData.mainImage)
    : null
  const extraImageUrls = (formData.extraImages ?? []).map((f) =>
    URL.createObjectURL(f),
  )
  const allImageUrls = mainImageUrl ? [mainImageUrl, ...extraImageUrls] : []

  const options = formData.options ?? []

  return (
    <div
      className="fixed inset-0 z-9999 flex flex-col items-center bg-gray-100"
      onClick={onClose}
    >
      <div
        className="h-header w-screen border-b border-gray-200 bg-white px-24 py-20"
        onClick={(e) => e.stopPropagation()}
      >
        <BbanggreuiOvenLogo />
      </div>
      <div
        className="relative h-full w-150 overflow-y-auto bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. 헤더 */}
        <div className="sticky top-0 z-10 flex items-center gap-12 bg-white p-16">
          <ChevronDown className="rotate-90 text-gray-900" size={24} />
          <h1 className="flex-1 truncate typo-title-16-m text-gray-900">
            {formData.productName || '[미입력] 상품명'}
          </h1>
        </div>

        {/* 2. 탭 */}
        <div className="flex border-b border-gray-100 bg-white">
          <div className="flex-1 border-b-2 border-gray-900 py-12 text-center typo-title-14-sb text-gray-900">
            상품정보
          </div>
          <div className="flex-1 py-12 text-center typo-title-14-r text-gray-500">
            리뷰
          </div>
        </div>

        {/* 3. 이미지 */}
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden p-16">
          <div className="relative size-full overflow-hidden rounded-6 bg-gray-100">
            {allImageUrls[0] ? (
              <img
                src={allImageUrls[0]}
                alt="product preview"
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center typo-body-14-r text-gray-400">
                이미지를 등록해주세요
              </div>
            )}
            <div className="absolute top-16 left-16 rounded-4 bg-[#F26565] px-8 py-4 typo-body-12-sb text-white">
              묶음상품
            </div>
            <div className="absolute right-10 bottom-10 rounded-full bg-black/50 px-10 py-4 typo-body-12-r text-white">
              1 / {allImageUrls.length || 1}
            </div>
          </div>
        </div>

        {/* 4. 상품 기본 정보 */}
        <div className="flex w-full items-center justify-between bg-white px-16 py-10">
          <div className="mb-16 flex items-center gap-6">
            <div className="size-24 rounded-6 bg-gray-500" />
            <p className="typo-title-14-m text-gray-600">Brand Name</p>
          </div>
          <Heart size={18} color="text-gray-300" />
        </div>

        <div className="border-t border-gray-300 bg-white p-16">
          <h2 className="typo-title-16-r text-gray-800">
            {formData.productName || '[미입력] 상품명'}
          </h2>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="typo-heading-18-r text-primary-500">
                {discountPercent > 0 ? `${discountPercent}%` : ''}
              </span>
              <span className="typo-heading-18-sb text-gray-900">
                {totalPrice > 0 ? totalPrice.toLocaleString() : '0'}원~
              </span>
              <span className="typo-title-14-m text-gray-500">
                맛별 가격 상이
              </span>
            </div>
            <div className="flex items-center gap-2 typo-body-14-m text-gray-900">
              <Star className="fill-yellow-400 text-yellow-400" size={18} />
              4.5 <span className="typo-body-12-r text-gray-500">
                (1,000)
              </span>{' '}
              <ChevronDown className="-rotate-90 text-gray-300" size={12} />
            </div>
          </div>
        </div>

        {/* 5. 배송비 */}
        <div className="bg-gray-50 px-16 py-12">
          <div className="typo-title-14-m text-gray-600">
            배송비{' '}
            <span className="ml-4 typo-title-14-r text-gray-800">
              {formData.deliveryFee
                ? `${formData.deliveryFee.toLocaleString()}원`
                : '미입력'}
            </span>{' '}
            {formData.deliveryMinFee && (
              <span className="ml-2 typo-body-12-r text-gray-500">
                ({formData.deliveryMinFee.toLocaleString()}원 이상 구매 시 무료)
              </span>
            )}
          </div>
        </div>

        {/* 리뷰 배지 */}
        <div className="border-t border-gray-100">
          <h3 className="p-16 typo-title-14-sb text-gray-800">
            리뷰 대표 배지
          </h3>
          <div className="flex gap-10 border-t border-gray-100 p-16">
            {['맛있어요', '담백해요', '부드러워요'].map((badge) => (
              <div
                key={badge}
                className="flex flex-1 flex-col items-center gap-4 rounded-10 border border-gray-100 text-center"
              >
                <span className="typo-body-14-m text-gray-600">{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. 상품 옵션 */}
        <div className="h-6 w-full bg-gray-100" />
        <div>
          <h3 className="p-16 typo-title-14-sb text-gray-800">상품 옵션</h3>
          {options.length === 0 ? (
            <div className="p-16 typo-body-14-r text-gray-400">
              옵션을 입력해주세요
            </div>
          ) : (
            options.map((option, idx) => (
              <div key={idx} className="border-t border-gray-300">
                <div className="flex items-center justify-between p-16">
                  <h4 className="mb-6 typo-title-14-r text-gray-800">
                    {option.optionName || `[미입력] 옵션 ${idx + 1}`}
                  </h4>
                  <div className="flex items-center gap-6">
                    <span className="typo-title-14-sb text-primary-500">
                      10%
                    </span>
                    <span className="typo-title-14-sb text-gray-900">
                      {(
                        (productPrice ?? 0) + (option.additionalPrice ?? 0)
                      ).toLocaleString()}
                      원
                    </span>
                    <ChevronUp className="ml-8 text-gray-900" size={20} />
                  </div>
                </div>

                {/* 태그 */}
                <div className="flex flex-wrap gap-6 border-t border-gray-300 p-16">
                  {activeTagList.length > 0 ? (
                    activeTagList.map((tag) => (
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

                {/* 주문 가능날짜 */}
                <div className="p-16 pt-0">
                  <p className="mb-2 typo-body-12-sb text-gray-500">
                    주문 가능날짜
                  </p>
                  <div className="flex w-full items-center justify-between">
                    <DaySelector selectedDays={option.shippingDays} />
                    <div className="rounded-8 bg-gray-900 px-10 py-[5.5px] typo-body-12-m text-white">
                      빵켓팅 알림 신청
                    </div>
                  </div>
                </div>

                {/* 영양정보 */}
                {option.hasNutrition && (
                  <div className="p-16 pt-0">
                    <div className="mb-10 flex items-center justify-between">
                      <span className="mb-2 typo-body-12-sb text-gray-500">
                        영양정보
                      </span>
                      <span className="typo-body-12-sb text-gray-700">
                        총 내용량 {option.totalWeight ?? 0}g /{' '}
                        {option.calories ?? 0}kcal
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
            ))
          )}

          <div className="p-16">
            <div className="mt-16 w-full rounded-10 border border-gray-200 py-8 text-center typo-title-16-m text-gray-800">
              간단히 보기
            </div>
          </div>
        </div>

        {/* 7. 상세 설명 */}
        <div className="mb-10 bg-white px-20 py-24 text-left">
          <div className="leading-relaxed text-gray-700">
            상품 상세 설명이 들어가는 자리입니다.
          </div>
        </div>

        {/* 하단 고정 바 */}
        <div className="sticky bottom-0 z-10 flex w-full items-center gap-10 border-t border-gray-100 bg-white p-16 px-20 py-16">
          <div className="flex size-56 items-center justify-center rounded-full border border-gray-200 text-gray-400">
            <Heart size={32} />
          </div>
          <button className="flex-1 rounded-full bg-gray-900 py-[13.5px] text-center typo-title-16-sb text-white hover:bg-black">
            구매하러가기
          </button>
        </div>
      </div>

      {/* 푸터 */}
      <div className="flex w-screen justify-end border-t border-gray-200 bg-white p-24">
        <Button title="닫기" onClick={onClose} size="lg" />
      </div>
    </div>
  )
}
