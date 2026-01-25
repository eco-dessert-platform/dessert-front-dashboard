import BottomNavBar from '@/shared/components/blocks/bottom-nav-bar/bottom-nav-bar'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof BottomNavBar> = {
  title: 'Components/BottomNavBar',
  component: BottomNavBar,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof BottomNavBar>

export const Primary: Story = {}
