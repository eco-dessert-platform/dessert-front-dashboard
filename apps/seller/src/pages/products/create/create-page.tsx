import { useState } from 'react'

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
  useCreateProductForm,
} from '@/features/products/create'
import { CreateFooter } from '@/features/products/create/create-footer'

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

      <CreateFooter onPreview={() => setIsPreviewOpen(true)} />
    </>
  )
}

export default CreatePage
