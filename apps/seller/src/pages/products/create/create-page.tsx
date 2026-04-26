import { useEffect, useState } from 'react'

import { FormProvider } from 'react-hook-form'

import {
  CreateFormContainer,
  ProductDeliveryArea,
  ProductDetailArea,
  ProductDisclosureArea,
  ProductFooter,
  ProductHeader,
  ProductInfoArea,
  ProductOptionsArea,
  ThumbnailUploadArea,
  useCreateForm,
} from '@/features/products/create'
import {
  CreateDraftDialog,
  useCreateDraft,
  useCreateDraftStore,
} from '@/features/products/create/create-draft'
import { ProductPreviewModal } from '@/features/products/create/create-preview/create-preview-modal.ui'
import { useCreateHeaderSteps } from '@/features/products/create/create-store'

function CreatePage() {
  const form = useCreateForm()
  return (
    <FormProvider {...form}>
      <CreatePageInner />
    </FormProvider>
  )
}

function CreatePageInner() {
  const { draft } = useCreateDraftStore()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false) //미리보기
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false) //임시저장
  const { setCurrentStep, headerHeight, isScrollingToStep } =
    useCreateHeaderSteps()
  const { handleRestoreDraft, clearDraft } = useCreateDraft()

  const stepIds = [
    'productInfo',
    'productDelivery',
    'productThumbnail',
    'productOptions',
    'productDetail',
    'productDisclosure',
  ]
  useEffect(() => {
    if (draft) {
      setIsDraftModalOpen(true)
    }
    console.log('draft:', draft)
  }, [draft])

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
  }, [headerHeight, setCurrentStep]) // isScrollingToStep은 내부에서 ref로 참조되므로 생략 가능
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
      <ProductFooter onPreview={() => setIsPreviewOpen(true)} />
      <ProductPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
      {isDraftModalOpen && (
        <CreateDraftDialog
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
