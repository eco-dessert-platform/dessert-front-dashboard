import BgrToast from './BgrToast'
import { toast, ToastOptions, Id } from 'react-toastify'

// react-toastify와 통합된 헬퍼 함수들
const createToastHelper = (
    message: string,
    variant: 'success' | 'error' | 'info',
    options?: ToastOptions,
    subMessage?: string,
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
    success: (
        message: string,
        subMessage?: string,
        options?: ToastOptions,
    ): Id => {
        return createToastHelper(message, 'success', options, subMessage)
    },
    error: (
        message: string,
        subMessage?: string,
        options?: ToastOptions,
    ): Id => {
        return createToastHelper(message, 'error', options, subMessage)
    },
    info: (
        message: string,
        subMessage?: string,
        options?: ToastOptions,
    ): Id => {
        return createToastHelper(message, 'info', options, subMessage)
    },
}