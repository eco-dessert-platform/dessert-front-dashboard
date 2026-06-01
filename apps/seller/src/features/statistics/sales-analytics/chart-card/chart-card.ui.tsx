import type { ReactNode } from 'react'

import { CircleQuestionMarkIcon } from '@dessert/icons'
import { Tooltip } from '@dessert/ui'

interface ChartCardProps {
  title: ReactNode
  // ⓘ 아이콘에 hover하면 노출되는 설명. 미지정 시 아이콘 자체를 렌더하지 않음.
  info?: string
  // 헤더 우측 슬롯 — 단위 토글 등 차트별 컨트롤이 들어감.
  headerRight?: ReactNode
  children: ReactNode
}

export function ChartCard({
  title,
  info,
  headerRight,
  children,
}: ChartCardProps) {
  return (
    <section className="rounded-10 bg-white p-6 shadow-sm">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h3 className="typo-title-16-m text-gray-900">{title}</h3>
          {info && (
            <Tooltip position="top" align="start">
              <Tooltip.Trigger asChild>
                <button
                  type="button"
                  aria-label="설명"
                  className="inline-flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  <CircleQuestionMarkIcon className="size-4" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content>{info}</Tooltip.Content>
            </Tooltip>
          )}
        </div>
        {headerRight}
      </header>
      {children}
    </section>
  )
}
