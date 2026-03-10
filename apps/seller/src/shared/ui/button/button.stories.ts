import Button from '@/shared/ui/button/button'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Button>

const baseArgs = {
  title: '버튼',
}

export const Default: Story = {
  args: {
    ...baseArgs,
    variant: 'primary-filled',
  },
}
