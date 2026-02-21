import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Toast from './toast'
import { toast } from './toast-helper'

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'info'],
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
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof Toast>

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
    subMessage: '다시 한 번 시도해주세요',
    variant: 'error',
    onClose: fn(),
  },
}

export const Info: Story = {
  args: {
    message: '엑셀이 다운로드 되었습니다.',
    variant: 'info',
    onClose: fn(),
  },
}
export const InfoMessage: Story = {
  args: {
    message: '엑셀이 다운로드 되었습니다.',
    subMessage: '마이페이지에서 확인 가능합니다.',
    variant: 'info',
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
      <Toast message="Success" variant="success" onClose={fn()} />
      <Toast message="Error" variant="error" onClose={fn()} />
      <Toast message="info" variant="info" onClose={fn()} />
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
        onClick={() => toast.success('성공 메시지')}
        className="rounded-sm bg-green-500 px-4 py-2 text-white"
      >
        Show Success Toast
      </button>
      <button
        onClick={() => toast.success('성공 메시지', '성공 메시지 입니다.')}
        className="rounded-sm bg-green-500 px-4 py-2 text-white"
      >
        Show Success Toast2
      </button>
      <button
        onClick={() => toast.error('오류 메시지')}
        className="rounded-sm bg-red-500 px-4 py-2 text-white"
      >
        Show Error Toast
      </button>
      <button
        onClick={() => toast.error('오류 메시지', '오류 메시지 입니다.')}
        className="rounded-sm bg-red-500 px-4 py-2 text-white"
      >
        Show Error Toast2
      </button>
      <button
        onClick={() => toast.info('다운로드 메시지')}
        className="rounded-sm bg-gray-800 px-4 py-2 text-white"
      >
        Show info Toast
      </button>
      <button
        onClick={() =>
          toast.info('info 메시지', '무언가 다운로드 되었습니다.')
        }
        className="rounded-sm bg-gray-800 px-4 py-2 text-white"
      >
        Show Info Toast2
      </button>
    </div>
  ),
}
