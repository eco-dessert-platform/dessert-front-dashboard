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
