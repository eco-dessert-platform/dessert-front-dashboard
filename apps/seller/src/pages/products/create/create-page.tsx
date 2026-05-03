import { useEffect, useRef, useState } from 'react'

import { Button } from '@dessert/ui'
import { FormProvider, useFormContext } from 'react-hook-form'

import {
  CreateFormContainer,
  CreateProductForm,
  FormStepsProvider,
  ProductDeliveryArea,
  ProductDetailArea,
  ProductDisclosureArea,
  ProductHeader,
  ProductInfoArea,
  ProductOptionsArea,
  useCreateProductForm,
} from '@/features/products/create'
import {
  CreateDraftModal,
  useCreateDraft,
  useCreateDraftStore,
} from '@/features/products/create/create-draft'

//TODO: FOOTER 컴포넌트 분리 예정으로 useFormContext, CreateProductForm 삭제 예정입니다.

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
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false) //임시저장
  const { draft } = useCreateDraftStore()
  const isInitialMount = useRef(true)
  const { handleRestoreDraft, clearDraft, handleSaveDraft } = useCreateDraft()
  const {
    formState: { isDirty },
  } = useFormContext<CreateProductForm>()
  const hasAnyInput = isDirty
  //TODO : line 39~44 FOOTER 컴포넌트 분리 후 코드 이동 예정입니다.
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
        <ProductOptionsArea />
      </CreateFormContainer>

      <CreateFormContainer>
        <ProductDetailArea />
      </CreateFormContainer>

      <CreateFormContainer>
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
          disabled={!hasAnyInput}
          onClick={handleSaveDraft}
        />
        <Button title="저장하기" variant="primary-filled" size="lg" disabled />
      </div>

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
