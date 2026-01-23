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
    /**
     * 성공 토스트 입니다
     *
     * @param message - 메인 메시지
     * @param subMessage - 보조 메시지 (선택)
     * @param options - react-toastify 옵션 (선택)
     * @returns toast ID
     *
     * @example
     * bgrToast.success('저장되었습니다')
     *
     * @example
     * bgrToast.success(
     *   '저장되었습니다',
     *   '변경사항이 성공적으로 저장되었습니다'
     * )
     *
     * @example
     * bgrToast.success(
     *   '저장되었습니다',
     *   undefined,
     *   { autoClose: 5000 }
     * )
     */
    success: (
        message: string,
        subMessage?: string,
        options?: ToastOptions,
    ): Id => {
        return createToastHelper(message, 'success', options, subMessage)
    },
    /**
     * 에러 토스트를 표시합니다.
     * 사용법은 위와 같습니다.
     */
    error: (
        message: string,
        subMessage?: string,
        options?: ToastOptions,
    ): Id => {
        return createToastHelper(message, 'error', options, subMessage)
    },
    /**
     * 정보 토스트를 표시합니다.
     * 사용법은 위와 같습니다.
     */
    info: (
        message: string,
        subMessage?: string,
        options?: ToastOptions,
    ): Id => {
        return createToastHelper(message, 'info', options, subMessage)
    },
}
