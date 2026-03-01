import DaySelector, { DaySelectorProps } from '@/shared/block/day-selector/day-selector'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'

const meta = {
  title: 'Components/DaySelector',
  component: DaySelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onDayChange: fn(),
  },
} satisfies Meta<typeof DaySelector>

export default meta
type Story = StoryObj<typeof meta>

const DefaultComponent = (args: DaySelectorProps) => {
  const [selectedDays, setSelectedDays] = useState<string[]>(
    args.selectedDays || [],
  )
  return (
    <DaySelector
      selectedDays={selectedDays}
      onDayChange={(days) => {
        setSelectedDays(days)
        args.onDayChange?.(days)
      }}
    />
  )
}

export const Default: Story = {
  args: {
    selectedDays: [],
  },
  render: DefaultComponent,
}

const WithSelectedDaysComponent = (args: DaySelectorProps) => {
  const [selectedDays, setSelectedDays] = useState<string[]>(
    args.selectedDays || [],
  )
  return (
    <DaySelector
      selectedDays={selectedDays}
      onDayChange={(days) => {
        setSelectedDays(days)
        args.onDayChange?.(days)
      }}
    />
  )
}

export const WithSelectedDays: Story = {
  args: {
    selectedDays: ['mon', 'wed', 'fri'],
  },
  render: WithSelectedDaysComponent,
}

const AllSelectedComponent = (args: DaySelectorProps) => {
  const [selectedDays, setSelectedDays] = useState<string[]>(
    args.selectedDays || [],
  )
  return (
    <DaySelector
      selectedDays={selectedDays}
      onDayChange={(days) => {
        setSelectedDays(days)
        args.onDayChange?.(days)
      }}
    />
  )
}

export const AllSelected: Story = {
  args: {
    selectedDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
  },
  render: AllSelectedComponent,
}

const WeekdaysOnlyComponent = (args: DaySelectorProps) => {
  const [selectedDays, setSelectedDays] = useState<string[]>(
    args.selectedDays || [],
  )
  return (
    <DaySelector
      selectedDays={selectedDays}
      onDayChange={(days) => {
        setSelectedDays(days)
        args.onDayChange?.(days)
      }}
    />
  )
}

export const WeekdaysOnly: Story = {
  args: {
    selectedDays: ['mon', 'tue', 'wed', 'thu', 'fri'],
  },
  render: WeekdaysOnlyComponent,
}
