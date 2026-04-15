import { XIcon } from '@dessert/icons'
import { clsx } from 'clsx'

interface ChipProps {
  children: React.ReactNode
  size?: 'sm' | 'md'
  closable?: boolean
  selected?: boolean
  onClose?: () => void
  className?: string
}

const Chip = ({
  children,
  size = 'md',
  closable = false,
  selected = false,
  onClose,
  className = '',
}: ChipProps) => {
  const variantClasses = {
    base: {
      default:
        'bg-white border-gray-200 text-gray-800 font-normal hover:bg-gray-50 active:bg-gray-200',
    },
    selected: {
      default:
        'bg-white border-primary-500 text-primary-500 font-semibold hover:bg-gray-50 active:bg-gray-200',
    },
  }

  const sizeClasses = {
    sm: 'px-2 py-1 typo-body-10-r rounded-full',
    md: 'px-3 py-1.5 typo-body-12-r rounded-full',
  }

  const closeClasses = {
    sm: 'size-12',
    md: 'size-16',
  }

  return (
    <span
      className={clsx(
        'inline-flex cursor-pointer items-center justify-center gap-1 border border-solid transition-colors duration-150',
        sizeClasses[size],
        selected
          ? variantClasses.selected.default
          : variantClasses.base.default,
        className,
      )}
    >
      <span>{children}</span>
      {closable && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center transition-opacity hover:opacity-70"
          aria-label="닫기"
        >
          {/* <XIcon className={cn(closeClasses[size])} /> */}
          <XIcon />
        </button>
      )}
    </span>
  )
}

export { Chip }
