import { Tooltip } from '@/shared/components/ui/tooltip/tooltip'
import { LabelWithTooltip } from '../../ui/label-with-tooltip'
import { OptionTags } from '@/entity/products/create/options-tag.type'
import Chip from '@/shared/components/ui/chip/chip'

interface OptionTagsAreaProps {
  title: string
  titleRequire?: boolean
  titleTooltipProps?: React.ReactNode
  tagData: OptionTags[]
}

export const OptionTagsArea = ({
  title,
  titleRequire,
  titleTooltipProps,
  tagData,
}: OptionTagsAreaProps) => {
  return (
    <div>
      <LabelWithTooltip
        title={title}
        titleRequire={titleRequire}
        titleTooltipProps={titleTooltipProps}
      />
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
