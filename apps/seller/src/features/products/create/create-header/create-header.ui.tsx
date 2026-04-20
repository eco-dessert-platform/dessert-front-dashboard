import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  StageTab,
} from '@dessert/ui'

import { CategoryOptions, EssentialOptions } from '@/entity/products'

import { ProductHeaderTags } from './create-header-tags.ui'
import { InfoTooltip } from '../create-form/info-tooltip.ui'
import { useCreateFormSteps } from '../create-form/use-create-form-steps.hook'

const stagestep = [
  '상품 정보',
  '배송 정보',
  '썸네일 등록',
  '상품 옵션 정보',
  '상세페이지 등록',
  '상품 정보 제공 고시',
]

export const ProductHeader = () => {
  const { productFields } = useCreateFormSteps()
  const steps = Object.values(productFields).filter((e) => e === true).length
  const totalSteps = Object.keys(productFields).length

  return (
    <div className="sticky top-0 left-0 z-20 -mt-40 -ml-[90px] w-[calc(100%+180px)] border-b border-b-gray-200 bg-white px-[90px] py-16">
      <div className="flex w-full items-center justify-between">
        {/* TODO : 추후 기능 추가 예정 */}
        <StageTab
          currentStep={1}
          steps={stagestep}
          className="w-fit justify-start border-none"
        />
        <p className="typo-title-16-sb">
          필수 입력 사항이{' '}
          <span className="text-primary-500">{totalSteps - steps}개</span>{' '}
          남았어요
        </p>
      </div>

      <Accordion type="single" collapsible defaultValue={'step'}>
        <AccordionItem value="step" className="relative">
          <AccordionContent className="h-auto border-t border-gray-200 pb-[18px]">
            <div className="mt-8 grid grid-cols-2 gap-30 pt-12">
              <ProductHeaderTags
                title="필수성분"
                titleRequire={true}
                titleTooltipProps={
                  <InfoTooltip>
                    상품 등록을 위해선 아래 5가지 기준 중<br></br> 하나 이상
                    충족해야 합니다.
                  </InfoTooltip>
                }
                tagData={EssentialOptions}
              />
              <ProductHeaderTags
                title="적용된 카테고리"
                tagData={CategoryOptions}
              />
            </div>
          </AccordionContent>
          <AccordionTrigger
            customIcon
            className="absolute top-[unset] right-0 -bottom-64 h-48 w-22 items-center justify-center rounded-b-16 border border-gray-300 bg-white"
          ></AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
