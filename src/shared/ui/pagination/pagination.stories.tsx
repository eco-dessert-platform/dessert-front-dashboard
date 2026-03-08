import { useState } from 'react'

import type { PaginationProps } from '@/shared/ui/pagination/pagination'
import { Pagination } from '@/shared/ui/pagination/pagination'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onPageChange: () => {},
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const DefaultComponent = (args: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage)
  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={(page) => {
        setCurrentPage(page)
        args.onPageChange?.(page)
      }}
    />
  )
}

// 첫 번째 그룹 (1-5)
export const FirstGroup: Story = {
  args: {
    currentPage: 1,
    totalPages: 15,
  },
  render: DefaultComponent,
}

// 중간 그룹 (6-10)
const MiddleGroupComponent = (args: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage)
  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={(page) => {
        setCurrentPage(page)
        args.onPageChange?.(page)
      }}
    />
  )
}

export const MiddleGroup: Story = {
  args: {
    currentPage: 6,
    totalPages: 15,
  },
  render: MiddleGroupComponent,
}

// 마지막 그룹 (11-15)
const LastGroupComponent = (args: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage)
  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={(page) => {
        setCurrentPage(page)
        args.onPageChange?.(page)
      }}
    />
  )
}

export const LastGroup: Story = {
  args: {
    currentPage: 11,
    totalPages: 15,
  },
  render: LastGroupComponent,
}

// 단일 페이지 (이동할 페이지가 없는 경우)
const SinglePageComponent = (args: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage)
  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={(page) => {
        setCurrentPage(page)
        args.onPageChange?.(page)
      }}
    />
  )
}

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
  render: SinglePageComponent,
}

// 5페이지 이하 (그룹이 하나만 있는 경우)
const FewPagesComponent = (args: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage)
  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={(page) => {
        setCurrentPage(page)
        args.onPageChange?.(page)
      }}
    />
  )
}

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
  },
  render: FewPagesComponent,
}

// 많은 페이지 (100페이지)
const ManyPagesComponent = (args: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage)
  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={(page) => {
        setCurrentPage(page)
        args.onPageChange?.(page)
      }}
    />
  )
}

export const ManyPages: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
  },
  render: ManyPagesComponent,
}
