import type { Meta, StoryObj } from '@storybook/react'

import { BgrProcessTab } from './BgrProcessTab'

const meta = {
  title: 'Components/BgrProcessTab',
  component: BgrProcessTab,
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
} satisfies Meta<typeof BgrProcessTab>

export default meta
type Story = StoryObj<typeof meta>

export const Step1: Story = {
  args: {
    currentStep: 1,
    steps: ['판매자 인증', '스토어 정보 등록', '회원가입 완료'],
  },
}

export const Step2: Story = {
  args: {
    currentStep: 2,
    steps: ['판매자 인증', '스토어 정보 등록', '회원가입 완료'],
  },
}

export const Step3: Story = {
  args: {
    currentStep: 3,
    steps: ['판매자 인증', '스토어 정보 등록', '회원가입 완료'],
  },
}
