import { cn } from '@/shared/lib/utils'

interface LabelWithTooltipProps {
  title: string
  titleRequire?: boolean
  titleTooltipProps?: React.ReactNode
  className?: string
}

export const LabelWithTooltip = ({
  title,
  titleRequire,
  titleTooltipProps,
  className,
}: LabelWithTooltipProps) => {
  return (
    <label className={cn('flex gap-2 typo-heading-18-b', className)}>
      {title}
      {titleRequire && (
        <span className="typo-title-16-m text-primary-500">*</span>
      )}
      {titleTooltipProps}
    </label>
  )
}
