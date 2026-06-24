import { useEffect, useRef, useState } from 'react'

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
import {
  CreateDraftModal,
  useCreateDraft,
  useCreateDraftStore,
} from '@/features/products/create/create-draft'
import { CreateFooter } from '@/features/products/create/create-footer'
import { useCreateHeaderSteps } from '@/features/products/create/create-header/use-create-header-steps.hook'
import { ProductPreviewModal } from '@/features/products/create/create-preview'

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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false) //미리보기
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false) //임시저장
  const { draft } = useCreateDraftStore()
  const isInitialMount = useRef(true)
  const { handleRestoreDraft, clearDraft } = useCreateDraft()
  const { setCurrentStep, headerHeight } = useCreateHeaderSteps()

  // 임시저장 데이터가 있으면 최초 마운트 시 복원 모달 노출
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      if (draft) {
        setIsDraftModalOpen(true)
      }
    }
  }, [draft])

  // sticky header: 스크롤 위치에 따라 현재 단계 갱신
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

      <CreateFooter onPreview={() => setIsPreviewOpen(true)} />
      {isPreviewOpen && (
        <ProductPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}

      {isDraftModalOpen && (
        <CreateDraftModal
          isOpen={isDraftModalOpen}
          onConfirm={() => {
            handleRestoreDraft()
            setIsDraftModalOpen(false)
          }}
          onClose={() => {
            clearDraft()
            setIsDraftModalOpen(false)
          }}
        />
      )}
    </>
  )
}

export default CreatePage
