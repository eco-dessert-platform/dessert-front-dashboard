import clsx from 'clsx'
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
        base : {
            default : 'bg-white border-gray-200 text-gray-800 font-normal hover:bg-gray-50 active:bg-gray-200',
        },
        selected : {
            default : 'bg-white border-primary-500 text-primary-500 font-semibold hover:bg-gray-50 active:bg-gray-200',
        }
    }

    const sizeClasses = {
        sm: 'px-2 py-1 text-[10px] rounded-full',
        md: 'px-3 py-1.5 text-[12px] rounded-full',
    }

    return (
        <span
            className={clsx(
                'inline-flex items-center justify-center gap-1 border border-solid transition-colors duration-150',
                selected ? variantClasses.selected.default : variantClasses.base.default,
                sizeClasses[size],
                className,
            )}
        >
            <span>{children}</span>
            {closable && onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center justify-center hover:opacity-70 transition-opacity"
                    aria-label="닫기"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </span>
    )
}

export default BgrChip

