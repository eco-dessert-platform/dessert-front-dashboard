import { Chip, Label, Tooltip } from '@dessert/ui'

import { OptionTags } from '@/entity/products'

import { useCreateFormSteps } from '../create-form'

interface TagsProps {
  title: string
  titleRequire?: boolean
  titleTooltipProps?: React.ReactNode
  tagData: OptionTags[]
}

export const ProductHeaderTags = ({
  title,
  titleRequire,
  titleTooltipProps,
  tagData,
}: TagsProps) => {
  const { activeTags } = useCreateFormSteps()
  const { essential, category } = activeTags
  const statusMap: Record<string, boolean> = {
    // 필수성분
    글루텐프리: essential.isGlutenFree,
    비건: essential.isVegan,
    고단백: essential.isHighProtein,
    저지방: essential.isLowFat,
    저당: essential.isLowSugar,
    // 적용된 카테고리
    '칼로리 다운': category.isCalorieDown,
    '단백질 듬뿍': category.isProteinRich,
    '속 편한 즐거움': category.isEasyDigestion,
  }
  return (
    <div>
      <div className="flex items-center gap-2">
        <Label
          label={title}
          required={titleRequire}
          className="typo-heading-18-sb"
        />
        {titleTooltipProps}
      </div>
      <div className="mt-10 flex gap-4">
        {tagData.map((items) => {
          const isActive = statusMap[items.title] ?? false
          return (
            <Tooltip position="bottom" key={items.title}>
              <Tooltip.Trigger>
                <Chip size="md" selected={isActive}>
                  #{items.title}
                </Chip>
              </Tooltip.Trigger>
              <Tooltip.Content className="px-8 py-6">
                <p>{items.tooltip}</p>
              </Tooltip.Content>
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
}
