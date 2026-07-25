import { StageTab } from './stage-tab'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Tabs/StageTab',
  component: StageTab,
  tags: ['autodocs'],
  argTypes: {
    completedSteps: {
      control: 'object',
      description: '각 단계의 필수 입력 완료 여부',
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
    completedSteps: [true, false, false, false, false, false],
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

export const AllCompleted: Story = {
  args: {
    completedSteps: [true, true, true, true, true, true],
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
