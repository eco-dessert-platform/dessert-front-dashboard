import type { Meta, StoryObj } from '@storybook/react'
import BgrHeader from './BgrHeader'

const meta = {
    title: 'Components/BgrHeader',
    component: BgrHeader,
    parameters: {
        layout: 'fullscreen',
    },
   
} satisfies Meta<typeof BgrHeader>

export default meta
type Story = StoryObj<typeof meta>



export const Default: Story = {
  
}

