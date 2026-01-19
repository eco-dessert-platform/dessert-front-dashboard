import type { Meta, StoryObj } from '@storybook/react'
import BgrInputField from './BgrInputField'
import { fn } from '@storybook/test'
import { useState } from 'react'

const meta = {
    title: 'Components/BgrInputField',
    component: BgrInputField,
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
        helperText: {
            description: '하단 안내 문구',
            control: 'text',
        },
        buttonText: {
            description: '우측 버튼 텍스트',
            control: 'text',
        },
        onButtonClick: {
            description: '버튼 클릭 이벤트 핸들러',
        },
        error: {
            description: '에러 상태 여부 (색상 변경)',
            control: 'boolean',
        },
        errorMessage: {
            description: '에러 메시지 문구',
            control: 'text',
        },
        value: {
            description: '입력 값',
            control: 'text',
        },
        onChange: {
            description: '입력 값 변경 이벤트 핸들러',
        },
    },
    args: {
        onButtonClick: fn(),
    },
} satisfies Meta<typeof BgrInputField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: '닉네임 중복 확인',
        placeholder: '닉네임을 입력해 보세요',
        buttonText: '중복확인',
        required: true,
        helperText: '텍스트를 입력하면 버튼이 활성화됩니다.',
    },
    render: (args) => {
        const [value, setValue] = useState('')
        return (
            <div className="w-[400px]">
                <BgrInputField
                    {...args}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        )
    },
}

export const Error: Story = {
    args: {
        label: '휴대폰 번호',
        placeholder: '숫자만 입력해주세요',
        buttonText: '인증요청',
    },

    render: (args) => {
        const [value, setValue] = useState('')
        // 숫자가 아닌 문자가 포함되어 있는지 체크
        const isNotNumeric = value.length > 0 && !/^\d+$/.test(value)

        return (
            <div className="w-[400px]">
                <BgrInputField
                    {...args}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    error={isNotNumeric}
                    errorMessage={
                        isNotNumeric
                            ? '숫자만 입력 가능합니다.'
                            : args.errorMessage
                    }
                    helperText="숫자만 입력하면 에러가 사라집니다."
                />
            </div>
        )
    },
}
