import type { Meta, StoryObj } from '@storybook/react'
import BgrButton from './BgrButton'

const meta: Meta<typeof BgrButton> = {
    title: 'Components/BgrButton',
    component: BgrButton,
     parameters: {
        layout: 'centered',
    },
    
}

export default meta
type Story = StoryObj<typeof BgrButton>

const baseArgs = {
    title: '버튼',
}

export const Default: Story = {
    args: {
        ...baseArgs,
        variant: 'primary-filled',
    },
}

