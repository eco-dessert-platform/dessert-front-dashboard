import Button from '@/shared/components/ui/button/button'
import { ProductHeader } from '@/features/products/create/create-header/create-header'
import { FormStepsProvider } from '@/features/products/create/create-form/create-form-provider/create-form-provider'
import { useFormSteps } from '@/features/products/create/create-form/create-form-provider/use-form-steps.hook'
import { ProductInfoArea } from '../../../features/products/create/create-form/craete-form-info/create-form-info-area'
import { ProductDeliveryArea } from '@/features/products/create/create-form/create-form-delivery/create-form-delivery-area'

function CreatePage() {
  return (
    <>
      <FormStepsProvider>
        <CreatePageInner />
      </FormStepsProvider>
    </>
  )
}

function CreatePageInner() {
  const { productInfo, productDelivery } = useFormSteps()
  return (
    <>
      <ProductHeader />
      <div className="mt-22 bg-white">
        {productInfo ? 'true' : 'false'}
        <div className="px-24 pt-16 pb-24">
          <ProductInfoArea />
        </div>
      </div>
      <div className="mt-20 bg-white">
        {productDelivery ? 'true' : 'false'}
        <div className="px-24 pt-16 pb-24">
          <ProductDeliveryArea />
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
