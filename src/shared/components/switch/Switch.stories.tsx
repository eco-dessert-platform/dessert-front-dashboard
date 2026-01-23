import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'
import { Switch } from './Switch'

const meta = {
    title: 'Shared/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: {
        checked: {
            control: 'boolean',
            description: '스위치의 체크 상태',
        },
        disabled: {
            control: 'boolean',
            description: '비활성화 여부',
        },
    },
    render: function Render(args) {
        const [{ checked }, updateArgs] = useArgs()

        const handleCheckedChange = (newChecked: boolean) => {
            updateArgs({ checked: newChecked })
        }

        return (
            <Switch
                {...args}
                checked={checked}
                onCheckedChange={handleCheckedChange}
            />
        )
    },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>
// Off 상태
export const Off: Story = {
    args: {
        checked: false,
    },
}

// On 상태
export const On: Story = {
    args: {
        checked: true,
    },
}

// Disabled Off
export const DisabledOff: Story = {
    args: {
        checked: false,
        disabled: true,
    },
}

// Disabled On
export const DisabledOn: Story = {
    args: {
        checked: true,
        disabled: true,
    },
}
