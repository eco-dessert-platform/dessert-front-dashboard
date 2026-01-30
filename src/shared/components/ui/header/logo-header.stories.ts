import LogoHeader from '@/shared/components/ui/header/logo-header'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Header',
  component: LogoHeader,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LogoHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
