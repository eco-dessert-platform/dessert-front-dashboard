import { Meta, StoryObj } from '@storybook/react'
import { BgrBtnTabs, BgrBtnTabsList, BgrBtnTabsTrigger } from './BgrBtnTab'

const meta = {
  title: 'Components/BgrBtnTabs',
  component: BgrBtnTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BgrBtnTabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <BgrBtnTabs defaultValue="tab1" className="w-[400px]" {...args}>
      <BgrBtnTabsList>
        <BgrBtnTabsTrigger value="tab1">Tab 1</BgrBtnTabsTrigger>
        <BgrBtnTabsTrigger value="tab2">Tab 2</BgrBtnTabsTrigger>
      </BgrBtnTabsList>
    </BgrBtnTabs>
  ),
}

export const WithNumbers: Story = {
  render: (args) => (
    <BgrBtnTabs defaultValue="all" className="w-[600px]" {...args}>
      <BgrBtnTabsList>
        <BgrBtnTabsTrigger value="all" number={10}>
          전체
        </BgrBtnTabsTrigger>
        <BgrBtnTabsTrigger value="active" number={5}>
          활성
        </BgrBtnTabsTrigger>
        <BgrBtnTabsTrigger value="inactive" number={5}>
          비활성
        </BgrBtnTabsTrigger>
      </BgrBtnTabsList>
    </BgrBtnTabs>
  ),
}
