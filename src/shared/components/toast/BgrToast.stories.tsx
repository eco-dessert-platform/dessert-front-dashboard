import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import BgrToast from './BgrToast'
import { bgrToast } from './BgrToast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const meta = {
    title: 'Components/BgrToast',
    component: BgrToast,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['success', 'error', 'download'],
        },
    },
    args: {
        onClose: fn(),
    },
    decorators: [
        (Story) => (
            <div>
                <Story />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={true}
                    closeOnClick={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    toastClassName="!p-0 !bg-transparent !shadow-none !min-w-0"
                />
            </div>
        ),
    ],
} satisfies Meta<typeof BgrToast>

export default meta
type Story = StoryObj<typeof BgrToast>

export const Success: Story = {
    args: {
        message: '성공적으로 저장되었습니다',
        variant: 'success',
        onClose: fn(),
    },
}

export const SuccessMessage: Story = {
    args: {
        message: '성공적으로 저장되었습니다.',
        subMessage: '성공 상태로 변경을 완료했습니다.',
        variant: 'success',
        onClose: fn(),
    },
}

export const Error: Story = {
    args: {
        message: '일시적인 오류가 발생했습니다.',
        variant: 'error',
        onClose: fn(),
    },
}
export const ErrorMessage: Story = {
    args: {
        message: '주문상태 수정 중 일시적인 오류가 발생했습니다.',
        subMessage:'다시 한 번 시도해주세요',
        variant: 'error',
        onClose: fn(),
    },
}

// export const Warning: Story = {
//     args: {
//         message: '주의가 필요합니다.',
//         variant: 'warning',
//         onClose: fn(),
//     },
// }

export const Download: Story = {
    args: {
        message: '엑셀이 다운로드 되었습니다.',
        variant: 'download',
        onClose: fn(),
    },
}
export const DownloadMessage: Story = {
    args: {
        message: '엑셀이 다운로드 되었습니다.',
        subMessage:'마이페이지에서 확인 가능합니다.',
        variant: 'download',
        onClose: fn(),
    },
}

export const LongMessage: Story = {
    args: {
        message:
            '이것은 매우 긴 메시지입니다. 토스트 컴포넌트가 긴 텍스트를 어떻게 처리하는지 확인할 수 있습니다.',
        variant: 'success',
        onClose: fn(),
    },
}

export const AllVariants: Story = {
    args: {
        message: 'All Variants',
        variant: 'success',
    },
    render: () => (
        <div className="flex flex-col gap-4">
            <BgrToast message="Success" variant="success" onClose={fn()} />
            <BgrToast message="Error" variant="error" onClose={fn()} />
            <BgrToast message="download" variant="download" onClose={fn()} />
        </div>
    ),
}

export const WithHelperFunctions: Story = {
    args: {
        message: 'Helper Functions',
        variant: 'success',
    },
    render: () => (
        <div className="flex flex-col gap-4">
            <button
                onClick={() => bgrToast.success('성공 메시지')}
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                Show Success Toast
            </button>
            <button
                onClick={() => bgrToast.success('성공 메시지','성공 메시지 입니다.')}
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                Show Success Toast2
            </button>
            <button
                onClick={() => bgrToast.error('오류 메시지')}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                Show Error Toast
            </button>
            <button
                onClick={() => bgrToast.error('오류 메시지','오류 메시지 입니다.')}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                Show Error Toast2
            </button>
            <button
                onClick={() => bgrToast.download('다운로드 메시지')}
                className="px-4 py-2 bg-gray-800 text-white rounded"
            >
                Show Download Toast
            </button>
            <button
                onClick={() => bgrToast.download('다운로드 메시지','무언가 다운로드 되었습니다.')}
                className="px-4 py-2 bg-gray-800 text-white rounded"
            >
                Show Download Toast2
            </button>
        </div>
    ),
}

