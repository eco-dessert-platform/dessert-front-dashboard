import { Meta, StoryObj } from '@storybook/react'
import { BgrTab, BgrTabList, BgrTabTrigger } from './BgrTab'

type BgrTabStoryProps = React.ComponentProps<typeof BgrTab> & {
  size?: 'sm' | 'lg'
  showNumber?: boolean
}

const meta = {
  title: 'Components/Tabs/BgrTab',
  component: BgrTab,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['line', 'btn'],
      description: '탭의 스타일 변형입니다.',
    },
    defaultValue: {
      control: 'text',
    },
    size: {
      control: 'radio',
      options: ['sm', 'lg'],
      if: { arg: 'variant', eq: 'line' },
    },
    showNumber: {
      control: 'boolean',
    },
  },
} satisfies Meta<BgrTabStoryProps>

export default meta

type Story = StoryObj<BgrTabStoryProps>

export const LineVariant: Story = {
  args: {
    variant: 'line',
    defaultValue: 'account',
  },
  render: ({ variant, size, showNumber, ...args }) => (
    <BgrTab variant={variant} className="w-[400px]" {...args}>
      <BgrTabList>
        <BgrTabTrigger
          value="account"
          size={size}
          number={showNumber ? 1 : undefined}
        >
          Account
        </BgrTabTrigger>
        <BgrTabTrigger
          value="password"
          size={size}
          number={showNumber ? 0 : undefined}
        >
          Password
        </BgrTabTrigger>
        <BgrTabTrigger
          value="settings"
          size={size}
          number={showNumber ? 12 : undefined}
        >
          Settings
        </BgrTabTrigger>
      </BgrTabList>
    </BgrTab>
  ),
}

export const ButtonVariant: Story = {
  args: {
    variant: 'btn',
    defaultValue: 'all',
    showNumber: true,
  },
  render: ({ variant, showNumber, ...args }) => (
    <BgrTab variant={variant} className="w-[600px]" {...args}>
      <BgrTabList>
        <BgrTabTrigger value="all" number={showNumber ? 10 : undefined}>
          전체
        </BgrTabTrigger>
        <BgrTabTrigger value="active" number={showNumber ? 5 : undefined}>
          활성
        </BgrTabTrigger>
        <BgrTabTrigger value="inactive" number={showNumber ? 5 : undefined}>
          비활성
        </BgrTabTrigger>
      </BgrTabList>
    </BgrTab>
  ),
}
