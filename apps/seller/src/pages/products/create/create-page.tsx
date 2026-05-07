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
  ThumbnailUploadArea,
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
  const { setCurrentStep, headerHeight, isScrollingToStep } =
    useCreateHeaderSteps()

  useEffect(() => {
    const elements = stepIds.map((id) => document.getElementById(id))
    const topMargin = headerHeight > 0 ? headerHeight : 100

    // main 요소 찾기
    const scrollContainer = document.querySelector('main')
    if (!scrollContainer) return

    const handleScroll = () => {
      const containerTop = scrollContainer.getBoundingClientRect().top

      const offsets = elements.map((el) => {
        if (!el) return Infinity
        // main의 top 위치를 빼서 보정
        return el.getBoundingClientRect().top - containerTop - topMargin - 20
      })

      let activeIndex = 0
      for (let i = 0; i < offsets.length; i++) {
        if (offsets[i] <= 0) {
          activeIndex = i
        }
      }

      setCurrentStep(activeIndex + 1)
    }

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
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
