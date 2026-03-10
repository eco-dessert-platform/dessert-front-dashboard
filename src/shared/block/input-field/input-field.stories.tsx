import { ComponentProps, useEffect, useState } from 'react'

import { fn } from '@storybook/test'

import InputField from './input-field'

import type { Meta, StoryObj } from '@storybook/react'

const InputFieldInteractive = (args: ComponentProps<typeof InputField>) => {
  const [value, setValue] = useState(args.value || '')

  useEffect(() => {
    setValue(args.value || '')
  }, [args.value])

  return (
    <div className={args.layout === 'horizontal' ? 'w-[600px]' : 'w-[400px]'}>
      <InputField
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
      />
    </div>
  )
}

const meta = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      description: '레이아웃 방향',
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
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
    maxLength: {
      description: '최대 입력 글자 수',
      control: 'number',
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
    label: 'Label',
    buttonText: 'Button',
    helperText: 'helper text',
    onButtonClick: fn(),
    layout: 'vertical',
  },
  render: (args) => <InputFieldInteractive {...args} />,
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Input text',
    value: '',
  },
}

export const Completed: Story = {
  args: {
    placeholder: 'Input text',
    value: 'Input text',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Input text',
    value: 'Input text',
    disabled: true,
  },
}

export const Error: Story = {
  args: {
    placeholder: 'Input text',
    value: 'Input text',
    error: true,
    errorMessage: 'error text',
  },
}
