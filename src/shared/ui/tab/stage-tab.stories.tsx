import type { Meta, StoryObj } from '@storybook/react'

import { StageTab } from './stage-tab'

const meta = {
  title: 'Components/Tabs/StageTab',
  component: StageTab,
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 6 },
      description: '현재 활성화된 단계 (1부터 시작)',
    },
    steps: {
      control: 'object',
      description: '단계별 라벨 배열',
    },
  },
} satisfies Meta<typeof StageTab>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentStep: 1,
    steps: [
      '상품 정보',
      '배송 정보',
      '썸네일 등록',
      '상품 옵션 정보',
      '상세페이지 등록',
      '상품 정보 제공 고시',
    ],
  },
}
