import { useEffect } from 'react'

import { Button } from '@dessert/ui'
import { FormProvider } from 'react-hook-form'

import {
  CreateFormContainer,
  FormStepsProvider,
  ProductDeliveryArea,
  ProductDetailArea,
  ProductDisclosureArea,
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
  const { setCurrentStep } = useCreateFormSteps()
  const stepIds = [
    'productInfo',
    'productDelivery',
    'productThumbnail',
    'productOptions',
    'productDetail',
    'productDisclosure',
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 화면 중앙(또는 상단)에 위치할 때 해당 스텝을 활성화
          if (entry.isIntersecting) {
            const index = stepIds.indexOf(entry.target.id)
            setCurrentStep(index + 1)
          }
        })
      },
      {
        root: null, // 브라우저 뷰포트 기준
        rootMargin: '-30% 0px -60% 0px', // 감지 영역 조정
        threshold: 0,
      },
    )

    stepIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [setCurrentStep])

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

      <CreateFormContainer id="productDisclosure">
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
