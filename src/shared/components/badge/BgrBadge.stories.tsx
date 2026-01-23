import { Meta, StoryObj } from '@storybook/react'
import { BgrBadge } from './BgrBadge'

const meta = {
    title: 'Components/BgrBadge',
    component: BgrBadge,
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
} satisfies Meta<typeof BgrBadge>

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
            <BgrBadge color="gray" variant="outline" content="결제완료" />
            <BgrBadge color="yellow" variant="outline" content="발주확인" />
            <BgrBadge color="green" variant="outline" content="상품회수" />
            <BgrBadge color="green" variant="outline" content="상품확인" />
            <BgrBadge color="dark" variant="outline" content="구매확정" />
            <BgrBadge color="red" variant="outline" content="취소요청" />
            <BgrBadge color="grayDark" variant="outline" content="반품요청" />
            <BgrBadge color="grayDark" variant="outline" content="교환요청" />
        </div>
    ),
}

export const SaleOutline: CustomStory = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <BgrBadge color="green" variant="outline" content="판매중" />
            <BgrBadge color="red" variant="outline" content="품절" />
            <BgrBadge color="yellow" variant="outline" content="판매대기" />
            <BgrBadge color="grayDark" variant="outline" content="판매중지" />
            <BgrBadge color="gray" variant="outline" content="판매금지" />
        </div>
    ),
}

export const CancelOrder: CustomStory = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <BgrBadge color="red" variant="outline" content="취소요청" />
            <BgrBadge color="gray" variant="text" content="취소 진행" />
            <BgrBadge color="green" variant="text" content="취소 완료" />
            <BgrBadge color="red" variant="text" content="취소 거절" />
        </div>
    ),
}

export const ReturnOrder: CustomStory = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <BgrBadge color="dark" variant="outline" content="반품요청" />
            <BgrBadge color="green" variant="text" content="반품 승인" />
            <BgrBadge color="gray" variant="text" content="반품 진행" />
            <BgrBadge color="gray" variant="text" content="반품 보류" />
            <BgrBadge color="red" variant="text" content="반품 반려" />
            <BgrBadge color="green" variant="text" content="반품 완료" />
            <BgrBadge color="red" variant="text" content="반품 거절" />
        </div>
    ),
}

export const ExchangeOrder: CustomStory = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <BgrBadge color="dark" variant="outline" content="교환요청" />
            <BgrBadge color="green" variant="text" content="교환 승인" />
            <BgrBadge color="gray" variant="text" content="교환 진행" />
            <BgrBadge color="gray" variant="text" content="교환 보류" />
            <BgrBadge color="red" variant="text" content="교환 반려" />
            <BgrBadge color="green" variant="text" content="교환 완료" />
            <BgrBadge color="red" variant="text" content="교환 거절" />
        </div>
    ),
}
