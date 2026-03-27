import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Editor, type EditorProps } from './editor'

const meta = {
  title: 'Components/Editor',
  component: Editor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    toolbar: { control: 'boolean' },
    image: { control: 'boolean' },
    height: { control: { type: 'number', min: 100, max: 800, step: 50 } },
  },
} satisfies Meta<typeof Editor>

export default meta
type Story = StoryObj<typeof meta>

const Template = (args: EditorProps) => {
  const [value, setValue] = useState(args.value || '')
  return (
    <div className="w-[700px] pb-16">
      <Editor {...args} value={value} onChange={setValue} />
    </div>
  )
}

export const Default: Story = {
  args: {
    placeholder: '내용을 입력하세요.',
  },
  render: Template,
}

export const WithImage: Story = {
  args: {
    image: true,
    placeholder: '이미지 버튼이 활성화된 에디터입니다.',
  },
  render: Template,
}

export const MinimalToolbar: Story = {
  args: {
    toolbar: false,
    placeholder: '내용을 입력하세요.',
  },
  render: Template,
}

export const CustomHeight: Story = {
  args: {
    height: 500,
    placeholder: '내용을 입력하세요.',
  },
  render: Template,
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value:
      '<p>비활성화된 에디터입니다. <strong>수정할 수 없습니다.</strong></p>',
  },
  render: (args) => (
    <div className="w-[700px] pb-16">
      <Editor {...args} />
    </div>
  ),
}
