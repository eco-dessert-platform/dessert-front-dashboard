import { Button, LogoHeader } from '@dessert/ui'
import { ChevronDown, Heart, Star } from 'lucide-react'

import NoThumb from '@/assets/icons/preview/noimage.svg'
import Icon1 from '@/assets/icons/reviewBadge/badge-good.svg'
import Icon2 from '@/assets/icons/reviewBadge/badge-plain.svg'
import Icon3 from '@/assets/icons/reviewBadge/badge-soft.svg'
import { cn } from '@/shared/libs/utils'

import { CreatePreviewOptionItemUi } from './create-preview-option-item.ui'
import { useCreatePreviewPreviewHook } from './create-preview.hook'

interface ProductPreviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ProductPreviewModal = ({
  isOpen,
  onClose,
}: ProductPreviewModalProps) => {
  const {
    formData,
    productPrice,
    productDetail,
    discountPercent,
    totalPrice,
    isPriceEntered,
    //allImageUrls,
    discountAmount,
  } = useCreatePreviewPreviewHook()

  if (!isOpen) return null

  const options = formData.options ?? []
  const BADGES = [
    { label: '맛있어요', icon: Icon1 },
    { label: '담백해요', icon: Icon2 },
    { label: '부드러워요', icon: Icon3 },
  ]

  return (
    <div
      className="fixed inset-0 z-9999 flex flex-col items-center bg-gray-100"
      onClick={onClose}
    >
      <div className="h-header w-screen" onClick={(e) => e.stopPropagation()}>
        <LogoHeader />
      </div>

      <div
        className="relative h-full w-150 overflow-y-auto bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. 헤더 */}
        <div className="sticky top-0 z-10 flex items-center gap-12 bg-white p-16">
          <ChevronDown className="rotate-90 text-gray-900" size={24} />
          <h1 className="flex-1 truncate typo-title-16-m text-gray-900">
            {formData.productName || '{{상품명}}'}
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
            {/* {allImageUrls[0] ? (
              <img
                src={allImageUrls[0]}
                alt="product preview"
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-2 typo-body-14-r text-gray-400">
                <img src={NoThumb} alt="썸네일이 등록되지 않았습니다" />
                <p className="typo-title-16-m">등록된 이미지가 없습니다.</p>
              </div>
            )} */}
            {options.length > 1 && (
              <div className="absolute top-16 left-16 rounded-4 bg-[#F26565] px-8 py-4 typo-body-12-sb text-white">
                묶음상품
              </div>
            )}
            {/* <div className="absolute right-10 bottom-10 rounded-full bg-black/50 px-10 py-4 typo-body-12-r text-white">
              1 / {allImageUrls.length || 1}
            </div> */}
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
            {formData.productName || '{{상품명}}'}
          </h2>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="typo-heading-18-r text-primary-500">
                {isPriceEntered && discountPercent > 0
                  ? `${discountPercent}%`
                  : '{{할인율}}'}
              </span>
              <span className="typo-heading-18-sb text-gray-900">
                {isPriceEntered
                  ? `${totalPrice.toLocaleString()}원~`
                  : '{{상품가격}}'}
              </span>
              {options.length > 1 && (
                <span className="typo-title-14-m text-gray-500">
                  맛별 가격 상이
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 typo-body-14-m text-gray-900">
              <Star className="fill-yellow-400 text-yellow-400" size={18} />
              4.5 <span className="typo-body-12-r text-gray-500">(1,000)</span>
              <ChevronDown className="-rotate-90 text-gray-300" size={12} />
            </div>
          </div>
        </div>

        {/* 5. 배송비 */}
        <div className="bg-gray-50 px-16 py-12">
          <div className="typo-title-14-m text-gray-600">
            배송비
            <span className="ml-4 typo-title-14-r text-gray-800">
              {formData.deliveryFee
                ? `${formData.deliveryFee.toLocaleString()}원`
                : '{{배송비}}'}
            </span>
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
            {BADGES.map(({ label, icon }) => (
              <div
                key={label}
                className="flex flex-1 flex-col items-center gap-4 rounded-10 border-2 border-gray-300 p-8 text-center"
              >
                <img
                  src={icon}
                  alt={label}
                  className="size-40 object-contain"
                />
                <span className="typo-body-14-m text-gray-600">{label}</span>
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
              <CreatePreviewOptionItemUi
                key={idx}
                option={option}
                idx={idx}
                productPrice={productPrice}
                discountAmount={discountAmount}
              />
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
          {productDetail ? (
            <div
              className={cn(
                // eslint-disable-next-line better-tailwindcss/no-unknown-classes
                'ql-editor leading-relaxed text-gray-700',
              )}
              dangerouslySetInnerHTML={{ __html: productDetail }}
            />
          ) : (
            <p className="typo-body-14-r text-gray-400">
              상세 설명을 등록해주세요
            </p>
          )}
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
