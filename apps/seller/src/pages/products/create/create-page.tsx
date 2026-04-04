import { Button } from '@dessert/ui'
import { FormProvider } from 'react-hook-form'

import {
  FormStepsProvider,
  useCreateFormSteps,
  ProductDeliveryArea,
  ProductDetailArea,
  ProductDisclosureArea,
  ProductInfoArea,
  ProductOptionsArea,
  ProductHeader,
} from '@/features/products/create'
import { CreateFormContainer } from '@/features/products/create/ui/create-form-container.ui'

import { useCreateProductForm } from './create-form'

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
        <ProductOptionsArea />
      </CreateFormContainer>

      <CreateFormContainer>
        <ProductDetailArea />
      </CreateFormContainer>

      <CreateFormContainer>
        <ProductDisclosureArea />
      </CreateFormContainer>

      <div className="flex gap-12">
        {/* TODO: 후속 작업 필요 - 함수 미구현 상태 입니다 */}
        <Button title="미리보기" variant="primary-outlined" size="lg" />
        <Button title="임시저장" variant="primary-outlined" size="lg" />
        <Button title="저장하기" variant="primary-filled" size="lg" />
      </div>
    </>
  )
}

export default CreatePage
