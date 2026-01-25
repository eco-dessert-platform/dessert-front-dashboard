import clsx from 'clsx'

interface ImagePlaceholderProps {
  className?: string
}

export const ImagePlaceholder = ({ className = '' }: ImagePlaceholderProps) => {
  return (
    <div
      className={clsx(
        'flex-1 items-center self-stretch rounded-[20px] bg-amber-100',
        className,
      )}
    />
  )
}
