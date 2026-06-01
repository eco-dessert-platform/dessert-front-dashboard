import type { TooltipProps } from 'recharts'
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

type ChartTooltipFormatter = (value: number, name: string) => string

interface ChartTooltipProps extends TooltipProps<ValueType, NameType> {
  // 항목별 값을 어떻게 표시할지. 미지정 시 그대로 노출.
  valueFormatter?: ChartTooltipFormatter
  // 상단 label(보통 X축 값) 가공.
  labelFormatter?: (label: string) => string
}

// Recharts <Tooltip content={<ChartTooltip ... />} /> 형태로 사용.
// active/payload/label은 Recharts가 주입.
export const ChartTooltip = ({
  active,
  payload,
  label,
  valueFormatter,
  labelFormatter,
}: ChartTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null

  const displayLabel =
    typeof label === 'string' && labelFormatter ? labelFormatter(label) : label

  return (
    <div className="rounded-md border border-gray-200 bg-white px-3 py-2 shadow-md">
      {displayLabel != null && (
        <p className="mb-1 text-xs font-semibold text-gray-700">
          {String(displayLabel)}
        </p>
      )}
      <ul className="space-y-0.5">
        {payload.map((entry, idx) => {
          const numericValue =
            typeof entry.value === 'number' ? entry.value : Number(entry.value)
          const valueText =
            valueFormatter && !Number.isNaN(numericValue)
              ? valueFormatter(numericValue, String(entry.name ?? ''))
              : String(entry.value)
          return (
            <li
              key={`${entry.dataKey ?? entry.name ?? idx}`}
              className="flex items-center gap-2 text-xs"
            >
              <span
                className="inline-block size-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600">{entry.name}</span>
              <span className="ml-auto font-medium text-gray-900">
                {valueText}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
