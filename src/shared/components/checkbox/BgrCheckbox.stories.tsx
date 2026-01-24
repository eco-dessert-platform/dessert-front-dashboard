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
      options: ['md', 'lg'],
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
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: '체크박스 스타일 타입',
    },
  },
  args: {
    onCheckedChange: fn(),
    type: 'single',
  },
}

export default meta
type Story = StoryObj<typeof BgrCheckbox>

export const Default: Story = {
  args: {
    checked: false,
    label: 'CheckBox',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: false,
    label: 'CheckBox',
  },
}

export const Selected: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <BgrCheckbox {...args} type="single" checked={true} label="CheckBox" />
    </div>
  ),
}

export const VariantMultiple: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <BgrCheckbox {...args} type="multiple" checked={true} label="CheckBox" />
      <BgrCheckbox
        {...args}
        type="multiple"
        checked="indeterminate"
        label="CheckBox"
      />
    </div>
  ),
}
