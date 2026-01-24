import { Meta, StoryObj } from '@storybook/react'
import { BgrLineTabs, BgrLineTabsList, BgrLineTabsTrigger } from './BgrLineTab'

// Story에서 사용할 통합 Props 타입 정의
type BgrLineTabsStoryProps = React.ComponentProps<typeof BgrLineTabs> & {
  size?: 'sm' | 'lg'
  showNumber?: boolean
}

const meta = {
  title: 'Components/Tabs/BgrLineTab',
  component: BgrLineTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    componentSubtitle:
      'BgrLineTabs는 하단 라인 스타일이 적용된 탭 컴포넌트입니다.',
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: '초기에 활성화될 탭의 value 값입니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: '제어 컴포넌트로 사용할 때 현재 선택된 탭의 value입니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    onValueChange: {
      action: 'onValueChange',
      description: '탭이 변경될 때 호출되는 콜백 함수입니다.',
    },
    // Trigger Props를 위한 커스텀 args
    size: {
      control: 'radio',
      options: ['sm', 'lg'],
      description: '탭 버튼의 크기입니다. (Trigger Prop)',
      table: {
        category: 'Trigger Props',
        type: { summary: "'sm' | 'lg'" },
        defaultValue: { summary: "'sm'" },
      },
    },
    showNumber: {
      control: 'boolean',
      description: '탭 옆에 숫자를 표시할지 여부입니다. (테스트용)',
      table: {
        category: 'Trigger Props',
      },
    },
  },
} satisfies Meta<BgrLineTabsStoryProps>

export default meta

type Story = StoryObj<BgrLineTabsStoryProps>

export const Default: Story = {
  args: {
    defaultValue: 'account',
    size: 'sm',
    showNumber: false,
  },
  render: ({ size, showNumber, ...args }) => (
    <BgrLineTabs className="w-[400px]" {...args}>
      <BgrLineTabsList>
        <BgrLineTabsTrigger
          value="account"
          size={size}
          number={showNumber ? 5 : undefined}
        >
          Account
        </BgrLineTabsTrigger>
        <BgrLineTabsTrigger
          value="password"
          size={size}
          number={showNumber ? 0 : undefined}
        >
          Password
        </BgrLineTabsTrigger>
        <BgrLineTabsTrigger
          value="settings"
          size={size}
          number={showNumber ? 12 : undefined}
        >
          Settings
        </BgrLineTabsTrigger>
      </BgrLineTabsList>
    </BgrLineTabs>
  ),
}

export const LargeSize: Story = {
  args: {
    defaultValue: 'account',
    size: 'lg',
  },
  render: ({ size, ...args }) => (
    <BgrLineTabs className="w-[500px]" {...args}>
      <BgrLineTabsList>
        <BgrLineTabsTrigger value="account" size={size}>
          Account (L)
        </BgrLineTabsTrigger>
        <BgrLineTabsTrigger value="password" size={size}>
          Password (L)
        </BgrLineTabsTrigger>
        <BgrLineTabsTrigger value="settings" size={size}>
          Settings (L)
        </BgrLineTabsTrigger>
      </BgrLineTabsList>
    </BgrLineTabs>
  ),
}

export const WithNumbers: Story = {
  args: {
    defaultValue: 'orders',
    size: 'sm',
    showNumber: true,
  },
  render: ({ size, ...args }) => (
    <BgrLineTabs className="w-[600px]" {...args}>
      <BgrLineTabsList>
        <BgrLineTabsTrigger value="orders" number={12} size={size}>
          Orders
        </BgrLineTabsTrigger>
        <BgrLineTabsTrigger value="pending" number={4} size={size}>
          Pending
        </BgrLineTabsTrigger>
        <BgrLineTabsTrigger value="completed" number={8} size={size}>
          Completed
        </BgrLineTabsTrigger>
      </BgrLineTabsList>
    </BgrLineTabs>
  ),
}
