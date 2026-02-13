import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './tooltip'

const meta = {
    title: 'Components/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>

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
                <Tooltip position="top">
                    <Tooltip.Trigger>
                        <button className="rounded-lg bg-gray-700 px-6 py-3 text-white">
                            Top
                        </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <p>Top Position</p>
                    </Tooltip.Content>
                </Tooltip>
            </div>

            {/* Left & Right */}
            <div className="flex items-center gap-40">
                <Tooltip position="left">
                    <Tooltip.Trigger>
                        <button className="rounded-lg bg-gray-700 px-6 py-3 text-white">
                            Left
                        </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <p>Left Position</p>
                    </Tooltip.Content>
                </Tooltip>

                <Tooltip position="right">
                    <Tooltip.Trigger>
                        <button className="rounded-lg bg-gray-700 px-6 py-3 text-white">
                            Right
                        </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <p>Right Position</p>
                    </Tooltip.Content>
                </Tooltip>
            </div>

            {/* Bottom */}
            <div className="flex flex-col items-center gap-4">
                <Tooltip position="bottom">
                    <Tooltip.Trigger>
                        <button className="rounded-lg bg-gray-700 px-6 py-3 text-white">
                            Bottom
                        </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <p>Bottom Position</p>
                    </Tooltip.Content>
                </Tooltip>
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
                        <Tooltip position="top" align="start">
                            <Tooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    start
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <p>Start (왼쪽)</p>
                            </Tooltip.Content>
                        </Tooltip>
                        <span className="text-xs text-gray-500">왼쪽</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <Tooltip position="top" align="center">
                            <Tooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    center
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <p>Center (중앙)</p>
                            </Tooltip.Content>
                        </Tooltip>
                        <span className="text-xs text-gray-500">중앙</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <Tooltip position="top" align="end">
                            <Tooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    end
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <p>End (오른쪽)</p>
                            </Tooltip.Content>
                        </Tooltip>
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
                        <Tooltip position="right" align="start">
                            <Tooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    start
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <p>Start (위)</p>
                            </Tooltip.Content>
                        </Tooltip>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="min-w-[40px] text-right text-xs text-gray-500">
                            중앙
                        </span>
                        <Tooltip position="right" align="center">
                            <Tooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    center
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <p>Center (중앙)</p>
                            </Tooltip.Content>
                        </Tooltip>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="min-w-[40px] text-right text-xs text-gray-500">
                            아래
                        </span>
                        <Tooltip position="right" align="end">
                            <Tooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    end
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <p>End (아래)</p>
                            </Tooltip.Content>
                        </Tooltip>
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
                        <Tooltip position="bottom" align="start">
                            <Tooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    start
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <p>Start (왼쪽)</p>
                            </Tooltip.Content>
                        </Tooltip>
                        <span className="text-xs text-gray-500">왼쪽</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <Tooltip position="bottom" align="center">
                            <Tooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    center
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <p>Center (중앙)</p>
                            </Tooltip.Content>
                        </Tooltip>
                        <span className="text-xs text-gray-500">중앙</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <Tooltip position="bottom" align="end">
                            <Tooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    end
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <p>End (오른쪽)</p>
                            </Tooltip.Content>
                        </Tooltip>
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
                        <Tooltip position="left" align="start">
                            <Tooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    start
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <p>Start (위)</p>
                            </Tooltip.Content>
                        </Tooltip>
                        <span className="min-w-[40px] text-xs text-gray-500">
                            위
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Tooltip position="left" align="center">
                            <Tooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    center
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <p>Center (중앙)</p>
                            </Tooltip.Content>
                        </Tooltip>
                        <span className="min-w-[40px] text-xs text-gray-500">
                            중앙
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Tooltip position="left" align="end">
                            <Tooltip.Trigger>
                                <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                    end
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <p>End (아래)</p>
                            </Tooltip.Content>
                        </Tooltip>
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
            <Tooltip position="top" align="center">
                <Tooltip.Trigger>
                    <button className="text-gray-400 hover:text-gray-600">
                        <span className="text-lg">ⓘ</span>
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Content>
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
                </Tooltip.Content>
            </Tooltip>
        </div>
    ),
}
