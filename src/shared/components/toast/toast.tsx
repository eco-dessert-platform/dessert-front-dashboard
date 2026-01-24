import { Id, toast, ToastOptions } from 'react-toastify'
import BgrToast from './BgrToast'

// react-toastify와 통합된 헬퍼 함수들
const createToastHelper = (
    message: string,
    variant: 'success' | 'error' | 'warning' | 'info',
    options?: ToastOptions,
): Id => {
    const toastIdRef: { current: Id | null } = { current: null }

    const ToastComponent = () => {
        return (
            <BgrToast
                message={message}
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
        className: '!p-0 !bg-transparent !shadow-none',
    })
    toastIdRef.current = id
    return id
}

export const bgrToast = {
    success: (message: string, options?: ToastOptions): Id => {
        return createToastHelper(message, 'success', options)
    },
    error: (message: string, options?: ToastOptions): Id => {
        return createToastHelper(message, 'error', options)
    },
    warning: (message: string, options?: ToastOptions): Id => {
        return createToastHelper(message, 'warning', options)
    },
    info: (message: string, options?: ToastOptions): Id => {
        return createToastHelper(message, 'info', options)
    },
}
