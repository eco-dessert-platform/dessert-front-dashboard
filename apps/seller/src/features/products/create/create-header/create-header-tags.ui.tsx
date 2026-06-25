import { Chip, Label, Tooltip } from '@dessert/ui'

import { OptionTags } from './options-tag.type'
import { useCreateHeaderSteps } from './use-create-header-steps.hook'

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
  const { activeTags } = useCreateHeaderSteps()

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
          const isActive = activeTags[items.title] ?? false
          const chip = (
            <Chip size="md" selected={isActive}>
              #{items.title}
            </Chip>
          )
          // tooltip이 없는 태그는 빈 Tooltip 대신 Chip만 노출
          if (!items.tooltip) {
            return <span key={items.title}>{chip}</span>
          }
          return (
            <Tooltip position="bottom" key={items.title}>
              <Tooltip.Trigger>{chip}</Tooltip.Trigger>
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
