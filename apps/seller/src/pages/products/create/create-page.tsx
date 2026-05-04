import { useEffect, useRef } from 'react'

import { Button } from '@dessert/ui'
import { FormProvider } from 'react-hook-form'

import {
  CreateFormContainer,
  ProductDeliveryArea,
  ProductDetailArea,
  ProductDisclosureArea,
  ProductHeader,
  ProductInfoArea,
  ProductOptionsArea,
  useCreateProductForm,
} from '@/features/products/create'
import { useCreateHeaderSteps } from '@/features/products/create/create-header/use-create-header-steps.hook'
function CreatePage() {
  const form = useCreateProductForm()
  return (
    <FormProvider {...form}>
      <CreatePageInner />
    </FormProvider>
  )
}

const stepIds = [
  'productInfo',
  'productDelivery',
  'productThumbnail',
  'productOptions',
  'productDetail',
  'productDisclosure',
]

function CreatePageInner() {
  const isInitialMount = useRef(true)
  const { setCurrentStep, headerHeight, isScrollingToStep } =
    useCreateHeaderSteps()

  useEffect(() => {
    const elements = stepIds.map((id) => document.getElementById(id))

    // 헤더가 가리는 만큼 상단 여백을 줌
    const topMargin = headerHeight > 0 ? headerHeight : 100

    const observer = new IntersectionObserver(
      (entries) => {
        // 클릭해서 스크롤 중일 때는 단계 변경 무시
        if (isScrollingToStep.current) return

        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length === 0) return

        // 화면 상단 기준선에 가장 가까운 섹션 찾기
        const topEntry = visibleEntries.reduce((prev, curr) => {
          return curr.boundingClientRect.top < prev.boundingClientRect.top
            ? curr
            : prev
        })

        const index = stepIds.indexOf(topEntry.target.id)
        if (index !== -1) {
          setCurrentStep(index + 1)
        }
      },
      {
        // 상단은 헤더 높이만큼 빼고, 하단은 화면 절반 위로 오면 인식
        rootMargin: `-${topMargin}px 0px -50% 0px`,
        threshold: 0,
      },
    )

    elements.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [headerHeight, setCurrentStep])

  return (
    <>
      <ProductHeader />
      <CreateFormContainer id="productInfo" className="mt-22">
        <ProductInfoArea />
      </CreateFormContainer>

      <CreateFormContainer id="productDelivery">
        <ProductDeliveryArea />
      </CreateFormContainer>

      <CreateFormContainer id="productOptions">
        <ProductOptionsArea />
      </CreateFormContainer>

      <CreateFormContainer id="productDetail">
        <ProductDetailArea />
      </CreateFormContainer>

      <CreateFormContainer id="productDisclosure" className="mb-40">
        <ProductDisclosureArea />
      </CreateFormContainer>

      <div className="mt-40 flex gap-12">
        <Button
          title="미리보기"
          variant="primary-outlined"
          size="lg"
          disabled
        />
        <Button
          title="임시저장"
          variant="primary-outlined"
          size="lg"
          disabled
        />
        <Button title="저장하기" variant="primary-filled" size="lg" disabled />
      </div>
    </>
  )
}

export default CreatePage
