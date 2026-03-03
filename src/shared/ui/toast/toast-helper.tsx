import Toast from '@/shared/ui/toast/toast'
import { Id, toast as t, ToastOptions } from 'react-toastify'

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
      <Toast
        message={message}
        subMessage={subMessage}
        variant={variant}
        onClose={() => {
          if (toastIdRef.current !== null) {
            t.dismiss(toastIdRef.current)
          }
        }}
      />
    )
  }

  const id = t(<ToastComponent />, {
    ...options,
    className: '!p-0 !bg-transparent !shadow-none',
  })
  toastIdRef.current = id
  return id
}

export const toast = {
  success: (
    message: string,
    subMessage?: string,
    options?: ToastOptions,
  ): Id => {
    return createToastHelper(message, 'success', options, subMessage)
  },
  error: (message: string, subMessage?: string, options?: ToastOptions): Id => {
    return createToastHelper(message, 'error', options, subMessage)
  },
  info: (message: string, subMessage?: string, options?: ToastOptions): Id => {
    return createToastHelper(message, 'info', options, subMessage)
  },
}
