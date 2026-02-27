interface LabelWithTooltipProps {
  title: string
  titleRequire?: boolean
  titleTooltipProps?: React.ReactNode
}

export const LabelWithTooltip = ({
  title,
  titleRequire,
  titleTooltipProps,
}: LabelWithTooltipProps) => {
  return (
    <>
      <p className="typo-heading-18-b">{title}</p>
      {titleRequire && (
        <span className="typo-title-16-m text-primary-500">*</span>
      )}
      {titleTooltipProps}
    </>
  )
}
