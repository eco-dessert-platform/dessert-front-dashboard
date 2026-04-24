import { useEffect } from 'react'

import { FormProvider } from 'react-hook-form'

import {
  CreateFormContainer,
  FormStepsProvider,
  ProductDeliveryArea,
  ProductDetailArea,
  ProductDisclosureArea,
  ProductFooter,
  ProductHeader,
  ProductInfoArea,
  ProductOptionsArea,
  ThumbnailUploadArea,
  useCreateFormSteps,
  useCreateProductForm,
} from '@/features/products/create'

function CreatePage() {
  const form = useCreateProductForm()
  return (
    <FormProvider {...form}>
      <FormStepsProvider>
        <CreatePageInner />
      </FormStepsProvider>
    </FormProvider>
  )
}

function CreatePageInner() {
  const { setCurrentStep, headerHeight, isScrollingToStep } =
    useCreateFormSteps()

  const stepIds = [
    'productInfo',
    'productDelivery',
    'productThumbnail',
    'productOptions',
    'productDetail',
    'productDisclosure',
  ]

  useEffect(() => {
    const elements = stepIds.map((id) => document.getElementById(id))
    const topMargin = Math.max(0, headerHeight - 30)

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingToStep.current) return

        // 현재 화면에 보이는 섹션들 중 가장 위에 있는 것을 active로
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)

        if (visibleEntries.length === 0) return

        // rootMargin 기준선을 통과한 entry 중 index가 가장 큰 것 선택
        // (스크롤 방향 무관하게 "현재 보이는 가장 상단 섹션" 기준)
        const topEntry = visibleEntries.reduce((prev, curr) => {
          // boundingClientRect.top이 작을수록 화면 상단에 가까움
          return curr.boundingClientRect.top < prev.boundingClientRect.top
            ? curr
            : prev
        })

        const index = stepIds.indexOf(topEntry.target.id)
        if (index !== -1) setCurrentStep(index + 1)
      },
      {
        rootMargin: `-${topMargin}px 0px -60% 0px`,
        threshold: 0,
      },
    )

    elements.forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headerHeight, setCurrentStep, isScrollingToStep])

  return (
    <>
      <ProductHeader />
      <CreateFormContainer id="productInfo" className="mt-22">
        <ProductInfoArea />
      </CreateFormContainer>

      <CreateFormContainer id="productDelivery">
        <ProductDeliveryArea />
      </CreateFormContainer>

      <CreateFormContainer id="productThumbnail">
        <ThumbnailUploadArea />
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
      <ProductFooter />
    </>
  )
}

export default CreatePage
