import { BbanggreuiOvenLogo } from '@dessert/icons'
import { Button } from '@dessert/ui'
import { ChevronDown, ChevronUp, Heart, Star } from 'lucide-react' // 필요한 아이콘 라이브러리
import { useFormContext } from 'react-hook-form'

import PreviewIcon1 from '@/assets/icons/preview/preview-icon1.png'
import PreviewIcon2 from '@/assets/icons/preview/preview-icon2.png'
import PreviewIcon3 from '@/assets/icons/preview/preview-icon3.png'

import { useCreateFormSteps } from '../create-form' // 프로젝트 구조에 맞게 경로 확인 요망

export const ProductPreviewModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const { watch } = useFormContext()
  // react-hook-form에 담긴 모든 데이터를 실시간 감시
  const formData = watch()
  const { activeTags, productPrice } = useCreateFormSteps()

  if (!isOpen) return null

  // formData에서 이미지 배열을 안전하게 가져옵니다.
  const previewImages =
    formData.images && formData.images.length > 0 ? formData.images : [null] // 이미지가 없을 때 처리를 위한 배열

  return (
    <div
      className="fixed inset-0 z-9999 flex flex-col items-center bg-gray-100"
      onClick={onClose} // 배경 클릭 시 닫기
    >
      <div
        className="h-header w-screen border-b border-gray-200 bg-white px-24 py-20"
        onClick={(e) => e.stopPropagation()}
      >
        <BbanggreuiOvenLogo />
      </div>
      <div
        className="relative h-full w-[600px] overflow-y-auto bg-white"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
      >
        {/* 1. 헤더 (앱 바 형태) */}
        <div className="sticky top-0 z-10 flex items-center gap-12 bg-white p-16">
          <ChevronDown className="rotate-90 text-gray-900" size={24} />
          {/*데이터 바인딩: productName */}
          <h1 className="flex-1 truncate typo-title-16-m text-gray-900">
            {formData.productName || '[미입력] 상품명'}
          </h1>
        </div>

        {/* 2. 탭 영역 */}
        <div className="flex border-b border-gray-100 bg-white">
          <div className="flex-1 border-b-2 border-gray-900 py-12 text-center typo-title-14-sb text-gray-900">
            상품정보
          </div>
          <div className="flex-1 py-12 text-center typo-title-14-r text-gray-500">
            리뷰
          </div>
        </div>

        {/* 3. 이미지 스와이퍼 영역 (프리뷰는 첫 페이지만 표시) */}
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden p-16">
          <div className="relative size-full overflow-hidden rounded-6 bg-gray-100">
            {previewImages[0] ? (
              <img
                src={previewImages[0]}
                alt="product preview"
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center typo-body-14-r text-gray-400">
                이미지를 등록해주세요
              </div>
            )}
            {/* 배지 (묶음상품 등) */}
            <div className="absolute top-16 left-16 rounded-4 bg-[#F26565] px-8 py-4 typo-body-12-sb text-white">
              묶음상품
            </div>

            {/* 인디케이터 (1/2 등) */}
            <div className="absolute right-10 bottom-10 rounded-full bg-black/50 px-10 py-4 typo-body-12-r text-white">
              1 / {previewImages.length}
            </div>
          </div>
        </div>

        {/* 4. 상품 기본 정보 섹션 */}

        <div className="flex w-full items-center justify-between bg-white px-16 py-10">
          <div className="mb-16 flex items-center gap-6">
            <div className="size-24 rounded-6 bg-gray-500" />
            <p className="typo-title-14-m text-gray-600">Brand Name</p>
          </div>
          <Heart size={18} color="text-gray-300" />
        </div>

        <div className="border-t border-gray-300 bg-white p-16">
          {/* 데이터 바인딩: productName */}
          <h2 className="typo-title-16-r text-gray-800">
            {formData.productName || '[미입력] 상품명'}
          </h2>

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="typo-heading-18-r text-primary-500">10%</span>
              <span className="typo-heading-18-sb text-gray-900">
                {productPrice ? productPrice.toLocaleString() : '0'}원~
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

        {/* 5. 배송비 및 리뷰 배지 섹션 */}
        <div className="bg-gray-50 px-16 py-12">
          <div className="typo-title-14-m text-gray-600">
            배송비{' '}
            <span className="ml-4 typo-title-14-r text-gray-800">2,500원</span>{' '}
            <span className="ml-2 typo-body-12-r text-gray-500">
              (20,000원 이상 구매 시 무료)
            </span>
          </div>
        </div>
        <div className="border-t border-gray-100">
          <h3 className="p-16 typo-title-14-sb text-gray-800">
            리뷰 대표 배지
          </h3>
          <div className="flex gap-10 border-t border-gray-100 p-16">
            {['맛있어요', '담백해요', '부드러워요'].map((badge, idx) => (
              <div
                key={badge}
                className="flex flex-1 flex-col items-center gap-4 rounded-10 border border-gray-100 text-center"
              >
                <img src={`PreviewIcon${idx}`} alt="" />
                <span className="typo-body-14-m text-gray-600">{badge}</span>
              </div>
            ))}
          </div>
        </div>
        {/* 6. 상품 옵션 섹션 (가장 중요) */}
        <div className="h-6 w-full bg-gray-100" />
        <div className="">
          <h3 className="p-16 typo-title-14-sb text-gray-800">상품 옵션</h3>
          {/* 데이터 바인딩: formData.products 배열 반복 */}
          {(formData.products || [null, null]).map(
            (option: any, index: number) => (
              <>
                <div key={index} className="border-t border-gray-300">
                  <div className="flex items-center justify-between p-16">
                    <h4 className="mb-6 typo-title-14-r text-gray-800">
                      {option?.optionName ||
                        `옵션명 미입력 (옵션 ${index + 1})`}
                    </h4>

                    <div className="flex items-center gap-6">
                      <span className="typo-title-14-sb text-primary-500">
                        10%
                      </span>
                      {/* 가격 계산: 기본가 + 추가가격 */}
                      <span className="typo-title-14-sb text-gray-900">
                        {(
                          Number(productPrice || 0) +
                          Number(option?.additionalPrice || 0)
                        ).toLocaleString()}
                        원
                      </span>
                      <ChevronUp className="ml-8 text-gray-900" size={20} />
                    </div>
                  </div>

                  {/* 태그 영역 */}
                  <div className="flex gap-6 border-t border-gray-300 p-16">
                    {/* 💡 데이터 바인딩: ingredientCategories */}
                    {(
                      option?.ingredientCategories || ['저당', '글루텐프리']
                    ).map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-4 border border-gray-200 px-6 py-2 typo-body-10-r text-gray-600"
                      >
                        {tag === 'glutenFree'
                          ? '글루텐프리'
                          : tag === 'vegan'
                            ? '비건'
                            : tag}
                      </span>
                    ))}
                  </div>

                  {/* 주문 가능날짜 */}
                  <div className="p-16 pt-0">
                    <p className="mb-2 typo-body-12-sb text-gray-500">
                      주문 가능날짜
                    </p>
                    {/* 데이터 바인딩: shippingDays */}
                    <div className="flex w-full items-center justify-between">
                      <DaySelector
                        selectedDays={
                          option?.shippingDays || [
                            'mon',
                            'tue',
                            'wed',
                            'thu',
                            'fri',
                            'sat',
                            'sun',
                          ]
                        }
                        readOnly // 프리뷰용 readOnly 모드 필요
                      />
                      <div className="rounded-8 bg-gray-900 px-10 py-[5.5px] typo-body-12-m text-white">
                        빵켓팅 알림 신청
                      </div>
                    </div>
                  </div>

                  {/* 영양정보 */}
                  <div className="p-16 pt-0">
                    <div className="mb-10 flex items-center justify-between">
                      <span className="mb-2 typo-body-12-sb text-gray-500">
                        영양정보
                      </span>
                      {/* 데이터 바인딩: totalWeight, calories */}
                      <span className="typo-body-12-sb text-gray-700">
                        총 내용량 {option?.totalWeight || 0}g /{' '}
                        {option?.calories || 0}kcal
                      </span>
                    </div>
                    <div className="mt-8 grid grid-cols-4 gap-6">
                      {[
                        { label: '단백질', key: 'protein' },
                        { label: '당류', key: 'sugar' },
                        { label: '탄수화물', key: 'carbohydrate' },
                        { label: '지방', key: 'fat' },
                      ].map((nutri) => (
                        <div
                          key={nutri.key}
                          className="rounded-8 bg-gray-100 p-12 text-center"
                        >
                          <div className="mb-4 typo-body-11-r text-gray-500">
                            {nutri.label}
                          </div>
                          {/* 💡 데이터 바인딩: 영양성분 값들 */}
                          <div className="typo-title-14-sb text-gray-900">
                            {option?.[nutri.key] || 0}g
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ),
          )}

          <div className="p-16">
            <div className="mt-16 w-full rounded-10 border border-gray-200 py-8 text-center typo-title-16-m text-gray-800">
              간단히 보기
            </div>
          </div>
        </div>

        {/* 7. 상세 설명 영역 (이미지 위주) */}
        <div className="mb-10 bg-white px-20 py-24 text-left">
          <div className="leading-relaxed text-gray-700">
            {/* 데이터 바인딩: description */}
            {formData.description || '상품 상세 설명이 들어가는 자리입니다.'}
          </div>
        </div>

        {/* 하단 고정 바 (구매하기) */}
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

// DaySelector 프리뷰용 컴포넌트 (readOnly 모드 추가 가정)
// 기존 shared/block/day-selector/day-selector.tsx 파일을 활용하시거나 별도로 정의해 주세요.
const DaySelector = ({
  selectedDays,
  readOnly,
}: {
  selectedDays: string[]
  readOnly?: boolean
}) => {
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
          className={`flex size-32 items-center justify-center rounded-full border typo-body-12-sb ${selectedDays.includes(day.key) ? 'border-[#F26565] bg-[#F26565] text-white' : 'border-gray-100 bg-white text-gray-400'}`}
        >
          {day.label}
        </span>
      ))}
    </div>
  )
}
