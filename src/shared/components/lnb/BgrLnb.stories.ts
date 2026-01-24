import type { Meta, StoryObj } from '@storybook/react'
import BgrLnb from './BgrLnb'

const meta: Meta<typeof BgrLnb> = {
    title: 'Components/BgrLnb',
  component: BgrLnb,
      parameters: {
        layout: 'fullscreen',
    },
}

export default meta
type Story = StoryObj<typeof BgrLnb>

export const Primary: Story = {}
