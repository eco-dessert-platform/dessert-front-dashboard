import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'
import { Button } from '../button/button'
import { Input } from '../input/input'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Dialog',
  component: DialogContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showCloseButton: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof DialogContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    showCloseButton: true,
  },
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="열기" variant="secondary-outlined" />
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle showCloseButton>모달 제목입니다</DialogTitle>
          <DialogDescription>
            판매중지 시, 고객에게 상품이 노출되지 않습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button title="취소" variant="secondary-outlined" />
          </DialogClose>
          <Button title="확인" variant="secondary-filled" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
export const LongTitle: Story = {
  args: {
    showCloseButton: true,
  },
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="열기" variant="secondary-outlined" />
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle showCloseButton>
            제목이 긴 경우의 모달은 이렇게 나와요.
          </DialogTitle>
          <DialogDescription>
            판매중지 시, 고객에게 상품이 노출되지 않습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button title="취소" variant="secondary-outlined" />
          </DialogClose>
          <Button title="확인" variant="secondary-filled" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const NoCloseButton: Story = {
  args: {
    showCloseButton: false,
  },
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="열기" variant="secondary-outlined" />
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>해당 상품 판매를 잠시 멈출까요?</DialogTitle>
          <DialogDescription>
            판매중지 시, 고객에게 상품이 노출되지 않습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button title="취소" variant="secondary-outlined" />
          </DialogClose>
          <Button title="확인" variant="secondary-filled" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
export const Field: Story = {
  args: {
    showCloseButton: true,
    className: 'min-w-167',
  },
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="열기" variant="secondary-outlined" />
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>취소 사유</DialogTitle>
          <DialogDescription>
            <Input />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button title="취소" variant="secondary-outlined" />
          </DialogClose>
          <Button title="확인" variant="secondary-filled" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
