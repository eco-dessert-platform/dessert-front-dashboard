import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import BgrDropdown from './BgrDropdown'

const meta = {
    title: 'Components/BgrDropdown',
    component: BgrDropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            control: 'boolean',
        },
        type: {
            control: 'select',
            options: ['list', 'checkbox'],
        },
    },
    args: {
        onSelect: fn(),
    },
    decorators: [
        (Story) => (
            <div className="h-[300px] w-[300px]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof BgrDropdown>

export default meta
type Story = StoryObj<typeof meta>

const defaultOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
]

export const Default: Story = {
    args: {
        options: defaultOptions,
        value: 'option1',
        placeholder: '선택하세요',
    },
    render: (args) => <BgrDropdown {...args} />,
}

export const Disabled: Story = {
    args: {
        options: defaultOptions,
        disabled: true,
        placeholder: '선택하세요',
    },
    render: (args) => <BgrDropdown {...args} />,
}

export const ManyOptions: Story = {
    args: {
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
            { label: 'Option 4', value: 'option4' },
            { label: 'Option 5', value: 'option5' },
            { label: 'Option 6', value: 'option6' },
            { label: 'Option 7', value: 'option7' },
            { label: 'Option 8', value: 'option8' },
            { label: 'Option 9', value: 'option9' },
            { label: 'Option 10', value: 'option10' },
        ],
        value: 'option3',
        placeholder: '선택하세요',
    },
    render: (args) => <BgrDropdown {...args} />,
}

export const Checkbox: Story = {
    args: {
        options: defaultOptions,
        type: 'checkbox',
        value: 'option1',
        placeholder: '카테고리 선택',
    },
    render: (args) => <BgrDropdown {...args} />,
}
