import { LabelV2 } from './labelv2'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LabelV2> = {
  title: 'Components/LabelV2',
  component: LabelV2,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: '라벨',
  },
}

export default meta

type Story = StoryObj<typeof LabelV2>

export const Default: Story = {}

export const Required: Story = {
  args: {
    required: true,
  },
}

export const WithInput: Story = {
  args: {
    htmlFor: 'story-labelv2-input',
    children: '이메일',
  },
  render: (args) => (
    <div className="flex flex-col gap-2">
      <LabelV2 {...args} />
      <input
        id="story-labelv2-input"
        className="border-gray-300 rounded-md border px-3 py-2"
        placeholder="example@dessert.com"
      />
    </div>
  ),
}
