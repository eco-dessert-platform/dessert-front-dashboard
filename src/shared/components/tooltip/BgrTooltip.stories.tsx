import type { Meta, StoryObj } from '@storybook/react'
import { BgrTooltip } from './BgrTooltip'

const meta = {
    title: 'Components/BgrTooltip',
    component: BgrTooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof BgrTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const AllPositions: Story = {
    args: {
        children: null,
    },
    render: () => (
        <>
            {/* Top */}
            <div className="flex flex-col items-center gap-4">
                <BgrTooltip position="top">
                    <BgrTooltip.Trigger>
                        <button className="rounded-lg bg-gray-700 px-6 py-3 text-white">
                            Top
                        </button>
                    </BgrTooltip.Trigger>
                    <BgrTooltip.Content>
                        <p>Top Position</p>
                    </BgrTooltip.Content>
                </BgrTooltip>
            </div>

            {/* Left & Right */}
            <div className="flex items-center gap-40">
                <BgrTooltip position="left">
                    <BgrTooltip.Trigger>
                        <button className="rounded-lg bg-gray-700 px-6 py-3 text-white">
                            Left
                        </button>
                    </BgrTooltip.Trigger>
                    <BgrTooltip.Content>
                        <p>Left Position</p>
                    </BgrTooltip.Content>
                </BgrTooltip>

                <BgrTooltip position="right">
                    <BgrTooltip.Trigger>
                        <button className="rounded-lg bg-gray-700 px-6 py-3 text-white">
                            Right
                        </button>
                    </BgrTooltip.Trigger>
                    <BgrTooltip.Content>
                        <p>Right Position</p>
                    </BgrTooltip.Content>
                </BgrTooltip>
            </div>

            {/* Bottom */}
            <div className="flex flex-col items-center gap-4">
                <BgrTooltip position="bottom">
                    <BgrTooltip.Trigger>
                        <button className="rounded-lg bg-gray-700 px-6 py-3 text-white">
                            Bottom
                        </button>
                    </BgrTooltip.Trigger>
                    <BgrTooltip.Content>
                        <p>Bottom Position</p>
                    </BgrTooltip.Content>
                </BgrTooltip>
            </div>
        </>
    ),
}

export const AllAlignments: Story = {
    args: {
        children: null,
    },
    render: () => (
        <div className="space-y-16 p-20">
            {/* Top Position */}
            <div>
                <h3 className="mb-6 text-center text-lg font-bold">
                    Top Position
                </h3>
                <div className="flex justify-center gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <BgrTooltip position="top" align="start">
                            <BgrTooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    start
                                </button>
                            </BgrTooltip.Trigger>
                            <BgrTooltip.Content>
                                <p>Start (왼쪽)</p>
                            </BgrTooltip.Content>
                        </BgrTooltip>
                        <span className="text-xs text-gray-500">왼쪽</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <BgrTooltip position="top" align="center">
                            <BgrTooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    center
                                </button>
                            </BgrTooltip.Trigger>
                            <BgrTooltip.Content>
                                <p>Center (중앙)</p>
                            </BgrTooltip.Content>
                        </BgrTooltip>
                        <span className="text-xs text-gray-500">중앙</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <BgrTooltip position="top" align="end">
                            <BgrTooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    end
                                </button>
                            </BgrTooltip.Trigger>
                            <BgrTooltip.Content>
                                <p>End (오른쪽)</p>
                            </BgrTooltip.Content>
                        </BgrTooltip>
                        <span className="text-xs text-gray-500">오른쪽</span>
                    </div>
                </div>
            </div>

            {/* Right Position */}
            <div>
                <h3 className="mb-6 text-center text-lg font-bold">
                    Right Position
                </h3>
                <div className="flex flex-col items-center gap-8">
                    <div className="flex items-center gap-2">
                        <span className="min-w-[40px] text-right text-xs text-gray-500">
                            위
                        </span>
                        <BgrTooltip position="right" align="start">
                            <BgrTooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    start
                                </button>
                            </BgrTooltip.Trigger>
                            <BgrTooltip.Content>
                                <p>Start (위)</p>
                            </BgrTooltip.Content>
                        </BgrTooltip>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="min-w-[40px] text-right text-xs text-gray-500">
                            중앙
                        </span>
                        <BgrTooltip position="right" align="center">
                            <BgrTooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    center
                                </button>
                            </BgrTooltip.Trigger>
                            <BgrTooltip.Content>
                                <p>Center (중앙)</p>
                            </BgrTooltip.Content>
                        </BgrTooltip>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="min-w-[40px] text-right text-xs text-gray-500">
                            아래
                        </span>
                        <BgrTooltip position="right" align="end">
                            <BgrTooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    end
                                </button>
                            </BgrTooltip.Trigger>
                            <BgrTooltip.Content>
                                <p>End (아래)</p>
                            </BgrTooltip.Content>
                        </BgrTooltip>
                    </div>
                </div>
            </div>

            {/* Bottom Position */}
            <div>
                <h3 className="mb-6 text-center text-lg font-bold">
                    Bottom Position
                </h3>
                <div className="flex justify-center gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <BgrTooltip position="bottom" align="start">
                            <BgrTooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    start
                                </button>
                            </BgrTooltip.Trigger>
                            <BgrTooltip.Content>
                                <p>Start (왼쪽)</p>
                            </BgrTooltip.Content>
                        </BgrTooltip>
                        <span className="text-xs text-gray-500">왼쪽</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <BgrTooltip position="bottom" align="center">
                            <BgrTooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    center
                                </button>
                            </BgrTooltip.Trigger>
                            <BgrTooltip.Content>
                                <p>Center (중앙)</p>
                            </BgrTooltip.Content>
                        </BgrTooltip>
                        <span className="text-xs text-gray-500">중앙</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <BgrTooltip position="bottom" align="end">
                            <BgrTooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    end
                                </button>
                            </BgrTooltip.Trigger>
                            <BgrTooltip.Content>
                                <p>End (오른쪽)</p>
                            </BgrTooltip.Content>
                        </BgrTooltip>
                        <span className="text-xs text-gray-500">오른쪽</span>
                    </div>
                </div>
            </div>

            {/* Left Position */}
            <div>
                <h3 className="mb-6 text-center text-lg font-bold">
                    Left Position
                </h3>
                <div className="flex flex-col items-center gap-8">
                    <div className="flex items-center gap-2">
                        <BgrTooltip position="left" align="start">
                            <BgrTooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    start
                                </button>
                            </BgrTooltip.Trigger>
                            <BgrTooltip.Content>
                                <p>Start (위)</p>
                            </BgrTooltip.Content>
                        </BgrTooltip>
                        <span className="min-w-[40px] text-xs text-gray-500">
                            위
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <BgrTooltip position="left" align="center">
                            <BgrTooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    center
                                </button>
                            </BgrTooltip.Trigger>
                            <BgrTooltip.Content>
                                <p>Center (중앙)</p>
                            </BgrTooltip.Content>
                        </BgrTooltip>
                        <span className="min-w-[40px] text-xs text-gray-500">
                            중앙
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <BgrTooltip position="left" align="end">
                            <BgrTooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    end
                                </button>
                            </BgrTooltip.Trigger>
                            <BgrTooltip.Content>
                                <p>End (아래)</p>
                            </BgrTooltip.Content>
                        </BgrTooltip>
                        <span className="min-w-[40px] text-xs text-gray-500">
                            아래
                        </span>
                    </div>
                </div>
            </div>
        </div>
    ),
}

export const LongContentTooltip: Story = {
    args: {
        children: null,
    },
    render: () => (
        <div className="flex items-center gap-2">
            <label className="text-sm font-medium">상품 정보</label>
            <BgrTooltip position="top" align="center">
                <BgrTooltip.Trigger>
                    <button className="text-gray-400 hover:text-gray-600">
                        <span className="text-lg">ⓘ</span>
                    </button>
                </BgrTooltip.Trigger>
                <BgrTooltip.Content>
                    <div className="space-y-2">
                        <p className="font-semibold">상품 제작 및 취소 안내</p>
                        <ul className="list-inside list-disc space-y-1 text-xs">
                            <li>
                                상품 제작이 시작된 이후에는 주문 취소가
                                불가능하며, 반품 절차로만 진행이 가능합니다.
                            </li>
                            <li>
                                단, 제작 시간 중에 접수된 주문은 다음 제작 시작
                                전까지 취소가 가능합니다.
                            </li>
                        </ul>
                    </div>
                </BgrTooltip.Content>
            </BgrTooltip>
        </div>
    ),
}
