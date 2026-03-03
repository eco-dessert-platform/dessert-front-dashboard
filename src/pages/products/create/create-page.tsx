import Label from '@/shared/components/ui/label/label'
import Button from '@/shared/components/ui/button/button'
import { ProductHeader } from '@/features/products/create/create-header/create-header'
import { FormStepsProvider } from '@/features/products/create/create-form/create-form-provider/create-form-provider'
import { useFormSteps } from '@/features/products/create/create-form/create-form-provider/use-form-steps.hook'
import { ProductInfoArea } from '../../../features/products/create/create-form/craete-form-info/create-form-info-area'
import { InfoTooltip } from '../../../features/products/create/create-form/ui/info-tooltip'

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
          <div className="flex items-center gap-2">
            <Label
              label="상품 정보"
              className="typo-heading-20-sb text-gray-900"
            />
            <InfoTooltip>
              상품 제작 및 취소 안내
              <ul className="list-disc pl-16">
                <li>
                  상품 제작이 시작된 이후에는 주문 취소가 불가능하며, 반품
                  절차로만 진행이 가능합니다.
                </li>
                <li>
                  단, 제작 시간 중에 접수된 주문은 다음 제작 시작 전까지 취소가
                  가능합니다.
                </li>
              </ul>
            </InfoTooltip>
          </div>
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
