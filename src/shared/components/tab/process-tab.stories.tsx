import type { Meta, StoryObj } from '@storybook/react'

import { ProcessTab } from './process-tab'

const meta = {
  title: 'Components/Tabs/ProcessTab',
  component: ProcessTab,
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 5 },
      description: '현재 단계 (1부터 시작)',
    },
    steps: {
      control: 'object',
      description: '각 단계의 라벨 배열',
    },
    className: {
      control: 'text',
      description: '추가 스타일 클래스',
    },
  },
} satisfies Meta<typeof ProcessTab>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentStep: 1,
    steps: ['판매자 인증', '스토어 정보 등록', '회원가입 완료'],
  },
}
