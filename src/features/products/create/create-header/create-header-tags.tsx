import Label from '@/shared/components/ui/label/label'
import { Tooltip } from '@/shared/components/ui/tooltip/tooltip'
import Chip from '@/shared/components/ui/chip/chip'
import { OptionTags } from '@/entity/products/create/options-tag.type'

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
        {tagData.map((items) => (
          <Tooltip position="bottom" key={items.title}>
            <Tooltip.Trigger>
              <Chip size="md">#{items.title}</Chip>
            </Tooltip.Trigger>
            <Tooltip.Content className="px-8 py-6">
              <p>{items.tooltip}</p>
            </Tooltip.Content>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}
