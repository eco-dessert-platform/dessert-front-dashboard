import { StickyHeader } from './blocks/sticky-header/sticky-header'
import { LabelWithTooltip } from './ui/label-with-tooltip'
import Button from '@/shared/components/ui/button/button'
import { ProductInfoArea } from './blocks/product-info/product-info-area'
import {
  FormStepsProvider,
  useFormSteps,
} from '@/features/products/create/form-steps.context'
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
      <StickyHeader />
      <div className="mt-[88px] bg-white">
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
