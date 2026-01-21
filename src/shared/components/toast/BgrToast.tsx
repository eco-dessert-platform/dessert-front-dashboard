import clsx from 'clsx'
import { CircleCheckIcon, X, AlertCircle, Info } from 'lucide-react'
import { toast, ToastOptions, Id } from 'react-toastify'

interface BgrToastProps {
    message: string,
    subMessage?: string,
    variant?: 'success' | 'error' | 'download',
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
            default: 'bg-green-50 border-green-500 text-green-700 border border-solid',
            subMessageColor: 'text-gray-800'
        },
        error: {
            default: 'bg-red-50 border-red-700 text-red-700 border border-solid',
            subMessageColor: 'text-gray-800'
        },

        download: {
            default: 'bg-gray-800 border-gray-800 text-white border border-solid',
            subMessageColor: 'text-white opacity-60'
        }
    }

    const iconMap = {
        success: CircleCheckIcon,
        error: AlertCircle,
        download: ''
    }

    const iconClasses = {
        success: 'text-green-500',
        error: 'text-primary-500',
        warning: 'text-yellow-500',
        info: 'text-blue-500',
        download: 'text-white'
    }

    const Icon = iconMap[variant]

    return (
        <div
            className={clsx(
                'flex items-center gap-4 p-3 rounded-[10px]',
                'shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08),0px_3px_10px_0px_rgba(0,0,0,0.1)]',
                'min-w-[240px] max-w-[400px]',
                variantClasses[variant].default,
                className,
            )}
            role="alert"
        >
            <div className="flex items-start gap-1.5 flex-1 min-w-0">
                {variant !== 'download' && Icon &&
                    <Icon className="relative top-0.5 w-4.5 h-4.5 shrink-0"/>
                }
                <div className='flex-1'>
                    <p className="text-title-14-b">{message}</p>
                    {subMessage &&
                        <p className={clsx(
                            'text-body-12-r',
                            variantClasses[variant].subMessageColor
                        )}>{subMessage}</p>
                    }
                </div>
            </div>
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="shrink-0 hover:opacity-70 transition-opacity"
                    aria-label="닫기"
                >
                    <X className={clsx(
                        'w-5 h-5',iconClasses[variant]
                    )} strokeWidth={1}/>
                </button>
            )}
        </div>
    )
}

// react-toastify와 통합된 헬퍼 함수들
const createToastHelper = (
    message: string,
    variant: 'success' | 'error' | 'download',
    options?: ToastOptions,
    subMessage?: string
): Id => {
    const toastIdRef: { current: Id | null } = { current: null }

    const ToastComponent = () => {
        return (
            <BgrToast
                message={message}
                subMessage={subMessage}
                variant={variant}
                onClose={() => {
                    if (toastIdRef.current !== null) {
                        toast.dismiss(toastIdRef.current)
                    }
                }}
            />
        )
    }

    const id = toast(<ToastComponent />, {
        ...options,
        closeButton: false,
        className: '!p-0 !bg-transparent !shadow-none justify-end',
    })
    toastIdRef.current = id
    return id
}

export const bgrToast = {
    success: (message: string, subMessage?: string, options?: ToastOptions): Id => {
        return createToastHelper(message, 'success', options, subMessage)
    },
    error: (message: string, subMessage?: string, options?: ToastOptions): Id => {
        return createToastHelper(message, 'error', options, subMessage)
    },
    download: (message: string, subMessage?: string, options?: ToastOptions): Id => {
        return createToastHelper(message, 'download', options, subMessage)
    }
}

export default BgrToast

