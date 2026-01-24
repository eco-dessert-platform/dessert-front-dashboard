import type { Meta, StoryObj } from '@storybook/react'
import BgrBottomNavBar from './BgrBottomNavBar'

const meta: Meta<typeof BgrBottomNavBar> = {
    title: 'Components/BgrBottomNavBar',
  component: BgrBottomNavBar,
      parameters: {
        layout: 'fullscreen',
    },
}

export default meta
type Story = StoryObj<typeof BgrBottomNavBar>

export const Primary: Story = {}
