import type { Meta, StoryObj } from '@storybook/react'
import BgrInput from './BgrInput'

const meta = {
    title: 'Components/BgrInput',
    component: BgrInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            description: '상단 라벨 텍스트',
            control: 'text',
        },
        required: {
            description: '필수 입력 여부 (true: 라벨 옆 * 표시)',
            control: 'boolean',
        },
        placeholder: {
            description: '입력창 플레이스홀더',
            control: 'text',
        },
        value: {
            description: '입력 값',
            control: 'text',
        },
        onChange: {
            description: '입력 값 변경 이벤트 핸들러',
        },
        disabled: {
            description: '비활성화 상태 여부',
            control: 'boolean',
        },
        type: {
            description: '입력 타입',
            control: 'select',
            options: ['text', 'email', 'password', 'tel', 'number'],
        },
        error: {
            description: '에러 상태 여부 (색상 변경)',
            control: 'boolean',
        },
        errorMessage: {
            description: '에러 메시지 문구',
            control: 'text',
        },
        helperText: {
            description: '하단 안내 문구',
            control: 'text',
        },
    },
} satisfies Meta<typeof BgrInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: '일반 입력',
        placeholder: '내용을 입력해주세요',
        required: true,
    },
}

export const Password: Story = {
    args: {
        label: '비밀번호',
        type: 'password',
        placeholder: '비밀번호를 입력해주세요',
    },
}

export const Error: Story = {
    args: {
        label: '에러 상태',
        placeholder: '에러가 발생한 입력창',
        error: true,
        errorMessage: '에러가 발생했습니다.',
    },
}

export const Disabled: Story = {
    args: {
        label: '비활성화 상태',
        placeholder: '비활성화 되었습니다',
        disabled: true,
    },
}

export const WithHelperText: Story = {
    args: {
        label: '닉네임',
        placeholder: '닉네임을 입력해주세요',
        helperText: '한글, 영문, 숫자 포함 2~10자',
    },
}
