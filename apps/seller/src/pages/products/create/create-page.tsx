import { useEffect, useRef, useState } from 'react'

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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false) //미리보기
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false) //임시저장
  const { draft } = useCreateDraftStore()
  const isInitialMount = useRef(true)
  const { handleRestoreDraft, clearDraft } = useCreateDraft()

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      if (draft) {
        setIsDraftModalOpen(true)
      }
    } //최초 컴포넌트 마운트 시 modal이 생성되도록 합니다
  }, [draft])

  return (
    <>
      <ProductHeader />
      <CreateFormContainer className="mt-22">
        <ProductInfoArea />
      </CreateFormContainer>

      <CreateFormContainer>
        <ProductDeliveryArea />
      </CreateFormContainer>

      <CreateFormContainer>
        <ThumbnailUploadArea />
      </CreateFormContainer>

      <CreateFormContainer>
        <ProductOptionsArea />
      </CreateFormContainer>

      <CreateFormContainer>
        <ProductDetailArea />
      </CreateFormContainer>

      <CreateFormContainer>
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
