import { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './date-picker'
import { DateRange } from 'react-day-picker'
import { useArgs } from 'storybook/internal/preview-api'
import { fn } from '@storybook/test'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { action: 'onChange' },
  },
  args: {
    onChange: fn(),
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

type DatePickerArgs = {
  label: string
  disabled?: boolean
  placeholder?: string
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
}

export const Default: Story = {
  args: {
    label: '조회 기간',
    disabled: false,
  },
  render: function Render(args) {
    const [storyArgs, updateArgs] = useArgs<DatePickerArgs>()
    const finalArgs = { ...args, ...storyArgs }
    const { value } = storyArgs

    return (
      <div className="flex w-57 flex-col gap-1.5">
        <DatePicker
          {...finalArgs}
          value={value}
          onChange={(range) => {
            updateArgs({ value: range })
            args.onChange?.(range)
          }}
        />
        <div className="rounded-sm bg-gray-50 p-4 text-sm">
          <p className="mb-2 font-bold">Committed (확인 후 반영):</p>
          <p>Start: {value?.from?.toLocaleDateString() ?? 'None'}</p>
          <p>End: {value?.to?.toLocaleDateString() ?? 'None'}</p>
        </div>
      </div>
    )
  },
}
