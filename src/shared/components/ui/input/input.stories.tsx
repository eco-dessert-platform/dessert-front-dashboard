import Input from '@/shared/components/ui/input/input'
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentProps, useEffect, useState } from 'react'

const meta = {
  title: 'Components/Input',
  component: Input,
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
    maxLength: {
      description: '최대 입력 글자 수',
      control: 'number',
    },
    helperText: {
      description: '하단 안내 문구',
      control: 'text',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

const InputInteractive = (args: ComponentProps<typeof Input>) => {
  const [value, setValue] = useState(args.value || '')

  useEffect(() => {
    setValue(args.value || '')
  }, [args.value])

  return (
    <div className="w-[400px]">
      <Input
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

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Input text',
    helperText: 'helper text',
    value: '',
  },
  render: (args) => <InputInteractive {...args} />,
}

export const Completed: Story = {
  args: {
    label: 'Label',
    placeholder: 'Input text',
    helperText: 'helper text',
    value: 'Input text',
  },
  render: (args) => (
    <div className="w-[400px]">
      <Input {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    label: 'Label',
    placeholder: 'Input text',
    helperText: 'helper text',
    value: 'Input text',
    disabled: true,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Input {...args} />
    </div>
  ),
}

export const Error: Story = {
  args: {
    label: 'Label',
    placeholder: 'Input text',
    value: 'Input text',
    error: true,
    errorMessage: 'error text',
  },
  render: (args) => (
    <div className="w-[400px]">
      <Input {...args} />
    </div>
  ),
}
