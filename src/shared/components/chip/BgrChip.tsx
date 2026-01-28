import clsx from 'clsx'
import { cn } from 'src/shared/lib/shadcn/lib/utils'
import { X } from 'lucide-react'

interface BgrChipProps {
  children: React.ReactNode
  size?: 'sm' | 'md'
  closable?: boolean
  selected?: boolean
  onClose?: () => void
  className?: string
}

const BgrChip = ({
  children,
  size = 'md',
  closable = false,
  selected = false,
  onClose,
  className = '',
}: BgrChipProps) => {
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
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center gap-1 border border-solid transition-colors duration-150',
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
          <X className={cn(closeClasses[size])} />
        </button>
      )}
    </span>
  )
}

export default BgrChip
