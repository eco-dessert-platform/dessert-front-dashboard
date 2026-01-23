import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import BgrChip from './BgrChip'

const meta = {
    title: 'Components/BgrChip',
    component: BgrChip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        selected: {
            control: 'boolean'
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
} satisfies Meta<typeof BgrChip>

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
        selected: true
    }
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
            <div className="flex gap-2 items-center flex-wrap">
                <BgrChip selected={false} size='sm'>Small</BgrChip>
                <BgrChip selected={false}>Default</BgrChip>
                <BgrChip selected>Active</BgrChip>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
                <BgrChip selected={false} size='sm' closable onClose={fn()}>
                    Closable
                </BgrChip>
                <BgrChip selected={false} closable onClose={fn()}>
                    Closable
                </BgrChip>
                <BgrChip selected closable onClose={fn()}>
                    Closable Primary
                </BgrChip>
            </div>
        </div>
    ),
}

