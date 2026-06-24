import { TEXT_VARIANTS, type TextVariant } from '../../types/font'
import { Text } from './text'
import type { Meta, StoryObj } from '@storybook/react'

const textVariantOptions = Object.keys(TEXT_VARIANTS) as TextVariant[]

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    variant: {
      control: 'select',
      options: textVariantOptions,
    },
    children: {
      control: 'text',
    },
    className: {
      control: false,
    },
  },
  args: {
    as: 'p',
    variant: 'body12-r',
    children: '텍스트 컴포넌트 샘플',
  },
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  args: {
    children: undefined,
  },
  render: () => (
    <div className="w-[520px] space-y-8">
      {textVariantOptions.map((variant) => (
        <div key={variant} className="flex items-baseline gap-12">
          <span className="typo-body-12-r min-w-[140px] text-gray-500">
            {variant}
          </span>
          <Text variant={variant}>가나다라마바사 ABC 123</Text>
        </div>
      ))}
    </div>
  ),
}

export const SemanticTags: Story = {
  args: {
    children: undefined,
  },
  render: () => (
    <div className="w-[520px] space-y-6">
      <Text as="h1" variant="heading24-sb">
        Heading as h1
      </Text>
      <Text as="h2" variant="heading20-sb">
        Heading as h2
      </Text>
      <Text as="p" variant="title16-r">
        Paragraph as p
      </Text>
      <Text as="span" variant="body12-r">
        Inline as span
      </Text>
    </div>
  ),
}
