import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { DateRange } from 'react-day-picker'

import { Calendar } from './calendar'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

const CalendarWithDraft = () => {
  // committed: 확인 버튼을 눌러야 반영되는 최종 값
  const [committedRange, setCommittedRange] = useState<DateRange | undefined>()
  // draft: 캘린더 내에서 자유롭게 변경되는 임시 값
  const [draftRange, setDraftRange] = useState<DateRange | undefined>()

  const handleConfirm = () => {
    setCommittedRange(draftRange)
    console.log('Confirmed:', draftRange)
  }

  const handleReset = () => {
    setDraftRange(undefined)
    console.log('Reset draft')
  }

  return (
    <div>
      <Calendar
        selected={draftRange}
        onSelect={setDraftRange}
        onConfirm={handleConfirm}
        onReset={handleReset}
      />

      <div className="w-full max-w-sm rounded-12 bg-gray-50 p-4 text-sm">
        <p className="mb-2 font-bold">Draft (캘린더 내부):</p>
        <p>Start: {draftRange?.from?.toLocaleDateString() ?? 'None'}</p>
        <p>End: {draftRange?.to?.toLocaleDateString() ?? 'None'}</p>

        <hr className="my-2" />

        <p className="mb-2 font-bold">Committed (확인 후 반영):</p>
        <p>Start: {committedRange?.from?.toLocaleDateString() ?? 'None'}</p>
        <p>End: {committedRange?.to?.toLocaleDateString() ?? 'None'}</p>
      </div>
    </div>
  )
}

export const Default: Story = {
  args: {
    onSelect: () => {},
  },
  render: () => <CalendarWithDraft />,
}
