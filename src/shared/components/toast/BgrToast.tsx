import { cn } from 'src/shared/lib/shadcn/lib/utils'
import { X } from 'lucide-react'

interface BgrToastProps {
  message: string
  subMessage?: string
  variant?: 'success' | 'error' | 'info'
  onClose?: () => void
  className?: string
}

const BgrToast = ({
  message,
  subMessage,
  variant = 'success',
  onClose,
  className = '',
}: BgrToastProps) => {
  const variantClasses = {
    success: {
      default:
        'bg-green-50 border-green-500 text-green-700 border border-solid',
      subMessageColor: 'text-gray-800',
    },
    error: {
      default: 'bg-red-50 border-red-700 text-red-700 border border-solid',
      subMessageColor: 'text-gray-800',
    },

    info: {
      default: 'bg-gray-800 border-gray-800 text-white border border-solid',
      subMessageColor: 'text-white opacity-60',
    },
  }

  const iconMap = {
    success: {
      svgCode:
        'M8.59961 0C13.3493 0 17.1992 3.84996 17.1992 8.59961C17.1992 13.3493 13.3493 17.1992 8.59961 17.1992C3.84996 17.1992 0 13.3493 0 8.59961C6.44306e-08 3.84996 3.84996 6.44285e-08 8.59961 0ZM12.9111 5.58887C12.6594 5.33734 12.2517 5.33735 12 5.58887L7.51367 10.0732L5.5 8.05859C5.2484 7.80748 4.84052 7.80764 4.58887 8.05859L4.58789 8.05957C4.33683 8.31126 4.33743 8.71906 4.58887 8.9707L7.05859 11.4404C7.31033 11.6921 7.71893 11.6922 7.9707 11.4404L12.9111 6.5C13.1627 6.24824 13.1627 5.84057 12.9111 5.58887Z',
      color: '#43A047',
    },
    error: {
      svgCode:
        'M8.59961 0C13.3493 0 17.1992 3.84996 17.1992 8.59961C17.1992 13.3493 13.3493 17.1992 8.59961 17.1992C3.84996 17.1992 0 13.3493 0 8.59961C6.44306e-08 3.84996 3.84996 6.44285e-08 8.59961 0ZM8.59863 11.7021C8.04921 11.7021 7.60352 12.1271 7.60352 12.6514C7.60357 13.1756 8.04924 13.6006 8.59863 13.6006H8.6084C9.15779 13.6006 9.60346 13.1756 9.60352 12.6514C9.60352 12.1271 9.15782 11.7021 8.6084 11.7021H8.59863ZM8.59863 3.60059C8.04924 3.60059 7.60357 4.02556 7.60352 4.5498V8.60059C7.60366 9.12477 8.0493 9.5498 8.59863 9.5498C9.14783 9.54965 9.59263 9.12467 9.59277 8.60059V4.5498C9.59272 4.02565 9.14788 3.60074 8.59863 3.60059Z',
      color: '#EC0000',
    },
    info: {
      svgCode: '',
      color: '',
    },
  }

  const iconClasses = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-white',
  }

  const Icon = iconMap[variant]

  return (
    <div
      className={cn(
        'rounded-unit-10 flex items-center gap-4 p-3',
        'shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08),0px_3px_10px_0px_rgba(0,0,0,0.1)]',
        'max-w-[400px] min-w-[240px]',
        variantClasses[variant].default,
        className,
      )}
      role="alert"
    >
      <div className="flex min-w-0 flex-1 items-start gap-1.5">
        {variant !== 'info' && Icon.svgCode && (
          <div className="relative top-0.5 h-4.5 w-4.5 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path d={Icon.svgCode} fill={Icon.color} />
            </svg>
          </div>
        )}
        <div className="flex-1">
          <p className="text-title-14-b">{message}</p>
          {subMessage && (
            <p
              className={cn(
                'text-body-12-r',
                variantClasses[variant].subMessageColor,
              )}
            >
              {subMessage}
            </p>
          )}
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 transition-opacity hover:opacity-70"
          aria-label="닫기"
        >
          <X className={cn('h-5 w-5', iconClasses[variant])} strokeWidth={1} />
        </button>
      )}
    </div>
  )
}

export default BgrToast
