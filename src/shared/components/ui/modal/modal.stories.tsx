import Modal from './modal'
import { ModalProps } from './modal'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    cancelable: {
      control: 'boolean',
    },
    open: {
      control: 'boolean',
    },
  },
  args: {
    onClose: fn(),
    onClick: fn(),
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

const DefaultComponent = (args: ModalProps) => {
  return <Modal {...args} />
}

export const Default: Story = {
  args: {
    open: true,
    title: '해당 상품 판매를 잠시 멈출까요?',
    contents: '판매중지 시, 고객에게 상품이 노출되지 않습니다. ',
    cancelable: true,
    onClose: fn(),
    onClick: fn(),
  },
  render: DefaultComponent,
}

const NotUseCancledComponent = (args: ModalProps) => {
  return <Modal {...args}></Modal>
}

export const NotUseCancled: Story = {
  args: {
    open: true,
    title: '이미 등록되어 있는 스토어에요',
    contents: '다른 이름으로 스토어 등록을 진행해주세요',
    cancelable: false,
    onClick: fn(),
  },
  render: NotUseCancledComponent,
}

const LongContentsComponent = (args: ModalProps) => {
  return <Modal {...args}></Modal>
}

export const LongContents: Story = {
  args: {
    open: true,
    title: '임시저장된 내용이 있어요',
    contents: (
      <>
        작성 중이던 상품 등록 페이지가 있어요. <br />
        불러올까요? 취소하면 기존에 등록된 페이지는
        <br /> 삭제됩니다.
      </>
    ),
    cancelable: false,
    onClick: fn(),
  },
  render: LongContentsComponent,
}

const ShowModalComponent = (args: ModalProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="border border-gray-500 px-10 py-3"
        onClick={() => {
          setOpen(!open)
        }}
      >
        클릭하면 모달오픈
      </button>
      <Modal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        onClick={() => console.log('click')}
      />
    </>
  )
}

export const ShowModal: Story = {
  args: {
    open: true,
    title: '해당 상품 판매를 잠시 멈출까요?',
    contents: '판매중지 시, 고객에게 상품이 노출되지 않습니다. ',
    cancelable: true,
    onClose: fn(),
    onClick: fn(),
  },
  render: ShowModalComponent,
}
