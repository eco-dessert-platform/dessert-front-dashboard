import Label from '@/shared/ui/label/label'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Primary: Story = {
  args: {
    label: 'Label',
  },
}

export const Required: Story = {
  args: {
    label: 'Label',
    required: true,
  },
}
