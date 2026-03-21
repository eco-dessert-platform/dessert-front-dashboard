import { Button } from '@dessert/ui'
import { FormProvider } from 'react-hook-form'

import { FormStepsProvider } from '@/features/products/create/create-form/create-form-provider'
import { useCreateFormSteps } from '@/features/products/create/create-form/use-create-form-steps.hook'
import { ProductDeliveryArea } from '@/features/products/create/create-form-delivery/create-form-delivery-area'
import { ProductInfoArea } from '@/features/products/create/create-form-info/create-form-info-area'
import { ProductOptionsArea } from '@/features/products/create/create-form-options/create-form-options-area'
import { ProductHeader } from '@/features/products/create/create-header/create-header'

import { useCreateProductForm } from './create-form'

function CreatePage() {
  const form = useCreateProductForm()
  return (
    <>
      <FormProvider {...form}>
        <FormStepsProvider>
          <CreatePageInner />
        </FormStepsProvider>
      </FormProvider>
    </>
  )
}

function CreatePageInner() {
  const { productFields } = useCreateFormSteps()

  return (
    <>
      <ProductHeader />
      <div className="mt-22 bg-white">
        <div className="px-24 pt-16 pb-24">
          {productFields.productInfo ? 'true' : 'false'}
          <ProductInfoArea />
        </div>
      </div>
      <div className="mt-20 bg-white">
        <div className="px-24 pt-16 pb-24">
          {productFields.productDelivery ? 'true' : 'false'}
          <ProductDeliveryArea />
        </div>
      </div>
      <div className="mt-20 bg-white">
        <div className="px-24 pt-16 pb-24">
          {productFields.productOptions ? 'true' : 'false'}
          <ProductOptionsArea />
        </div>
      </div>

      <div className="flex gap-12">
        <Button title="미리보기" variant="primary-outlined" size="lg" />
        <Button title="임시저장" variant="primary-outlined" size="lg" />
        <Button title="저장하기" variant="primary-filled" size="lg" />
      </div>
    </>
  )
}

export default CreatePage
