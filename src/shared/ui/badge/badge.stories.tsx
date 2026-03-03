import Badge from '@/shared/ui/badge/badge'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['gray', 'grayDark', 'yellow', 'green', 'red', 'dark'],
      description: '배지 색상 테마',
    },
    variant: {
      control: 'select',
      options: ['outline', 'text'],
      description: '배지 스타일',
    },
    children: {
      control: 'text',
      description: '배지 텍스트 내용',
    },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

type CustomStory = Omit<Story, 'args'> & { args?: Story['args'] }

export const Default: Story = {
  args: {
    color: 'green',
    variant: 'outline',
    content: '커스텀 배지',
  },
}

export const OrderOutline: CustomStory = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="gray" variant="outline" content="결제완료" />
      <Badge color="yellow" variant="outline" content="발주확인" />
      <Badge color="green" variant="outline" content="상품회수" />
      <Badge color="green" variant="outline" content="상품확인" />
      <Badge color="dark" variant="outline" content="구매확정" />
      <Badge color="red" variant="outline" content="취소요청" />
      <Badge color="grayDark" variant="outline" content="반품요청" />
      <Badge color="grayDark" variant="outline" content="교환요청" />
    </div>
  ),
}

export const SaleOutline: CustomStory = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="green" variant="outline" content="판매중" />
      <Badge color="red" variant="outline" content="품절" />
      <Badge color="yellow" variant="outline" content="판매대기" />
      <Badge color="grayDark" variant="outline" content="판매중지" />
      <Badge color="gray" variant="outline" content="판매금지" />
    </div>
  ),
}

export const CancelOrder: CustomStory = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="red" variant="outline" content="취소요청" />
      <Badge color="gray" variant="text" content="취소 진행" />
      <Badge color="green" variant="text" content="취소 완료" />
      <Badge color="red" variant="text" content="취소 거절" />
    </div>
  ),
}

export const ReturnOrder: CustomStory = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="dark" variant="outline" content="반품요청" />
      <Badge color="green" variant="text" content="반품 승인" />
      <Badge color="gray" variant="text" content="반품 진행" />
      <Badge color="gray" variant="text" content="반품 보류" />
      <Badge color="red" variant="text" content="반품 반려" />
      <Badge color="green" variant="text" content="반품 완료" />
      <Badge color="red" variant="text" content="반품 거절" />
    </div>
  ),
}

export const ExchangeOrder: CustomStory = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="dark" variant="outline" content="교환요청" />
      <Badge color="green" variant="text" content="교환 승인" />
      <Badge color="gray" variant="text" content="교환 진행" />
      <Badge color="gray" variant="text" content="교환 보류" />
      <Badge color="red" variant="text" content="교환 반려" />
      <Badge color="green" variant="text" content="교환 완료" />
      <Badge color="red" variant="text" content="교환 거절" />
    </div>
  ),
}
