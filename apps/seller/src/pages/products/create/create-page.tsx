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
  useCreateFormPersistence,
  useCreateFunnelEntry,
  useCreateProductForm,
} from '@/features/products/create'
import {
  CreateDraftModal,
  useCreateDraft,
  useCreateDraftStore,
} from '@/features/products/create/create-draft'
import { CreateFooter } from '@/features/products/create/create-footer'
import { ProductPreviewModal } from '@/features/products/create/create-preview'

function CreatePage() {
  const entryMode = useCreateFunnelEntry()
  const form = useCreateProductForm(entryMode)

  return (
    <FormProvider {...form}>
      <CreatePageInner entryMode={entryMode} />
    </FormProvider>
  )
}

interface CreatePageInnerProps {
  entryMode: ReturnType<typeof useCreateFunnelEntry>
}

function CreatePageInner({ entryMode }: CreatePageInnerProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false)
  const { draft } = useCreateDraftStore()
  const isInitialMount = useRef(true)
  const { handleRestoreDraft, clearDraft } = useCreateDraft()

  useCreateFormPersistence(entryMode)

  // 퍼널 외부 진입(reset)이고 수동 임시저장 데이터가 있으면 복원 모달을 노출합니다.
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false

      if (entryMode === 'restore') return

      if (draft) {
        setIsDraftModalOpen(true)
      }
    }
  }, [draft, entryMode])

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
