import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import BgrCheckbox from './BgrCheckbox'

const meta: Meta<typeof BgrCheckbox> = {
  title: 'Components/BgrCheckbox',
  component: BgrCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['m', 'l'],
      description: '체크박스 크기 및 라벨 폰트 크기',
    },
    checked: {
      control: 'select',
      options: [true, false, 'indeterminate'],
      description: '체크 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    variant: {
      control: 'radio',
      options: ['default', 'multiple'],
      description: '체크박스 스타일 타입',
    },
  },
  args: {
    onCheckedChange: fn(),
    variant: 'default',
  },
}

export default meta
type Story = StoryObj<typeof BgrCheckbox>

export const Default: Story = {
  args: {
    checked: false,
    label: 'ChebkBox',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: false,
    label: 'ChebkBox',
  },
}

export const Selected: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <BgrCheckbox
        {...args}
        variant="default"
        checked={true}
        label="ChebkBox"
      />
    </div>
  ),
}

export const VariantMultiple: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <BgrCheckbox
        {...args}
        variant="multiple"
        checked={true}
        label="ChebkBox"
      />
      <BgrCheckbox
        {...args}
        variant="multiple"
        checked="indeterminate"
        label="ChebkBox"
      />
    </div>
  ),
}
