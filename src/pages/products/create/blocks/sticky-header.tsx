import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/shared/components/ui/accordion/accordion'
import { StageTab } from '@/shared/components/ui/tab/stage-tab'
import { Tooltip } from '@/shared/components/ui/tooltip/tooltip'
import { EssentialOptions } from '@/entity/products/create/essential-options.constants'
import { CategoryOptions } from '@/entity/products/create/category-options.constants'
import { OptionTagsArea } from './option-tags-area'
import { InfoTooltip } from '../ui/info-tooltip'
import { Info, ChevronDown } from 'lucide-react'

const stagestep = [
  '상품 정보',
  '배송 정보',
  '썸네일 등록',
  '상품 옵션 정보',
  '상세페이지 등록',
  '상품 정보 제공 고시',
]
export const StickyHeader = () => {
  return (
    <div className="sticky top-0 left-0 -mt-40 -ml-[90px] w-[calc(100%+180px)] border-b border-b-gray-200 bg-white px-[90px] py-16">
      <div className="flex w-full items-center justify-between">
        <StageTab
          currentStep={1}
          steps={stagestep}
          className="w-fit justify-start border-none"
        />
        <p className="typo-title-16-sb">
          필수 입력 사항이 <span className="text-primary-500">5개</span>{' '}
          남았어요
        </p>
      </div>

      <Accordion type="single" collapsible defaultValue={'step'}>
        <AccordionItem value="step" className="relative">
          <AccordionContent className="h-auto border-t border-gray-200 pb-[18px]">
            <div className="mt-8 grid grid-cols-2 gap-30 pt-12">
              <OptionTagsArea
                title="필수성분"
                titleRequire={true}
                titleTooltipProps={
                  <InfoTooltip iconSize={24}>
                    상품 등록을 위해선 아래 5가지 기준 중<br></br> 하나 이상
                    충족해야 합니다.
                  </InfoTooltip>
                }
                tagData={EssentialOptions}
              />
              <OptionTagsArea
                title="적용된 카테고리"
                tagData={CategoryOptions}
              />
            </div>
          </AccordionContent>
          <AccordionTrigger className="absolute right-[90px] -bottom-[66px] justify-center border p-0">
            <div className="rounded-b-16 bg-white px-[26px] py-6">
              <ChevronDown size={36} />
            </div>
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
