import type { Meta, StoryObj } from '@storybook/react'
import BgrTooltip from './BgrTooltip'

const meta = {
    title: 'Components/BgrTooltip',
    component: BgrTooltip,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof BgrTooltip>

export default meta
type Story = StoryObj<typeof meta>

// 1. 전체 Position Story(Position)
export const AllPositions: Story = {
    args: {
        children: null,
        content: '',
    },
    render: () => (
        <div className="p-20">
            <div className="flex flex-col items-center gap-20">
                {/* Top */}
                <div className="flex flex-col items-center gap-4">
                    <BgrTooltip content="Top Position" position="top">
                        <button className="rounded-lg bg-gray-700 px-6 py-3 text-white">
                            Top
                        </button>
                    </BgrTooltip>
                </div>

                {/* Left & Right */}
                <div className="flex items-center gap-40">
                    <BgrTooltip content="Left Position" position="left">
                        <button className="rounded-lg bg-gray-700 px-6 py-3 text-white">
                            Left
                        </button>
                    </BgrTooltip>

                    <BgrTooltip content="Right Position" position="right">
                        <button className="rounded-lg bg-gray-700 px-6 py-3 text-white">
                            Right
                        </button>
                    </BgrTooltip>
                </div>

                {/* Bottom */}
                <div className="flex flex-col items-center gap-4">
                    <BgrTooltip content="Bottom Position" position="bottom">
                        <button className="rounded-lg bg-gray-700 px-6 py-3 text-white">
                            Bottom
                        </button>
                    </BgrTooltip>
                </div>
            </div>
        </div>
    ),
}

// 2. 모든 Align 조합 Story(Position × Align)
export const AllAlignments: Story = {
    args: {
        children: null,
        content: '',
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
                        <BgrTooltip
                            content="Start (왼쪽)"
                            position="top"
                            align="start"
                        >
                            <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                start
                            </button>
                        </BgrTooltip>
                        <span className="text-xs text-gray-500">왼쪽</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <BgrTooltip
                            content="Center (중앙)"
                            position="top"
                            align="center"
                        >
                            <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                center
                            </button>
                        </BgrTooltip>
                        <span className="text-xs text-gray-500">중앙</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <BgrTooltip
                            content="End (오른쪽)"
                            position="top"
                            align="end"
                        >
                            <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                end
                            </button>
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
                        <BgrTooltip
                            content="Start (위)"
                            position="right"
                            align="start"
                        >
                            <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                start
                            </button>
                        </BgrTooltip>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="min-w-[40px] text-right text-xs text-gray-500">
                            중앙
                        </span>
                        <BgrTooltip
                            content="Center (중앙)"
                            position="right"
                            align="center"
                        >
                            <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                center
                            </button>
                        </BgrTooltip>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="min-w-[40px] text-right text-xs text-gray-500">
                            아래
                        </span>
                        <BgrTooltip
                            content="End (아래)"
                            position="right"
                            align="end"
                        >
                            <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                end
                            </button>
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
                        <BgrTooltip
                            content="Start (왼쪽)"
                            position="bottom"
                            align="start"
                        >
                            <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                start
                            </button>
                        </BgrTooltip>
                        <span className="text-xs text-gray-500">왼쪽</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <BgrTooltip
                            content="Center (중앙)"
                            position="bottom"
                            align="center"
                        >
                            <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                center
                            </button>
                        </BgrTooltip>
                        <span className="text-xs text-gray-500">중앙</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <BgrTooltip
                            content="End (오른쪽)"
                            position="bottom"
                            align="end"
                        >
                            <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                end
                            </button>
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
                        <BgrTooltip
                            content="Start (위)"
                            position="left"
                            align="start"
                        >
                            <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                start
                            </button>
                        </BgrTooltip>
                        <span className="min-w-[40px] text-xs text-gray-500">
                            위
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <BgrTooltip
                            content="Center (중앙)"
                            position="left"
                            align="center"
                        >
                            <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                center
                            </button>
                        </BgrTooltip>
                        <span className="min-w-[40px] text-xs text-gray-500">
                            중앙
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <BgrTooltip
                            content="End (아래)"
                            position="left"
                            align="end"
                        >
                            <button className="rounded-lg bg-gray-700 px-6 py-3 text-sm text-white">
                                end
                            </button>
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

// 3. 긴 글에 대응하는 Story
export const LongContentTooltip: Story = {
    args: {
        children: null,
        content: '',
    },
    render: () => (
        <div className="p-20">
            <div className="max-w-md space-y-4">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">상품 정보</label>
                    <BgrTooltip
                        content={
                            <div className="space-y-2">
                                <p className="font-semibold">
                                    상품 제작 및 취소 안내
                                </p>
                                <ul className="list-inside list-disc space-y-1 text-xs">
                                    <li>
                                        상품 제작이 시작된 이후에는 주문 취소가
                                        불가능하며, 반품 절차로만 진행이
                                        가능합니다.
                                    </li>
                                    <li>
                                        단, 제작 시간 중에 접수된 주문은 다음
                                        제작 시작 전까지 취소가 가능합니다.
                                    </li>
                                </ul>
                            </div>
                        }
                        position="top"
                        align="center"
                    >
                        <button className="text-gray-400 hover:text-gray-600">
                            <span className="text-lg">ⓘ</span>
                        </button>
                    </BgrTooltip>
                </div>
            </div>
        </div>
    ),
}
