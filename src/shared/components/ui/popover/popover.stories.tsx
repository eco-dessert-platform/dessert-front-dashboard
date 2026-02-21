import type { Meta, StoryObj } from '@storybook/react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import Button from '../button/button'

const meta = {
  title: 'Components/Popover',
  component: PopoverContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '팝오버의 제목',
    },
    showClose: {
      control: 'boolean',
      description: '닫기 버튼 표시 여부',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '팝오버의 정렬 방식',
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: '팝오버가 나타날 방향',
    },
    sideOffset: {
      control: 'number',
      description: '트리거와의 거리 (px)',
    },
  },
} satisfies Meta<typeof PopoverContent>

export default meta
type Story = StoryObj<typeof PopoverContent>

export const Default: Story = {
  args: {
    title: 'Main Title',
    showClose: true,
    align: 'center',
    side: 'bottom',
    sideOffset: 4,
  },
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button title="Click Me" variant="primary-filled" />
      </PopoverTrigger>
      <PopoverContent {...args}>
        <div className="flex flex-col gap-4">
          <p className="typo-body-12-r text-gray-700">
            This is a basic popover content.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
