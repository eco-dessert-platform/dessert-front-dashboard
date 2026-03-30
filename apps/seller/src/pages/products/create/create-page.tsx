import { Button } from '@dessert/ui'
import { FormProvider } from 'react-hook-form'

import { FormStepsProvider } from '@/features/products/create/create-form/create-form-provider'
import { useCreateFormSteps } from '@/features/products/create/create-form/use-create-form-steps.hook'
import { ProductDeliveryArea } from '@/features/products/create/create-form-delivery/create-form-delivery-area'
import { ProductDetailArea } from '@/features/products/create/create-form-detail/create-form-detail-area'
import { ProductDisclosureArea } from '@/features/products/create/create-form-disclosure/create-form-disclosure-area'
import { ProductInfoArea } from '@/features/products/create/create-form-info/create-form-info-area'
import { ProductOptionsArea } from '@/features/products/create/create-form-options/create-form-options-area'
import { ProductHeader } from '@/features/products/create/create-header/create-header'
import { CreateFormContainer } from '@/features/products/create/ui/create-form-container'

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
  const { productFields } = useCreateFormSteps()

  return (
    <>
      <ProductHeader />
      <CreateFormContainer className="mt-22">
        {/* TODO: 릴리스 전 제거 - 폼 완성 상태 디버그 표시 */}
        {productFields.productInfo ? 'true' : 'false'}
        <ProductInfoArea />
      </CreateFormContainer>
      <CreateFormContainer>
        {productFields.productDelivery ? 'true' : 'false'}
        <ProductDeliveryArea />
      </CreateFormContainer>
      <CreateFormContainer>
        {productFields.productOptions ? 'true' : 'false'}
        <ProductOptionsArea />
      </CreateFormContainer>

      <CreateFormContainer>
        {productFields.productDetail ? 'true' : 'false'}
        <ProductDetailArea />
      </CreateFormContainer>

      <CreateFormContainer>
        {productFields.productDisclosure ? 'true' : 'false'}
        <ProductDisclosureArea />
      </CreateFormContainer>

      <div className="flex gap-12">
        {/* TODO: 후속 작업 필요  - 함수 미구현 상태 입니다 */}
        <Button title="미리보기" variant="primary-outlined" size="lg" />
        <Button title="임시저장" variant="primary-outlined" size="lg" />
        <Button title="저장하기" variant="primary-filled" size="lg" />
      </div>
    </>
  )
}

export default CreatePage
