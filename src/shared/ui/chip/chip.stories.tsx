import Chip from '@/shared/ui/chip/chip'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    closable: {
      control: 'boolean',
    },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Chip',
    size: 'md',
    closable: false,
    selected: false,
  },
}

export const Selected: Story = {
  args: {
    children: 'Selected Chip',
    size: 'md',
    selected: true,
  },
}

export const Closable: Story = {
  args: {
    children: 'Closable Chip',
    size: 'md',
    closable: true,
    onClose: fn(),
  },
}

export const Small: Story = {
  args: {
    children: 'Small Chip',
    size: 'sm',
    closable: false,
  },
}

export const AllVariants: Story = {
  args: {
    children: '',
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Chip selected={false} size="sm">
          Small
        </Chip>
        <Chip selected={false}>Default</Chip>
        <Chip selected>Active</Chip>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Chip selected={false} size="sm" closable onClose={fn()}>
          Closable
        </Chip>
        <Chip selected={false} closable onClose={fn()}>
          Closable
        </Chip>
        <Chip selected closable onClose={fn()}>
          Closable Primary
        </Chip>
      </div>
    </div>
  ),
}
