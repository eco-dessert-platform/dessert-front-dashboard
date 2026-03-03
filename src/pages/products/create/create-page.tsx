import { ProductHeader } from '@/features/products/create/create-header/create-header'
import { LabelWithTooltip } from './ui/label-with-tooltip'
import Button from '@/shared/components/ui/button/button'
import { ProductInfoArea } from '../../../features/products/create/create-form/craete-form-info/create-form-info-area'
import { FormStepsProvider } from '@/features/products/create/create-form/create-form-provider/create-form-provider'
import { useFormSteps } from '@/features/products/create/create-form/create-form-provider/use-form-steps.hook'
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
  const { productInfo } = useFormSteps()
  return (
    <>
      <ProductHeader />
      <div className="mt-22 bg-white">
        {productInfo ? 'true' : 'false'}
        <div className="px-24 pt-16 pb-24">
          <LabelWithTooltip title="상품 정보" className="typo-heading-20-sb" />
          <ProductInfoArea />
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
