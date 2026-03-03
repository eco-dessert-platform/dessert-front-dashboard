import Label from '@/shared/components/ui/label/label'
import { InfoTooltip } from '../ui/info-tooltip'
import Dropdown from '@/shared/components/ui/dropdown/dropdown'
import Input from '@/shared/components/ui/input/input'

const DeliveryFee = [
  { label: '유료', value: 'charged' },
  { label: '무료', value: 'free' },
  { label: '조건부 무료', value: 'conditionalFree' },
]

const DeliveryCompany = [
  { label: 'CJ 대한통운', value: 'cj' },
  { label: '롯데택배', value: 'lotte' },
  { label: '우체국 택배', value: 'post' },
  { label: '한진택배', value: 'hanjin' },
  { label: '로젠택배', value: 'logen' },
]

export const ProductDeliveryArea = () => {
  return (
    <>
      <div className="mb-24 flex items-center gap-2">
        <Label label="배송 정보" className="typo-heading-20-sb text-gray-900" />
        <InfoTooltip>
          상품 등록을 위해선 아래 5가지 기준 중<br /> 하나 이상 충족해야 합니다.
        </InfoTooltip>
      </div>
      <div className="grid grid-cols-2 gap-32">
        <div>
          <Label
            label="배송 조건"
            required
            className="typo-heading-18-r text-gray-900"
          />
          <Dropdown options={DeliveryFee} placeholder="유료" className="mt-8" />
        </div>
        <div>
          <Label
            label="택배사"
            required
            className="typo-heading-18-r text-gray-900"
          />
          <Dropdown
            options={DeliveryCompany}
            placeholder="택배사 선택"
            className="mt-8"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-32 pt-32">
        <div>
          <div className="mt-8 flex w-full gap-8">
            <Input
              required
              label="배송비"
              labelClassName="typo-heading-18-r"
              placeholder="0~100,000"
              className="flex-1"
              //value={priceInput.displayValue}
              //onChange={priceInput.handleChange}
              //error={!!errors.price && price !== null}
              //errorMessage={errors.price?.message || undefined}
            />
            <span className="relative top-[44px]">원</span>
          </div>
        </div>
        <div>
          <div className="mt-8 flex w-full gap-8">
            <Input
              required
              label="무료 배송 최소 금액"
              labelClassName="typo-heading-18-r"
              placeholder="0~100,000"
              className="flex-1"
              //value={priceInput.displayValue}
              //onChange={priceInput.handleChange}
              //error={!!errors.price && price !== null}
              //errorMessage={errors.price?.message || undefined}
            />
            <span className="relative top-[44px]">원</span>
          </div>
        </div>
      </div>
    </>
  )
}
