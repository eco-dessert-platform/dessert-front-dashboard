import { Meta, StoryObj } from '@storybook/react'
import { Tab, TabList, TabTrigger } from './tab'

type TabStoryProps = React.ComponentProps<typeof Tab> & {
  size?: 'sm' | 'lg'
  showNumber?: boolean
}

const meta = {
  title: 'Components/Tabs/Tab',
  component: Tab,
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
} satisfies Meta<TabStoryProps>

export default meta

type Story = StoryObj<TabStoryProps>

export const LineVariant: Story = {
  args: {
    variant: 'line',
    defaultValue: 'account',
  },
  render: ({ variant, size, showNumber, ...args }) => (
    <Tab variant={variant} className="w-[400px]" {...args}>
      <TabList>
        <TabTrigger
          value="account"
          size={size}
          number={showNumber ? 1 : undefined}
        >
          Account
        </TabTrigger>
        <TabTrigger
          value="password"
          size={size}
          number={showNumber ? 0 : undefined}
        >
          Password
        </TabTrigger>
        <TabTrigger
          value="settings"
          size={size}
          number={showNumber ? 12 : undefined}
        >
          Settings
        </TabTrigger>
      </TabList>
    </Tab>
  ),
}

export const ButtonVariant: Story = {
  args: {
    variant: 'btn',
    defaultValue: 'all',
    showNumber: true,
  },
  render: ({ variant, showNumber, ...args }) => (
    <Tab variant={variant} className="w-[600px]" {...args}>
      <TabList>
        <TabTrigger value="all" number={showNumber ? 10 : undefined}>
          전체
        </TabTrigger>
        <TabTrigger value="active" number={showNumber ? 5 : undefined}>
          활성
        </TabTrigger>
        <TabTrigger value="inactive" number={showNumber ? 5 : undefined}>
          비활성
        </TabTrigger>
      </TabList>
    </Tab>
  ),
}
